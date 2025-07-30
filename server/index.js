import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.config.js';

dotenv.config();

const port = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();