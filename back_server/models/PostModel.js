// const fs = require("fs");
// const path = require("path");

// class PostModel {
//     constructor() {
//         this.posts = [];
//         const postInfoPath = path.join(__dirname, "..", "data", 'postInfo.json');
//         const data = fs.readFileSync(postInfoPath, 'utf8');
//         this.posts = JSON.parse(data).posts;

        
//     }

//     getPosts(offset, limit) {
//         return this.posts.slice(offset, offset + limit);
//     }

//     getPostById(postId){
//         return this.posts.find(post => post.post_id === parseInt(postId, 10));
//     }

//     addPost(newPost) {
//         const postId = this.posts.length ? this.posts[this.posts.length - 1].post_id + 1 : 1;
//         newPost.post_id = postId;
//         newPost.created_at = new Date().toISOString();
//         newPost.updated_at = newPost.created_at;
//         this.posts.push(newPost);
//         this.savePosts();
//         return newPost;
//     }

//     savePosts() {
//         const postInfoPath = path.join(__dirname, "..", "data", 'postInfo.json');
//         const data = { posts: this.posts };
//         fs.writeFileSync(postInfoPath, JSON.stringify(data, null, 2), 'utf8');
//     }

//     updatePost(postId, updatedData) {
//         const postIndex = this.posts.findIndex(post => post.post_id === parseInt(postId, 10));
//         if (postIndex === -1) {
//             return null;
//         }
//         const updatedPost = {
//             ...this.posts[postIndex],
//             ...updatedData,
//             updated_at: new Date().toISOString()
//         };
//         this.posts[postIndex] = updatedPost;
//         this.savePosts();
//         return updatedPost;
//     }

//     deletePost(postId) {
//         const postIndex = this.posts.findIndex(post => post.post_id === parseInt(postId, 10));
//         if (postIndex === -1) {
//             return null;
//         }
//         const deletedPost = this.posts.splice(postIndex, 1)[0];
//         this.savePosts();
//         return deletedPost;
//     }

//     getComments(postId){
//         const postIndex = this.posts.findIndex(post => post.post_id === parseInt(postId, 10));
        
//     }

// }


// module.exports = PostModel;

const mysql = require('mysql2/promise');

class PostModel {
    constructor() {
        this.dbConfig = {
            host: 'localhost',
            user: 'root',
            password: 'wata1945',
            database: 'community'
        };
    }
    //이전 작동 코드
    // async getPosts(offset, limit) {
    //     const connection = await mysql.createConnection(this.dbConfig);
    //     const [rows] = await connection.execute(`
    //         SELECT p.*, u.nickname
    //         FROM postinfo p
    //         JOIN userinfo u ON p.user_id = u.user_id`);
    //     await connection.end();
    //     return rows;
    // }
    async getPosts() {
        const connection = await mysql.createConnection(this.dbConfig);
        const [rows] = await connection.execute(`
            SELECT p.*, u.nickname, COALESCE(c.comment_counts, 0) AS comment_counts
            FROM postinfo p
            JOIN userinfo u ON p.user_id = u.user_id
            LEFT JOIN (
                SELECT post_id, COUNT(*) AS comment_counts
                FROM commentinfo
                GROUP BY post_id
            ) c ON p.post_id = c.post_id`);
        await connection.end();
        return rows;
    }

    // async getPostById(postId) {
    //     const connection = await mysql.createConnection(this.dbConfig);
    //     const [rows] = await connection.execute(`
    //         SELECT p.*, u.nickname
    //         FROM postinfo p
    //         JOIN userinfo u ON p.user_id = u.user_id
    //         WHERE p.post_id = ?`, [postId]);
    //     await connection.end();
    //     return rows[0];
    // }
    
    async getPostById(postId) {
        const connection = await mysql.createConnection(this.dbConfig);
        const [rows] = await connection.execute(`
            SELECT p.*, u.nickname, COALESCE(c.comment_counts, 0) AS comment_counts
            FROM postinfo p
            JOIN userinfo u ON p.user_id = u.user_id
            LEFT JOIN (
                SELECT post_id, COUNT(*) AS comment_counts
                FROM commentinfo
                GROUP BY post_id
            ) c ON p.post_id = c.post_id
            WHERE p.post_id = ?`, [postId]);
        await connection.end();
        return rows[0];
        
    }

    async addPost(newPost) {
        const connection = await mysql.createConnection(this.dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO postinfo (post_title, post_content, user_id, created_at, updated_at) VALUES (?, ?, ?,NOW(), NOW())',
            [newPost.post_title, newPost.post_content, newPost.user_id]
        );
        await connection.end();
        return { post_id: result.insertId };
    }

    async updatePost(postId, updatedData) {
        const connection = await mysql.createConnection(this.dbConfig);
        await connection.execute(
            'UPDATE postinfo SET post_title = ?, post_content = ?, updated_at = NOW() WHERE post_id = ?',
            [updatedData.post_title, updatedData.post_content, postId]
        );
        await connection.end();
        return this.getPostById(postId);
    }

    async deletePost(postId) {
        const connection = await mysql.createConnection(this.dbConfig);
    
        try {
            // 트랜잭션 시작
            await connection.beginTransaction();
    
            // 댓글 삭제
            const [commentResult] = await connection.execute('DELETE FROM commentinfo WHERE post_id = ?', [postId]);
    
            // 게시글 삭제
            const [postResult] = await connection.execute('DELETE FROM postinfo WHERE post_id = ?', [postId]);
    
            // 트랜잭션 커밋
            await connection.commit();
    
            return postResult.affectedRows > 0;
        } catch (error) {
            // 트랜잭션 롤백
            await connection.rollback();
            throw error;
        } finally {
            // 연결 종료
            await connection.end();
        }
    }
    
    async deletePostsByUser(userId){
        const connection = await mysql.createConnection(this.dbConfig);

        try {

            await connection.beginTransaction();

            const query = 'DELETE FROM postinfo WHERE user_id = ?';
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



module.exports = PostModel;
