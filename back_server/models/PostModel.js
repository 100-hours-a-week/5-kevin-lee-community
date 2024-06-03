const fs = require("fs");
const path = require("path");

class PostModel {
    constructor() {
        this.posts = [];
        const postInfoPath = path.join(__dirname, "..", "data", 'postInfo.json');
        const data = fs.readFileSync(postInfoPath, 'utf8');
        this.posts = JSON.parse(data).posts;
    }

    getPosts(offset, limit) {
        return this.posts.slice(offset, offset + limit);
    }

    getPostById(postId){
        return this.posts.find(post => post.post_id === parseInt(postId, 10));
    }

    addPost(newPost) {
        const postId = this.posts.length ? this.posts[this.posts.length - 1].post_id + 1 : 1;
        newPost.post_id = postId;
        newPost.created_at = new Date().toISOString();
        newPost.updated_at = newPost.created_at;
        this.posts.push(newPost);
        this.savePosts();
        return newPost;
    }

    savePosts() {
        const postInfoPath = path.join(__dirname, "..", "data", 'postInfo.json');
        const data = { posts: this.posts };
        fs.writeFileSync(postInfoPath, JSON.stringify(data, null, 2), 'utf8');
    }

    updatePost(postId, updatedData) {
        const postIndex = this.posts.findIndex(post => post.post_id === parseInt(postId, 10));
        if (postIndex === -1) {
            return null;
        }
        const updatedPost = {
            ...this.posts[postIndex],
            ...updatedData,
            updated_at: new Date().toISOString()
        };
        this.posts[postIndex] = updatedPost;
        this.savePosts();
        return updatedPost;
    }

    deletePost(postId) {
        const postIndex = this.posts.findIndex(post => post.post_id === parseInt(postId, 10));
        if (postIndex === -1) {
            return null;
        }
        const deletedPost = this.posts.splice(postIndex, 1)[0];
        this.savePosts();
        return deletedPost;
    }

    getComments(postId){
        const postIndex = this.posts.findIndex(post => post.post_id === parseInt(postId, 10));
        
    }

}


module.exports = PostModel;
