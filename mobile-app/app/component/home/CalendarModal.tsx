import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CalendarModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('cal'); // โหมดเริ่มต้นคือแคลอรี่
  const [currentDate, setCurrentDate] = useState(new Date()); // วันที่ปัจจุบันที่กำลังดูในปฏิทิน

  // คำนวณหาจำนวนวันในเดือน และวันแรกของเดือนตกวันอะไร
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = อาทิตย์, 1 = จันทร์...

  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  // ฟังก์ชันเลื่อนเดือน
  const changeMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  // สร้าง Array ของวันที่ทั้งหมดในเดือนนั้นๆ รวมถึงช่องว่างก่อนวันที่ 1
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // ช่องว่างสำหรับวันของเดือนก่อนหน้า
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullContainer}>
        {/* ส่วนหัวปฏิทิน */}
        <View style={styles.calHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.arrowBtn}>
            <Ionicons name="chevron-back" size={28} color="#FF85A2" />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.monthLabel}>{monthNames[month]} {year + 543}</Text>
          </View>
          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.arrowBtn}>
            <Ionicons name="chevron-forward" size={28} color="#FF85A2" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.calendarPaper}>
            {/* หัวตารางวัน */}
            <View style={styles.dayHeaderRow}>
              {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((d, index) => (
                <Text key={d} style={[styles.dayHeaderText, (d === 'อา' || d === 'ส') && { color: '#FFB7B2' }]}>{d}</Text>
              ))}
            </View>
            {/* ตารางวันที่แบบ Grid */}
            <View style={styles.calendarGrid}>
              {calendarDays.map((date, idx) => (
                <View key={idx} style={styles.dateCell}>
                  {date && (
                    <TouchableOpacity style={[
                      styles.dateBubble,
                      date === new Date().getDate() && month === new Date().getMonth() && { backgroundColor: '#FF85A2' }
                    ]}>
                      <Text style={[
                        styles.dateNumText,
                        date === new Date().getDate() && month === new Date().getMonth() && { color: '#fff' }
                      ]}>{date}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* แถบเมนูด้านล่าง */}
        <View style={styles.bottomTabBar}>
          <NavIcon icon="flame" label="แคลอรี่" color="#FFB7B2" active={activeTab === 'cal'} onPress={() => setActiveTab('cal')} />
          <NavIcon icon="scale" label="น้ำหนัก" color="#FFDAC1" active={activeTab === 'weight'} onPress={() => setActiveTab('weight')} />
          <NavIcon icon="walk" label="การเดิน" color="#E2F0CB" active={activeTab === 'walk'} onPress={() => setActiveTab('walk')} />
          <NavIcon icon="water" label="ดื่มน้ำ" color="#B5EAD7" active={activeTab === 'water'} onPress={() => setActiveTab('water')} />
          <NavIcon icon="close-circle" label="ปิด" color="#FF85A2" active={false} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const NavIcon = ({ icon, label, color, active, onPress }: any) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <View style={[styles.navCircle, { backgroundColor: active ? color : '#F0F0F0' }]}>
      <Ionicons name={icon} size={24} color={active ? '#fff' : '#757575'} />
    </View>
    <Text style={[styles.navLabel, { color: active ? '#555' : '#999' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#FFF9FB', paddingTop: 60 },
  calHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, marginBottom: 25 },
  arrowBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  monthLabel: { fontSize: 22, color: '#FF85A2', fontWeight: '800' },
  yearLabel: { fontSize: 16, color: '#888', marginTop: 2 },
  calendarPaper: { marginHorizontal: 15, borderRadius: 30, backgroundColor: '#fff', padding: 10, elevation: 5, shadowColor: '#FF85A2', shadowOpacity: 0.1, shadowRadius: 15 },
  dayHeaderRow: { flexDirection: 'row', paddingVertical: 15 },
  dayHeaderText: { flex: 1, textAlign: 'center', color: '#888', fontWeight: '700', fontSize: 13 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dateCell: { width: `${100 / 7}%`, height: 55, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  dateBubble: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
  dateNumText: { fontSize: 16, color: '#555', fontWeight: '600' },
  bottomTabBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 20, 
    paddingBottom: 35,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  navItem: { alignItems: 'center' },
  navCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  navLabel: { fontSize: 11, fontWeight: '700' },
});