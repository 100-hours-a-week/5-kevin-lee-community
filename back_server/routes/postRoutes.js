const express = require("express");
const path  = require("path");
const PostModelPath = path.join(__dirname, "..","models", "PostModel");
const PostControllerPath = path.join(__dirname, "..","controllers", "PostController")
const PostController = require(PostControllerPath);
const PostModel = require(PostModelPath);
const postRoutes = express.Router();
const CommentController = require('../controllers/CommentController');
const isAuthenticated = require("../middleware/auth");

//게시글 관련
//게시글 전체 반환
postRoutes.get('/', PostController.getPosts);
//id로 게시글 검색
postRoutes.get('/:post_id', PostController.getPostById);
//게시글 추가
postRoutes.post('/', PostController.addPost);
//게시글 수정
postRoutes.patch('/:post_id', isAuthenticated,PostController.updatePost);
//게시글 삭제
postRoutes.delete('/:post_id', PostController.deletePost);

//댓글관련

postRoutes.get('/:postId/comments', CommentController.getCommentsByPostId);

postRoutes.post('/:postId/comments', CommentController.addComment);

postRoutes.patch('/:postId/comments/:commentId', CommentController.updateComment);

postRoutes.delete('/:postId/comments/:commentId', CommentController.deleteComment);

module.exports = postRoutes;