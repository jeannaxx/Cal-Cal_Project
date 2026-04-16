// prisma/seed.ts

import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  // ข้อมูลอาหารตัวอย่าง
  const foods = [
    { foodName: 'ข้าวผัดกะเพราไข่ดาว', calories: 630, unit: 'จาน', category: 'อาหารจานเดียว' },
    { foodName: 'ข้าวมันไก่', calories: 596, unit: 'จาน', category: 'อาหารจานเดียว' },
    { foodName: 'ส้มตำไทย', calories: 120, unit: 'จาน', category: 'อาหารจานเดียว' },
    { foodName: 'ต้มยำกุ้ง', calories: 150, unit: 'ถ้วย', category: 'อาหารจานเดียว' },
    { foodName: 'อกไก่นุ่ม', calories: 120, unit: 'ชิ้น', category: 'โปรตีน' },
    { foodName: 'สันในไก่นุ่ม', calories: 60, unit: 'ชิ้น', category: 'โปรตีน' },
    { foodName: 'ปลานึ่ง', calories: 220, unit: 'ชิ้น', category: 'โปรตีน' },
    { foodName: 'ลูกชิ้นหมู', calories: 35, unit: 'ชิ้น', category: 'โปรตีน' },

  ];

  console.log('กำลังเริ่ม Seeding อาหาร...');
  for (const f of foods) {
    // ตรวจสอบก่อนว่ามีชื่อนี้ในระบบหรือยัง เพื่อป้องกันข้อมูลซ้ำตอนรัน seed ซ้ำ
    const exists = await prisma.food.findFirst({ where: { foodName: f.foodName } });
    if (!exists) {
      await prisma.food.create({ data: f });
    }
  }

  // ข้อมูลท่าออกกำลังกายตัวอย่าง
  const exercises = [
    { exName: 'วิ่ง', level: 'ปานกลาง', kcal: 500 },
    { exName: 'ปั่นจักรยาน', level: 'ปานกลาง', kcal: 400 },
    { exName: 'ว่ายน้ำ', level: 'สูง', kcal: 700 },
    { exName: 'กระโดดเชือก', level: 'สูง', kcal: 600 },
  ];

  console.log('กำลังเริ่ม Seeding ท่าออกกำลังกาย...');
  for (const ex of exercises) {
    const exists = await prisma.Exercises.findFirst({ where: { exName: ex.exName } });
    if (!exists) {
      await prisma.Exercises.create({ data: ex });
    }
  }

  console.log('ข้อมูลสำเร็จเรียบร้อย!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });