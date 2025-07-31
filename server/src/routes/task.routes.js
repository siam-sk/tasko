import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStatusOptions,
  getCategoryOptions,
} from '../controllers/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect);

router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);


router.get('/status-options', getStatusOptions);
router.get('/category-options', getCategoryOptions);

export default router;