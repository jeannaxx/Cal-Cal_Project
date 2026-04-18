import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MenuIconButton } from "./MenuIconButton";

interface ActionMenuProps {
  onChangeMeal?: () => void;
}

export const ActionMenu = ({ onChangeMeal }: ActionMenuProps) => {
  const router = useRouter();

  return (
    <View style={styles.iconMenu}>
      <MenuIconButton
        label="หมวดหมู่"
        icon="grid-outline"
        onPress={() => router.push('/food-categories' as any)}
      />
      <MenuIconButton 
        label="ไดอารี่" 
        icon="book-outline" 
        onPress={() => router.push('/food-diary' as any)} 
      />
      <MenuIconButton 
        label="ถ่ายรูป" 
        icon="camera-outline" 
        onPress={() => router.push('/food-camera' as any)} 
      />
      <MenuIconButton 
        label="เปลี่ยนมื้อ" 
        icon="swap-horizontal-outline" 
        onPress={onChangeMeal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconMenu: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: "#eee" },
});