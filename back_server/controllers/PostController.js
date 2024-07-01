// const PostModel = require('../models/PostModel');
// const postModel = new PostModel();

// exports.getPosts = (req, res) => {
//     try {
//         const { offset = 0, limit = 10 } = req.query;

//         if (isNaN(offset) || isNaN(limit) || offset < 0 || limit < 1) {
//             return res.status(400).json({ status: 400, message: 'invalid_offset_or_limit', data: null });
//         }

//         const posts = postModel.getPosts(parseInt(offset, 10), parseInt(limit, 10));

//         if (posts.length === 0) {
//             return res.status(404).json({ status: 404, message: 'not_a_single_post', data: null });
//         }

//         return res.status(200).json({ status: 200, message: null, data: posts });
//     } catch (error) {
//         return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
//     }
// };

// exports.getPostById = (req, res) => {
//     try{
//         const postId = req.params.post_id;

//         if(!postId || isNaN(postId)){
//             return res.status(400).json({status: 400, message: "invalid_post_id", data:null});
//         }

//         const post = postModel.getPostById(postId);
        
//         if (!post) {
//             return res.status(404).json({ status: 404, message: 'cannot_found_post', data: null });
//         }
//         return res.status(200).json({ status: 200, message: null, data: post });
//     } catch (error) {
//         return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
//     }
// };

// exports.addPost = (req, res) => {
//     try {
//         const { postTitle, postContent, attachFilePath } = req.body;

//         if (!postTitle || !postContent) {
//             return res.status(400).json({ status: 400, message: 'invalid_post_title_or_content', data: null });
//         }

//         const newPost = {
//             post_title: postTitle,
//             post_content: postContent,
//             file_path: attachFilePath || null
//         };

//         const createdPost = postModel.addPost(newPost);

//         return res.status(201).json({ status: 201, message: 'write_post_success', data: { post_id: createdPost.post_id } });
//     } catch (error) {
//         return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
//     }
// };

// exports.updatePost = (req, res) => {
//     try {
//         const postId = req.params.post_id;
//         const { postTitle, postContent, attachFilePath } = req.body;

//         if (!postId || isNaN(postId)) {
//             return res.status(400).json({ status: 400, message: 'invalid_post_id', data: null });
//         }

//         if (!postTitle || !postContent) {
//             return res.status(400).json({ status: 400, message: 'invalid_post_title_or_content', data: null });
//         }

//         const updatedData = {
//             post_title: postTitle,
//             post_content: postContent,
//             file_path: attachFilePath || null
//         };

//         const updatedPost = postModel.updatePost(postId, updatedData);

//         if (!updatedPost) {
//             return res.status(404).json({ status: 404, message: 'not_a_single_post', data: null });
//         }

//         return res.status(200).json({ status: 200, message: 'update_post_success', data: { post_id: updatedPost.post_id } });
//     } catch (error) {
//         return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
//     }
// };

// exports.deletePost = (req, res) => {
//     try{
//         const postId = req.params.post_id;
//         const { postTitle, postContent, attachFilePath } = req.body;

//         if (!postId || isNaN(postId)) {
//             return res.status(400).json({ status: 400, message: 'invalid_post_id', data: null });
//         }

//         const deletedPost = postModel.deletePost(postId);

//         if (!deletedPost) {
//             return res.status(404).json({ status: 404, message: 'not_a_single_post', data: null });
//         }

//         return res.status(200).json({ status: 200, message: 'delete_post_success', data: null });
//     } catch (error) {
//         return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
//     }
// };

// exports.getComments = (req, res) => {
//     try{
//         const postId = req.params.post_id;
//         const { postTitle, postContent, attachFilePath } = req.body;

//         if (!postId || isNaN(postId)) {
//             return res.status(400).json({ status: 400, message: 'invalid_post_id', data: null });
//         }

//         const getComments = postModel.getComments(postId);

//         if (!getComments) {
//             return res.status(404).json({ status: 404, message: 'not_a_single_post', data: null });
//         }

//         return res.status(200).json({ status: 200, message: 'delete_post_success', data: null });

//     }catch (error) {
//         return res.status(500).json({ status: 500, message: 'internal_server_error', data: null });
//     }
// };

const PostModel = require('../models/PostModel');
const postModel = new PostModel();
//게시글 전체 획득
exports.getPosts = async (req, res) => {
    try {

        const posts = await postModel.getPosts();

        if (posts.length === 0) {
            return res.status(404).json({data: null });
        }

        return res.status(200).json({data: posts });
    } catch (error) {
        return res.status(500).json({  data: null });
    }
};
//아이디에 의한 게시글 검색
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.post_id;
        if (!postId || isNaN(postId)) {
            return res.status(400).json({  data: null });
        }

        const post = await postModel.getPostById(postId);

        if (!post) {
            return res.status(404).json({  data: null });
        }
        return res.status(200).json({ data: post });
    } catch (error) {
        return res.status(500);
    }
};
//게시글 추가
exports.addPost = async (req, res) => {
    const { post_title, post_content, user_id } = req.body;

    
    if (!post_title || !post_content) {
        return res.status(400).json({ status: 400, message: 'invalid_post_title_or_content', data: null });
    }

    const newPost = {
        post_title: post_title,
        post_content: post_content,
        user_id : user_id,
    };

    const createdPost = await postModel.addPost(newPost);

    return res.status(201).json({  data: { post_id: createdPost.post_id } });
};
//게시글 수정
exports.updatePost = async (req, res) => {
    const postId = req.params.post_id;
    const { postTitle, postContent } = req.body;

    if (!postId || isNaN(postId)) {
        return res.status(400);
    }

    if (!postTitle || !postContent) {
        return res.status(400);    }

    // 게시글 소유자 확인
    const post = await postModel.getPostById(postId);
    if (!post) {
        return res.status(404);
    }

    if (post.user_id !== req.session.user_id) {
        return res.status(403);
    }


    const updatedData = {
        post_title: postTitle,
        post_content: postContent,
    };

    const updatedPost = await postModel.updatePost(postId, updatedData);

    if (!updatedPost) {
        return res.status(404);
    }

    return res.status(200).json({  data: { post_id: updatedPost.post_id } });
    
};
//게시글 삭제
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.post_id;

        if (!postId || isNaN(postId)) {
            return res.status(400).json({data: null });
        }

         // 게시글 소유자 확인
        const post = await postModel.getPostById(postId);
        if (!post) {
            return res.status(404);
        }

        if (post.user_id !== req.session.user_id) {
            return res.status(403).json({  data: null });
        }


        const deleted = await postModel.deletePost(postId);

        if (!deleted) {
            return res.status(404).json({  data: null });
        }

        return res.status(200).json({  data: null });
    } catch (error) {
        return res.status(500).json({  data: null });
    }
};
