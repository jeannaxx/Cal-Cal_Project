import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export const StepDots = ({ currentStep }: { currentStep: number }) => {
  const router = useRouter();

  // กำหนดเส้นทางของแต่ละจุด (0 = gender, 1 = info-input, 2 = goal, 3 = summary)
  const steps = ["/gender", "/info-input", "/goal", "/summary"];

  return (
    <View style={styles.container}>
      {steps.map((route, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => router.push(route as any)} // กดที่จุดเพื่อย้อนกลับหรือไปหน้านั้นๆ
          style={[
            styles.dot,
            currentStep === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#c23b6a", // สีเข้มเมื่ออยู่หน้านั้น
    width: 12, // ขยายขนาดเล็กน้อยให้รู้ว่าอยู่หน้านี้
    height: 12,
  },
  inactiveDot: {
    backgroundColor: "#f9c4d0", // สีอ่อนสำหรับหน้าอื่น
  },
});