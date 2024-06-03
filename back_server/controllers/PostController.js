const PostModel = require('../models/PostModel');
const postModel = new PostModel();

exports.getPosts = (req, res) => {
    try {
        const { offset = 0, limit = 10 } = req.query;

        if (isNaN(offset) || isNaN(limit) || offset < 0 || limit < 1) {
            return res.status(400).json({ status: 400, message: 'invalid_offset_or_limit', data: null });
        }

        const posts = postModel.getPosts(parseInt(offset, 10), parseInt(limit, 10));

        if (posts.length === 0) {
            return res.status(404).json({ status: 404, message: 'not_a_single_post', data: null });
        }

        return res.status(200).json({ status: 200, message: null, data: posts });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};

exports.getPostById = (req, res) => {
    try{
        const postId = req.params.post_id;

        if(!postId || isNaN(postId)){
            return res.status(400).json({status: 400, message: "invalid_post_id", data:null});
        }

        const post = postModel.getPostById(postId);
        
        if (!post) {
            return res.status(404).json({ status: 404, message: 'cannot_found_post', data: null });
        }
        return res.status(200).json({ status: 200, message: null, data: post });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};

exports.addPost = (req, res) => {
    try {
        const { postTitle, postContent, attachFilePath } = req.body;

        if (!postTitle || !postContent) {
            return res.status(400).json({ status: 400, message: 'invalid_post_title_or_content', data: null });
        }

        const newPost = {
            post_title: postTitle,
            post_content: postContent,
            file_path: attachFilePath || null
        };

        const createdPost = postModel.addPost(newPost);

        return res.status(201).json({ status: 201, message: 'write_post_success', data: { post_id: createdPost.post_id } });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};

exports.updatePost = (req, res) => {
    try {
        const postId = req.params.post_id;
        const { postTitle, postContent, attachFilePath } = req.body;

        if (!postId || isNaN(postId)) {
            return res.status(400).json({ status: 400, message: 'invalid_post_id', data: null });
        }

        if (!postTitle || !postContent) {
            return res.status(400).json({ status: 400, message: 'invalid_post_title_or_content', data: null });
        }

        const updatedData = {
            post_title: postTitle,
            post_content: postContent,
            file_path: attachFilePath || null
        };

        const updatedPost = postModel.updatePost(postId, updatedData);

        if (!updatedPost) {
            return res.status(404).json({ status: 404, message: 'not_a_single_post', data: null });
        }

        return res.status(200).json({ status: 200, message: 'update_post_success', data: { post_id: updatedPost.post_id } });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};

exports.deletePost = (req, res) => {
    try{
        const postId = req.params.post_id;
        const { postTitle, postContent, attachFilePath } = req.body;

        if (!postId || isNaN(postId)) {
            return res.status(400).json({ status: 400, message: 'invalid_post_id', data: null });
        }

        const deletedPost = postModel.deletePost(postId);

        if (!deletedPost) {
            return res.status(404).json({ status: 404, message: 'not_a_single_post', data: null });
        }

        return res.status(200).json({ status: 200, message: 'delete_post_success', data: null });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};

exports.getComments = (req, res) => {
    try{
        const postId = req.params.post_id;
        const { postTitle, postContent, attachFilePath } = req.body;

        if (!postId || isNaN(postId)) {
            return res.status(400).json({ status: 400, message: 'invalid_post_id', data: null });
        }

        const getComments = postModel.getComments(postId);

        if (!getComments) {
            return res.status(404).json({ status: 404, message: 'not_a_single_post', data: null });
        }

        return res.status(200).json({ status: 200, message: 'delete_post_success', data: null });

    }catch (error) {
        return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
    }
};

