import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Tasko server is running!');
});

export default app;