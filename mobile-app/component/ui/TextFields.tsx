//สร้างฟิลด์ เเท๊กข้อความช่องต่างๆ
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface FormData {
  userName: string;
  email: String;
  password: String;
  confirmPassword: String;
}
interface FormErrors {
  userName: string;
  email: String;
  password: String;
  confirmPassword: String;
}

export default function TextFields() {
  //state เก็บตัวแปร From
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //State เก็บ error Messages
  const [errors, SetErrors] = useState<FormErrors>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //state สำหรับfieldที่ถูก touchเเล้ว 
  const [touch,setTouched]=useState<{[key:string]:Boolean}>({});
  //State สำหรับ loading
  const [isLoading,setIsLoading] = useState(false); //ยังไม่โหลด55

  //ฟังก์ชันfield ช่องที่เอาไว้กรอก
  const validateField = (name: string, value: string): string | undefined => {
    switch(name){
      case "userName":
        if(!value.trim()){
          return"กรุณาชื่อ";
        }
        if(value.trim().length < 3){
          return "ชื่อ ต้องมีอย่างน้อย 3 ตัวอักษร";
        }
        return undefined;
      case "email":
        if(!value.trim()){
          return"กรุณากรอกอีเมล";
        }
        const emailRegex = /^[^\s@]+@[^|s@]+\.[^\s@]+$/;
        if(!emailRegex.test(value)){
          return"รูปแบบอีเมลไม่ถูกต้อง";
        }
        return undefined;
      case "password":
        if(!value.trim()){
          return"กรุณากรอกรหัสผ่าน";
        }
        if(value.trim().length < 8 ){
          return "รหัสผ่านต้องมีอย่างน้ยอย 6 ตัวอักษร";
        }
        return undefined;
      case "confirmPassword":
        if(!value){
          return"กรุณายืนยันรหัสผ่าน";
        }
        if (value !== formData.password){
          return "รหัสผ่านไม่ตรงกัน";
        }
        return undefined;
      default:
        return undefined;
    }
  };
  //ฟังก์ชันการเปลี่ยนเเปลงค่าในinput
  const handleChange = (name:keyof FormData,value:string) =>{
    setFormData((prev) =>({
      ...prev,
      [name]:value,
    }))
  }



  
}; //ปิดใหญ่
