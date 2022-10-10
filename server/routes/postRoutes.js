import express from 'express';

import { getPostsController, getPostsBySearchController, createPostController, deletePostController } from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// routes
router.get('/', getPostsController);
router.get('/search', getPostsBySearchController);
router.post('/', authMiddleware, createPostController);
router.delete('/:id', authMiddleware, deletePostController);

export default router;