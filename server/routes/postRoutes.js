import express from 'express';

import { getPostsController, getPostController, updatePostController, getPostsBySearchController, createPostController, deletePostController, likePostController, commentPostController } from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// routes
router.get('/', getPostsController);
router.post('/', authMiddleware, createPostController);
router.get('/search', getPostsBySearchController);
router.patch('/:id', authMiddleware, updatePostController);
router.get('/:id', getPostController);
router.delete('/:id', authMiddleware, deletePostController);
router.patch("/:id/likePost", authMiddleware, likePostController);
router.post("/:id/commentPost", authMiddleware, commentPostController);

export default router;