//เทนูด้านข้าง
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export const Sidebar = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const router = useRouter();

  const menuItems = [
    { label: "โปรไฟล์ของฉัน", path: "/profile", icon: "person-outline" },
    { label: "อาหารของฉัน", path: "/food-search", icon: "restaurant-outline" },
    { label: "ตั้งค่า", path: "/settings", icon: "settings-outline" }
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        {/* ส่วนเมนูหลัก */}
        <LinearGradient
          colors={['#FF85A2', '#f472a0']}
          style={styles.sidebarContainer}
        >
          {/* 1. ส่วนหัว Sidebar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.profileSection}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={40} color="#f472a0" />
              </View>
              <Text style={styles.profileName}>CAL-CAL</Text>
              <Text style={styles.profileTagline}>เพื่อนคู่คิด เรื่องแคลอรี่</Text>
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
                  router.push(item.path as any);
                }}
              >
                {/* ช่องสี่เหลี่ยมสีขาวใส่ไอคอน */}
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

        {/* ส่วนพื้นหลังที่เหลือ (แตะเพื่อปิด) */}
        <TouchableOpacity style={styles.flexArea} activeOpacity={1} onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  sidebarContainer: { 
    width: '75%', 
    height: '100%', 
    padding: 25, 
    borderTopRightRadius: 30, 
    borderBottomRightRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  flexArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }, 
  header: { marginBottom: 40, paddingTop: 20 },
  closeBtn: { marginBottom: 20 },
  profileSection: { alignItems: 'center', marginTop: 10 },
  avatarCircle: { 
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10
  },
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