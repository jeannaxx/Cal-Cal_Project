import dotenv from 'dotenv';
dotenv.config(); // ต้องอยู่บนสุดก่อน import อื่น

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '../generated/prisma';
import { createClient } from '@supabase/supabase-js';

export const prisma = new PrismaClient();
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const app = express();
app.use(cors());
app.use(express.json());

import authRouter from './routes/auth.route';
app.use('/auth', authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});