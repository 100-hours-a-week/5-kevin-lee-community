const CommentModel = require('../models/CommentModel');
const commentModel = new CommentModel();

exports.getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await commentModel.getCommentsByPostId(postId);
        res.status(200).json({ status: 200, message: null, data: comments });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};

exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
        return res.status(400).json({ status: 400, message: 'Missing required fields', data: null });
    }
    const newComment = await commentModel.addComment(postId, userId, content);
    res.status(201).json({ status: 201, message: 'write_comment_success', data: newComment });
    
};

exports.updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ status: 400, message: 'Missing required fields', data: null });
    }

    const comment = await commentModel.getCommentById(commentId);
    if (!comment) {
        return res.status(404).json({ status: 404, message: 'not_found_comment', data: null });
    }

    if (comment.user_id !== req.session.user_id) {
        return res.status(403).json({ status: 403, message: 'Forbidden', data: null });
    }

    const updatedComment = await commentModel.updateComment(commentId, content);
    if (updatedComment) {
        res.status(200).json({ status: 200, message: 'update_comment_success', data: updatedComment });
    } else {
        res.status(404).json({ status: 404, message: 'not_found_comment', data: null });
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    const comment = await commentModel.getCommentById(commentId);
    if (!comment) {
        return res.status(404).json({ status: 404, message: 'not_found_comment', data: null });
    }

    if (Number(comment.user_id) !== Number(req.session.user_id)) {
        return res.status(403).json({ status: 403, message: 'Forbidden', data: null });
    }

    const deleted = await commentModel.deleteComment(commentId);
    if (deleted) {
        res.status(200).json({ status: 200, message: 'delete_comment_success', data: null });
    } else {
        res.status(404).json({ status: 404, message: 'not_found_comment', data: null });
    }
   
};