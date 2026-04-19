//หน้าสมัครสมากชิก
//สร้างฟิลด์ เเท๊กข้อความช่องต่างๆ
//ศูยน์รวมของพวกบ๊อง
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { supabase } from "../common/supabase";
import { CustomInput } from "./CustomInput";
import { CustomButton } from "./CustomButton";
import { useRouter } from 'expo-router';


interface FormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface FormErrors {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function TextFields() {

  const router = useRouter();
  //state เก็บตัวแปร From
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //State เก็บ error Messages
  const [errors, setErrors] = useState<FormErrors>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //state สำหรับfieldที่ถูก touchเเล้ว
  const [touch, setTouched] = useState<{ [key: string]: Boolean }>({});
  //State สำหรับ loading
  const [isLoading, setIsLoading] = useState(false); //ยังไม่โหลด55

  //state เก็บๅerrors
  // const [newErrors,setnewErros] = useState<{ [key: string]: Boolean }>({});

  //ฟังก์ชันfield ช่องที่เอาไว้กรอก
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "userName":
        if (!value.trim()) {
          return "กรุณาชื่อ";
        }
        if (value.trim().length < 3) {
          return "ชื่อ ต้องมีอย่างน้อย 3 ตัวอักษร";
        }
        return undefined;
      case "email":
        if (!value.trim()) {
          return "กรุณากรอกอีเมล";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "รูปแบบอีเมลไม่ถูกต้อง";
        }
        return undefined;
      case "password":
        if (!value.trim()) {
          return "กรุณากรอกรหัสผ่าน";
        }
        if (value.trim().length < 8) {
          return "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
        }
        return undefined;
      case "confirmPassword":
        if (!value) {
          return "กรุณายืนยันรหัสผ่าน";
        }
        if (value !== formData.password) {
          return "รหัสผ่านไม่ตรงกัน";
        }
        return undefined;
      default:
        return undefined;
    }
  };
  //ฟังก์ชันการเปลี่ยนเเปลงค่าในinput
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    //Validate realtime ถ้าfild(ช่อง) ถูก touchเเล้ว
    if (touch[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error ?? "",
      }));
    }
  };
  //fucntion จัดการเมื่อInputถูกblur(สูยเสียการโฟกัส)
  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    //Validate เมื่อblur
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  //function  Validate ทั้ง form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // ตรวจสอบทุก field
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // 2. Mark ทุก field ว่าถูก touch แล้ว
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });

    setTouched(allTouched); // บังคับให้ Error แดงทุกช่องที่ว่าง
    return isValid;
  };
  //การsubmit
  const handSubmit = async () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง");
      return;
    }

    setIsLoading(true);
    try {
      // 1. สมัครสมาชิกผ่าน Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.userName, // เก็บ username ใน user metadata
          },
        },
      });

      if (error) throw error;

      // หมายเหตุ: ข้อมูลในตาราง profiles จะถูกสร้างอัตโนมัติโดย Database Trigger
      // ไม่จำเป็นต้องใช้ .from("profiles").insert(...) ที่นี่แล้ว

      Alert.alert(
        "สมัครสมาชิกสำเร็จ! 🎉",
        "กรุณาตรวจสอบอีเมลเพื่อยืนยันตัวตน",
        [{ text: "ตกลง", onPress: () => router.push("/register") }],
      );

      handleReset();
    } catch (err: any) {
      console.error(err);
      Alert.alert("เกิดข้อผิดพลาด", err.message || "ไม่สามารถสมัครสมาชิกได้");
    } finally {
      setIsLoading(false);
    }
  };
  //ฟังก์ชันรีเช็ต
  const handleReset = () => {
    // 1. ล้างข้อมูลใน Input ทุกช่อง
    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // ถ้ามี gender ก็ใส่ gender: "" ด้วยนะครับ
    });
    // 2. ล้างค่า Error
    setErrors({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    // 3. ล้างสถานะการ Touch (ไม่ให้ขึ้นตัวแดงทันทีหลังล้างฟอร์ม)
    setTouched({});
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-[#FDE2E4]"
          contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* ใช้แม่พิมพ์ที่เราสร้างไว้ */}
          <View>
            <CustomInput
              label="Username"
              value={formData.userName}
              onChangeText={(value) => handleChange("userName", value)}
              onBlur={() => handleBlur("userName")}
              error={errors.userName}
              touched={!!touch.userName}
            />

            <CustomInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={!!touch.email}
            />

            <CustomInput
              label="Password"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={!!touch.password}
              secureTextEntry
            />

            <CustomInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={!!touch.confirmPassword}
              secureTextEntry
            />
          </View>

          {/* ข้อความยอมรับเงื่อนไข */}
          <View className="my-5">
            <Text className="text-blue-700 text-center">
              เมื่อคุณกดปุ่มลงชื่อเข้าใช้เท่ากับว่าคุณได้อ่านเเละยอมรับ
            </Text>
            <Text className="text-red-700 text-sm text-center">
              นโยบายความเป็นส่วนตัวเเละเงื่อนไขการใช้บริการ
            </Text>
          </View>

          {/* ใส่ปุ่มที่เราสร้างไว้ (CustomButton) */}
          <CustomButton
            title="สร้างบัญชี"
            onPress={handSubmit}
            isLoading={isLoading}
          />

          {/* ปุ่มรีเซ็ต */}
          <TouchableOpacity onPress={handleReset} className="mt-4">
            <Text className="text-gray-500 text-center">ล้างข้อมูล</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
} //ปิดใหญ่

const styles = StyleSheet.create({
  container: {},
  input: {},
});
