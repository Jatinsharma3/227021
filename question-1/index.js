import express from 'express';
import numbersRoute from './routes/numbersRoute.js';

const app = express();
const PORT = 5000;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Numbers API!');
});

// Use numbersRoute for handling requests
app.use('/numbers', numbersRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});