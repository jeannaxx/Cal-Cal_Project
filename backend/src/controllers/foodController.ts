import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchFood = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    const foods = await prisma.food.findMany({
      where: {
        name: {
          contains: String(query),
          mode: 'insensitive', // ค้นหาแบบไม่สนตัวพิมพ์เล็ก-ใหญ่
        },
      },
    });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: "ไม่สามารถค้นหาข้อมูลอาหารได้" });
  }
};

export const logDailyFood = async (req: Request, res: Response) => {
  const { userId, foodName, calories, mealType } = req.body;
  try {
    const log = await prisma.dailyLog.create({
      data: { userId, foodName, calories, mealType },
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: "ไม่สามารถบันทึกข้อมูลได้" });
  }
};