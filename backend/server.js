import dotenv from 'dotenv';
dotenv.config(); // Load env variables

import express from 'express';
import authroute from './routes/auth.route.js';
import { connectDB } from './lib/db.js';

const app = express();
const PORT =  3000;
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api/auth', authroute);

app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection failed:', error.message));
});

