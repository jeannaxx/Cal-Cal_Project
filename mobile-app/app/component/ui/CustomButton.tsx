//สร้างอันดับสอง ส้รางปุ่มเตรียมให้เรียกใช้
//หน้าปุ่ม 


import React from "react";
import { StyleSheet, TouchableOpacity,Text,ActivityIndicator } from "react-native";

interface CustomButtonProps{
  title : string;
  onPress :() => void;
  variant?: "primary" | "secondary" | "google" | "facebook" |"create";  //การกำหนดปุ่มตามประเภท
  size?: "sm"|"md" | "lg"; //ขนาดปุ่มม 
  isLoading?: boolean;
};

export const CustomButton =({
  title,
  onPress,
  variant = "primary",
  size = "md",
}:CustomButtonProps) => {
  //การกำหนดสีตามfingma
  const  variantClasses ={
    primary :"bg-[#6BCB77]  active:bg-green-600",   //เข้าสุ่ระบบสีเขีียว ไม่ใช่สีหลัก []
    secondary: "bg-gray-500 active:bg-gray-600",
    google: "bg-white border border-gray-200 active:bg-gray-100", // ปุ่ม Google
    facebook: "bg-[#42a5f5] active:bg-blue-600", // ปุ่ม Facebook
    create: "bg-[#FF8FB1] active:bg-pink-400", // ปุ่มสร้างบัญชี (สีชมพู)
  };
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };
  // สีข้อความสำหรับปุ่ม Google จะเป็นสีเทาเข้ม นอกนั้นเป็นสีขาว
  const textColor = variant === "google" ? "text-gray-600" : "text-white";
  
  return(
   <TouchableOpacity
      className={[
        "rounded-full items-center justify-center my-2", // ปรับเป็น rounded-full เพื่อให้ปุ่มมนสวยเหมือนดีไซน์
        variantClasses[variant], //สีปุ่ม ขึ้นกับ variant
        sizeClasses[size],   //ขนาด
      ].join(' ')}
      onPress={onPress}
    >
      <Text className={`${textColor} font-semibold`}>{title}</Text>
    </TouchableOpacity>
  );



}; //ปิดใหญ่