//เทนูด้านข้าง
import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75; // กำหนดความกว้าง Sidebar เป็น 75% ของจอ

export const Sidebar = ({ visible, onClose, userProfile }: { visible: boolean; onClose: () => void; userProfile: any }) => {
  const router = useRouter();
  // สร้างตัวแปรแอนิเมชัน เริ่มต้นที่ค่าติดลบ (อยู่นอกจอทางซ้าย)
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      // เลื่อนเข้ามาทางขวา
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // เลื่อนกลับไปทางซ้าย
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    { label: "โปรไฟล์ของฉัน", path: "/profile", icon: "person-outline" },
    { label: "อาหารของฉัน", path: "/food-search", icon: "restaurant-outline" },
    { label: "ตั้งค่าระบบ", path: "/settings", icon: "settings-outline" }
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* ส่วนพื้นหลังโปร่งแสงสำหรับกดปิด */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* ส่วนเมนูหลัก */}
        <Animated.View 
          style={[
            styles.sidebarContainer, 
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <LinearGradient
            colors={['#FF85A2', '#f472a0']}
            style={styles.gradient}
          >
            {/* 1. ส่วนหัว Sidebar */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={32} color="#fff" />
              </TouchableOpacity>
              
              <View style={styles.profileSection}>
                <View style={styles.avatarCircle}>
                  {userProfile?.avatar_url ? (
                    <Image source={{ uri: userProfile.avatar_url }} style={styles.avatarImage} />
                  ) : (
                    <Ionicons name="person" size={40} color="#f472a0" />
                  )}
                </View>
                <Text style={styles.profileName} numberOfLines={1}>{userProfile?.full_name || 'My Profile'}</Text>
                <Text style={styles.profileTagline}>{userProfile?.daily_calorie_goal ? `เป้าหมาย: ${userProfile.daily_calorie_goal} kcal` : 'ตั้งค่าเป้าหมายแคลอรี่ของคุณ'}</Text>
              </View>
            </View>

            {/* 2. รายการเมนู */}
            <View style={styles.menuList}>
              {menuItems.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.menuItem}
                  onPress={() => {
                    onClose();
                    setTimeout(() => router.push(item.path as any), 300);
                  }}
                >
                  <View style={styles.iconPlaceholder}>
                    <Ionicons name={item.icon as any} size={24} color="#f472a0" />
                  </View>
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 3. ส่วนท้าย Sidebar */}
            <View style={styles.sidebarFooter}>
              <Text style={styles.versionText}>Version 1.0.0</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  backdrop: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,0.4)' 
  },
  sidebarContainer: { 
    width: SIDEBAR_WIDTH, 
    height: '100%', 
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  gradient: { 
    flex: 1, 
    padding: 25,
    borderTopRightRadius: 40, 
    borderBottomRightRadius: 40,
    overflow: 'hidden' // มั่นใจว่าเนื้อหาข้างในไม่ทะลุขอบโค้ง
  },
  header: { marginBottom: 30, paddingTop: 20 },
  closeBtn: { marginBottom: 20 },
  profileSection: { alignItems: 'center', marginTop: 10 },
  avatarCircle: { 
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10
  },
  avatarImage: { width: 80, height: 80, borderRadius: 40 },
  profileName: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: 1.5 },
  profileTagline: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
  menuList: { flex: 1 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    padding: 12, 
    borderRadius: 20 
  },
  iconPlaceholder: { 
    width: 42, height: 42, backgroundColor: '#fff', 
    borderRadius: 12, marginRight: 15, 
    justifyContent: 'center', alignItems: 'center' 
  },
  menuText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  sidebarFooter: { 
    paddingTop: 20, 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.2)', 
    alignItems: 'center' 
  },
  versionText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 }
});