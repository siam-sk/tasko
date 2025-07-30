import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);



export default router;