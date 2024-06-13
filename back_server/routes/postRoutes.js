const express = require("express");
const path  = require("path");
const PostModelPath = path.join(__dirname, "..","models", "PostModel");
const PostControllerPath = path.join(__dirname, "..","controllers", "PostController")
const PostController = require(PostControllerPath);
const PostModel = require(PostModelPath);
const postRoutes = express.Router();
const CommentController = require('../controllers/CommentController');

//게시글 관련

postRoutes.get('/', PostController.getPosts);

postRoutes.get('/:post_id', PostController.getPostById);

postRoutes.post('/', PostController.addPost);

postRoutes.patch('/:post_id', PostController.updatePost);

postRoutes.delete('/:post_id', PostController.deletePost);

//댓글관련

postRoutes.get('/:postId/comments', CommentController.getCommentsByPostId);

postRoutes.post('/:postId/comments', CommentController.addComment);

postRoutes.patch('/:postId/comments/:commentId', CommentController.updateComment);

postRoutes.delete('/:postId/comments/:commentId', CommentController.deleteComment);

module.exports = postRoutes;