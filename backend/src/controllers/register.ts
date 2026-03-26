import {Request,Response} from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { error } from 'console';

const prisma = new PrismaClient;

export const register = async (req:Request ,res:Response) => {
    const {username,email,password,confirmPassword} = req.body  //รับมาจากfont-end  มาขอนะ

    if (password !== confirmPassword){
        return res.status(400).json({error: "รหัสผ่านไม่ตรงกัน"})
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{username,email,password:hashedPassword}
        });
    }catch(error){
        res.status(500).json({error:"สมัครสมาชิกไม่สำเร็จ(อีเมลหรือชื่อถูกใช้งานไปเเล้ว )"})
    }
};