//เก็บหน้าดาวโหลด มีภาพการ์ตูนผญ ตัวดาวโหลด+กรุณารอสักครู่+ปุ่มหมุนๆๆ
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";




//ดึงขนาดหน้จอให้ทับพอดี ในตอนดาวโหลด
const { width, height } = Dimensions.get("window");

export default function LoadingScreen() {
  return (
    <View style={styles.overlay}>
      {/*ตัวรูปภาพ*/}
      <Image
        source={require("../../../assets/Lesgo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/*ตัวบอกสถานะ*/}
      <Text style={styles.textload}>กรุณารอสักครู่....</Text>
      {/*ตัวหมุนกลมๆ */}
      <ActivityIndicator size="large" color="#c82770" />
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(255,240,243,0.95)",
    justifyContent: "center",
    alignItems: "center",
    // zIndex สูงๆ เพื่อให้ทับปุ่มและช่องกรอกข้อมูลแน่นอน
    zIndex: 999,
  },
  image: {
    width: 2250,
    height: 250,
    // marginBottom:20,
  },
  textload: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF8E9E", // สีชมพูเข้ม
    marginBottom: 10,
    fontFamily: "System", // หรือฟอนต์ที่คุณติดตั้งไว้
  },
});
