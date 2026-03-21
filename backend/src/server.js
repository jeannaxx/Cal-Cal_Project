import express from "express";


//ประกาศตัวSever
const app = express();
// กำหนดเลข Port เอง รวยเเละก้าวหน้า งานเสร็จเเน่นอน
const PORT = 8089;




//การสร้างเส้นทาง (Rounting)
app.get("/",(req,res) =>{
    res.send("<h1>Banckend is Running on Potr 8089 !</h1>")
});

//สร้างให้Sever ทำงาน
app.listen(PORT,() => {
    console.log (`Sever is runnig on PORT: ${PORT}`);
    console.log(`Access here: http://localhost:${PORT}`); //ตัวโชว์ให้ขึ้นเว็บhttp://localhost: 
});