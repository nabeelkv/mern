import express from 'express';

import { getPosts, createPost } from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// routes
router.get('/', getPosts);
router.post('/', createPost);

export default router;