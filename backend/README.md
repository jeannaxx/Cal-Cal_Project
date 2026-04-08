✭ เกี่ยวกับ Datdabase
@id : Primary Key
@default(uuid()) : ไม่ให้ไอดีซ้ำ
@default(autoincrement()) : นับเลขให้เองอัติโนมัติ ทุกครั้งที่มีการเพิ่มใหม่ เปลี่ยน strเป็นint
✭user User @relation(fields: [user_Id],references: [user_Id])
usre : การตั้งชื่อฟิลด์
User : Model (ตาราง)
fields: [user_Id] : "คอลัมน์ในตารางปันจุบัน" (เช่นใน foodLogs)
references: [user_Id] : "คอลัมน์ต้นทาง" (ในตาราง User) จะเอาเทียบว่าตรงกันไหม
****อธิบายสั้นๆ ในตารางPrisma ในตารางบันทึกอาหารเนี้ย ฉันสร้าง user_Id 
(3) ไว้นะ..รบกวนช่วยไปดูที่ตาราง User 
(2) หน่อยสิ ว่าใครที่มีเลข user_Id 
(4) ตรงกับช่องนี้บ้าง? ถ้าเจอเเเล้วให้เอาข้อมูลคนนั้นมาใส่ไว้ในตัวแปรที่ชื่อว่า user 
(1)ให้ฉันทีนะ
✭DATABASE_URL : ฟิลทางด่วน จัดระเบียบรถ (*การรันเเอป) port6543  
✭DIRECT_URL : ทางเข้าประตู (*สร้างตาราง) ใช้ตอนเราสั่ง npx prisma db เพื่อไปสร้างตารางฐานข้อมูล



รัน migrate
npx prisma migrate dev --name init
npx prisma generate