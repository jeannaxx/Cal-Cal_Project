📍npm init -y :สร้างไฟล์ package.json เเบบบประหยัดเวลา (-y คือตอบ Yes ทุกหัวข้อที่ไฟล์ถาม)
📍npm install express  
:การติ้ดตั้ง Framwork สำเร็จรูป in Node.js ,help you make  web server or Api that fast
📍nodemon 
: ตัวช่วยให้เชริฟเวอร์ รันค้างตลอดเวลา "รีสตาร์ทตัวเอง"
📍 "type": "module",
:บอกNode.jsว่าเป็น module นะ
📍การตั้งPPRT พอร์ตนี้อยู่ในช่วง Registered Ports (1024-49151) ซึ่งคอมพิวเตอร์อนุญาตให้ใช้ได้ทันที 
📍import express from "express";
-การดึง Express Framework เข้ามาในไฟล์ เพื่อนสร้างweb sever
📍const app = express();
-การประกาศตัวแปร .. ตัวเเทนSever 
____________________________________________
📍app.get
-การสร้างเส้นทางRouting
📍 app.listen (ฟังนะๆ)
-การสั่งให้Sever เริ่มทำงาน 

⚙การทำงาน Architecture
Client (Browser/Mobile) ส่งคำขอ(Req) มาที่Port 8089
Express รับคำสั่งดูว่าเป็นทางเข้าไหน (Route)
Sever ส่งข้อมูลกลีบไปที่ (Response) เช่นBanckend is Runing

📍console.log(`Access here: http://localhost:${PORT}`);
:http://localhost ตัวที่เเสดงตัวจิ้มไป เว็บนั้นเอง 