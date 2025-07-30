import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Tasko server is running!');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;