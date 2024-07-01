const CommentModel = require('../models/CommentModel');
const commentModel = new CommentModel();

exports.getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await commentModel.getCommentsByPostId(postId);
        res.status(200).json({  data: comments });
    } catch (error) {
        res.status(500);
    }
};

exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
        return res.status(400);
    }
    const newComment = await commentModel.addComment(postId, userId, content);
    res.status(201).json({ data: newComment });
    
};

exports.updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400);
    }

    const comment = await commentModel.getCommentById(commentId);
    if (!comment) {
        return res.status(404);
    }

    if (comment.user_id !== req.session.user_id) {
        return res.status(403);
    }

    const updatedComment = await commentModel.updateComment(commentId, content);
    if (updatedComment) {
        res.status(200).json({ data: updatedComment });
    } else {
        res.status(404);
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    const comment = await commentModel.getCommentById(commentId);
    if (!comment) {
        return res.status(404).json({  data: null });
    }

    if (Number(comment.user_id) !== Number(req.session.user_id)) {
        return res.status(403);
    }

    const deleted = await commentModel.deleteComment(commentId);
    if (deleted) {
        res.status(200);
    } else {
        res.status(404);
    }
   
};