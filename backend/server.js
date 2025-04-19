import express from 'express';
import authroute from './routes/auth.route.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/auth',authroute );
app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
});

app.listen(PORT, () => {  
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection failed:', error.message));
  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
  }
  );
}
);
