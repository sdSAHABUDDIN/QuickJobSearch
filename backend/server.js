import express from 'express';
import authroute from './routes/auth.route.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/auth',authroute );
app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
});

app.listen(PORT, () => {  
  console.log(`Server is running on http://localhost:${PORT}`);
}
);
