import express from 'express';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes';
import foodLogRoutes from './foodLogRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ใช้งาน Routes
app.use('/api/foods', foodRoutes);
app.use('/api/food-logs', foodLogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});