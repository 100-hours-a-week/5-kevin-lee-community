import express from 'express'
import { getPostCreatePage, getPostDetailPage, getPostEditPage, getPostsPage } from '../controllers/postController.js'

const postsRouter = express.Router();

postsRouter.get('/', getPostsPage);

postsRouter.get('/edit', getPostEditPage);

postsRouter.get('/create', getPostCreatePage);

postsRouter.get('/detail', getPostDetailPage);

export default postsRouter