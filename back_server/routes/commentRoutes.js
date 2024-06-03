const express = require('express');
const router = express.Router();
const CommentModel = require('../models/CommentModel');
const commentModel = new CommentModel();

router.get('/:postId/comments', (req, res) => {
    const { postId } = req.params;
    const comments = commentModel.getCommentsByPostId(postId);
    res.status(200).json({ status: 200, message: null, data: comments });
});

router.post('/:postId/comments', (req, res) => {
    const { postId } = req.params;
    const { userId, content } = req.body;
    if (!userId || !content) {
        return res.status(400).json({ status: 400, message: 'Missing required fields', data: null });
    }
    const newComment = commentModel.addComment(postId, userId, content);
    res.status(201).json({ status: 201, message: 'write_comment_success', data: newComment });
});

router.patch('/:postId/comments/:commentId', (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ status: 400, message: 'Missing required fields', data: null });
    }
    const updatedComment = commentModel.updateComment(commentId, content);
    if (updatedComment) {
        res.status(200).json({ status: 200, message: 'update_comment_success', data: updatedComment });
    } else {
        res.status(404).json({ status: 404, message: 'not_found_comment', data: null });
    }
});

router.delete('/:postId/comments/:commentId', (req, res) => {
    const { commentId } = req.params;
    const deletedComment = commentModel.deleteComment(commentId);
    if (deletedComment) {
        res.status(200).json({ status: 200, message: 'delete_comment_success', data: deletedComment });
    } else {
        res.status(404).json({ status: 404, message: 'not_found_comment', data: null });
    }
});

module.exports = router;
