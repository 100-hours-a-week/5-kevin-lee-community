const express = require("express");
const path  = require("path");
const PostModelPath = path.join(__dirname, "..","models", "PostModel");
const PostControllerPath = path.join(__dirname, "..","controllers", "PostController")
const PostController = require(PostControllerPath);
const PostModel = require(PostModelPath);
const postRoutes = express.Router();

postRoutes.get('/', PostController.getPosts);

postRoutes.get('/:post_id', PostController.getPostById);

postRoutes.post('/', PostController.addPost);

postRoutes.patch('/:post_id', PostController.updatePost);

postRoutes.delete('/posts/:post_id', PostController.deletePost);

postRoutes.get('/:post_id/comments', PostController.getComments);

module.exports = postRoutes;