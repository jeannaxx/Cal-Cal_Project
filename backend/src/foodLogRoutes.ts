import { Router } from 'express';
import { PrismaClient } from '../generated/prisma';

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /api/food-logs
 * สำหรับบันทึกประวัติการทานอาหารจาก Mobile App
 */
router.post('/', async (req, res) => {
  try {
    const { user_Id, food_Id, amountEaten, mealType, logData } = req.body;

    // บันทึกลงฐานข้อมูลด้วย Prisma โดยแมปชื่อฟิลด์ให้ตรงกับ Schema
    const newLog = await prisma.foodLogs.create({
      data: {
        user_Id: Number(user_Id),
        food_Id: Number(food_Id),
        amountEaten: Number(amountEaten),
        mealType: mealType,
        logData: logData ? new Date(logData) : new Date(),
      },
    });

    return res.status(201).json(newLog);
  } catch (error) {
    console.error('Error creating food log:', error);
    return res.status(500).json({ error: 'ไม่สามารถบันทึกข้อมูลการทานอาหารได้' });
  }
});

export default router;