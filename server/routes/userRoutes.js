import express from 'express';
const router = express.Router();

import { signupController, signinController, googlesigninController } from '../controllers/userController.js';

// routes
router.post('/signin', signinController);
router.post('/signup', signupController);
router.post('/googlesignin', googlesigninController);

export default router;