// const fs = require('fs');
// const path = require('path');

// class CommentModel {
//     constructor() {
//         this.comments = [];
//         const commentsPath = path.join(__dirname, '..', 'data', 'postInfo.json');
//         if (fs.existsSync(commentsPath)) {
//             const data = fs.readFileSync(commentsPath, 'utf8');
//             this.comments = JSON.parse(data).comments || [];
//         }
//     }

//     saveComments() {
//         const commentsPath = path.join(__dirname, '..', 'data', 'postInfo.json');
//         const data = { comments: this.comments };
//         fs.writeFileSync(commentsPath, JSON.stringify(data, null, 2), 'utf8');
//     }

//     getCommentsByPostId(postId) {
//         return this.comments.filter(comment => comment.postId === parseInt(postId, 10));
//     }

//     addComment(postId, userId, content) {
//         const commentId = this.comments.length ? this.comments[this.comments.length - 1].commentId + 1 : 1;
//         const newComment = {
//             commentId,
//             postId: parseInt(postId, 10),
//             userId,
//             content,
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//         };
//         this.comments.push(newComment);
//         this.saveComments();
//         return newComment;
//     }

//     updateComment(commentId, content) {
//         const commentIndex = this.comments.findIndex(comment => comment.commentId === parseInt(commentId, 10));
//         if (commentIndex === -1) {
//             return null;
//         }
//         this.comments[commentIndex].content = content;
//         this.comments[commentIndex].updatedAt = new Date().toISOString();
//         this.saveComments();
//         return this.comments[commentIndex];
//     }

//     deleteComment(commentId) {
//         const commentIndex = this.comments.findIndex(comment => comment.commentId === parseInt(commentId, 10));
//         if (commentIndex === -1) {
//             return null;
//         }
//         const deletedComment = this.comments.splice(commentIndex, 1)[0];
//         this.saveComments();
//         return deletedComment;
//     }
// }

// module.exports = CommentModel;

const mysql = require('mysql2/promise');

class CommentModel {
    constructor() {
        this.dbConfig = {
            host: 'localhost',
            user: 'root',
            password: 'wata1945',
            database: 'community'
        };
    }

    async getCommentsByPostId(postId) {
        const connection = await mysql.createConnection(this.dbConfig);
        const query = `
            SELECT c.*, u.nickname 
            FROM commentinfo c
            JOIN userinfo u ON c.user_id = u.user_id
            WHERE c.post_id = ?
        `;
        const [rows] = await connection.execute(query, [postId]);
        await connection.end();
        return rows;
    }

    async addComment(postId, userId, comment_content) {
        const connection = await mysql.createConnection(this.dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO commentinfo (post_id, user_id, comment_content, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
            [postId, userId, comment_content]
        );
        await connection.end();
        return { comment_id: result.insertId, post_id: postId, user_id: userId, comment_content };
    }

    async updateComment(commentId, comment_content) {
        const connection = await mysql.createConnection(this.dbConfig);
        await connection.execute(
            'UPDATE commentinfo SET comment_content = ?, updated_at = NOW() WHERE comment_id = ?',
            [comment_content, commentId]
        );
        await connection.end();
        return this.getCommentById(commentId);
    }

    async getCommentById(commentId) {
        const connection = await mysql.createConnection(this.dbConfig);
        const [rows] = await connection.execute('SELECT * FROM commentinfo WHERE comment_id = ?', [commentId]);
        await connection.end();
        return rows[0];
    }

    async deleteComment(commentId) {
        const connection = await mysql.createConnection(this.dbConfig);
        const [result] = await connection.execute('DELETE FROM commentinfo WHERE comment_id = ?', [commentId]);
        await connection.end();
        return result.affectedRows > 0;
    }

    async deleteCommentsByUser(userId){
        const connection = await mysql.createConnection(this.dbConfig);

        try {
            await connection.beginTransaction();

            const query = 'DELETE FROM commentinfo WHERE user_id = ?';
            const [results] = await connection.execute(query, [userId]);

            await connection.commit();
            return results;
        } catch (error) {
            // 트랜잭션 롤백
            await connection.rollback();
            throw error;
        } finally {
            // 연결 종료
            await connection.end();
        }
       
    };
}

module.exports = CommentModel;

