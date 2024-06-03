const fs = require('fs');
const path = require('path');

class CommentModel {
    constructor() {
        this.comments = [];
        const commentsPath = path.join(__dirname, '..', 'data', 'postInfo.json');
        if (fs.existsSync(commentsPath)) {
            const data = fs.readFileSync(commentsPath, 'utf8');
            this.comments = JSON.parse(data).comments || [];
        }
    }

    saveComments() {
        const commentsPath = path.join(__dirname, '..', 'data', 'postInfo.json');
        const data = { comments: this.comments };
        fs.writeFileSync(commentsPath, JSON.stringify(data, null, 2), 'utf8');
    }

    getCommentsByPostId(postId) {
        return this.comments.filter(comment => comment.postId === parseInt(postId, 10));
    }

    addComment(postId, userId, content) {
        const commentId = this.comments.length ? this.comments[this.comments.length - 1].commentId + 1 : 1;
        const newComment = {
            commentId,
            postId: parseInt(postId, 10),
            userId,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.comments.push(newComment);
        this.saveComments();
        return newComment;
    }

    updateComment(commentId, content) {
        const commentIndex = this.comments.findIndex(comment => comment.commentId === parseInt(commentId, 10));
        if (commentIndex === -1) {
            return null;
        }
        this.comments[commentIndex].content = content;
        this.comments[commentIndex].updatedAt = new Date().toISOString();
        this.saveComments();
        return this.comments[commentIndex];
    }

    deleteComment(commentId) {
        const commentIndex = this.comments.findIndex(comment => comment.commentId === parseInt(commentId, 10));
        if (commentIndex === -1) {
            return null;
        }
        const deletedComment = this.comments.splice(commentIndex, 1)[0];
        this.saveComments();
        return deletedComment;
    }
}

module.exports = CommentModel;
