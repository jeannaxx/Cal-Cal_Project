import express from 'express';
import {PrismaClient} from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  //การดึงไฟล์จากenv ฐานข้อมูล

const app = express();
const prisma = new PrismaClient; // agent take Neon database
const PORT = process.env.PORT || 8089;
 
app.use(cors()); //เปิดประตูรับการเชื่อมต่อจากภายนอก
app.use(express.json()); //tell server that object.json

//ส่วนของ (Routes/API Endpoint) =>API
app.get('/users',async(req,res) =>{
   try {
    const user = await prisma.user.findMany(); //ดึงมาจากUser in neon
    res.json(user);    //ส่งกลับเป็นjson  res การส่ง
   }catch (error){
    res.status(500).json({error:"ดึงข้อมูลไม่สำเร็จ"});
   }
});



//ตัวให้server ทำงาน
app.listen(PORT,()=>{
    console.log(`Sever is runing on the http://localhost:${PORT}`);
});