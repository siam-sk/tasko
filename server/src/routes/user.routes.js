import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  resetPassword,
  getCurrentUser,
  updateUserScore,
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getCurrentUser);
router.patch('/me/score', protect, updateUserScore);

export default router;