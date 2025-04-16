import express from 'express';
import apiRoutes from './routes/api.js';

const app = express();

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));