import express from 'express';
const router = express.Router();

import { signup, signin } from '../controllers/userController.js';

// routes
router.post('/signin', signin);
router.post('/signup', signup);

export default router;