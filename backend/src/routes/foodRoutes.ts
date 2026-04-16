import { Router } from 'express';
import { searchFood, logDailyFood } from '../controllers/foodController';

const router = Router();

router.get('/search', searchFood);
router.post('/log', logDailyFood);

export default router;