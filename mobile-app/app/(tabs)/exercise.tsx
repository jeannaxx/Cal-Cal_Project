import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../component/home/Header';
import { Ionicons } from '@expo/vector-icons';
import { Sidebar } from '../component/home/Sidebar';
import { CalendarModal } from '../component/home/CalendarModal';

// ข้อมูลสมมติสำหรับแสดงผล (ในอนาคตเปลี่ยนเป็น fetch จาก GET /api/exercises)
const MOCK_EXERCISES = [
  { id: 1, name: 'วิ่งลู่วิ่ง', kcal: 10, unit: 'นาที' },
  { id: 2, name: 'วิดพื้น', kcal: 0.5, unit: 'ครั้ง' },
  { id: 3, name: 'สควอท', kcal: 0.6, unit: 'ครั้ง' },
  { id: 4, name: 'กระโดดเชือก', kcal: 12, unit: 'นาที' },
];

export default function ExerciseScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedEx, setSelectedEx] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<any>(null);
  const [amount, setAmount] = useState('');

  const categories = [
    { 
      id: 1, name: 'คาร์ดิโอ', icon: 'heart', color: '#ffb7b2',
      videos: [
        { title: 'Cardio Workout 15 Min', id: 'ml6cT4AZdqI' },
        { title: 'Fat Burning No Equipment', id: '2MoGxae-zyo' }
      ]
    },
    { 
      id: 2, name: 'เวทเทรนนิ่ง', icon: 'barbell', color: '#ffdac1',
      videos: [
        { title: 'Full Body Strength', id: 'XbePDf98S3A' },
        { title: 'Dumbbell Only Workout', id: '6vYn7Csc7-A' }
      ]
    },
    { 
      id: 3, name: 'โยคะ', icon: 'body', color: '#e2f0cb',
      videos: [
        { title: 'Yoga for Beginners', id: 'v7AYKMP6rOE' },
        { title: '10 Min Morning Yoga', id: 'VaoV1PrYfto' }
      ]
    },
    { 
      id: 4, name: 'ยืดเหยียด', icon: 'fitness', color: '#b5ead7',
      videos: [
        { title: 'Full Body Stretch', id: 'g_tea8ZNk5A' }
      ]
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#f472a0' }}>
        <Header 
          onOpenMenu={() => setSidebarVisible(true)} 
          onOpenCalendar={() => setCalendarVisible(true)}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>หมวดหมู่การออกกำลังกาย</Text>
        
        <View style={styles.grid}>
          {categories.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.card, { backgroundColor: item.color }]}
              onPress={() => {
                setActiveCategory(item);
                setCategoryModalVisible(true);
              }}
            >
              <Ionicons name={item.icon as any} size={40} color="#555" />
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderTitle}>แผนแนะนำวันนี้</Text>
          <Text style={styles.placeholderDesc}>คุณยังไม่มีแผนการออกกำลังกายสำหรับวันนี้</Text>
          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => setPlanModalVisible(true)}
          >
            <Text style={styles.addBtnText}>สร้างแผนใหม่</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal สำหรับแสดงคลิปแนะนำตามหมวดหมู่ */}
      <Modal visible={categoryModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { minHeight: 300 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>คลิปแนะนำ: {activeCategory?.name}</Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView>
              {activeCategory?.videos.map((vid: any, index: number) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.videoItem}
                  onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${vid.id}`)}
                >
                  <View style={styles.videoIconBox}>
                    <Ionicons name="play-circle" size={30} color="#f472a0" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.videoTitle}>{vid.title}</Text>
                    <Text style={styles.videoSub}>กดเพื่อดูบน YouTube</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal สำหรับสร้างแผนใหม่ */}
      <Modal visible={planModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>สร้างแผนออกกำลังกาย</Text>
              <TouchableOpacity onPress={() => { setPlanModalVisible(false); setSelectedEx(null); setAmount(''); }}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>เลือกท่าออกกำลังกาย</Text>
            <View style={styles.exercisePicker}>
              {MOCK_EXERCISES.map(ex => (
                <TouchableOpacity 
                  key={ex.id} 
                  style={[styles.exItem, selectedEx?.id === ex.id && styles.exItemSelected]}
                  onPress={() => setSelectedEx(ex)}
                >
                  <Text style={[styles.exItemText, selectedEx?.id === ex.id && styles.exItemTextSelected]}>
                    {ex.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedEx && (
              <View style={styles.inputArea}>
                <Text style={styles.label}>เป้าหมายที่ต้องการทำ ({selectedEx.unit})</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ระบุตัวเลข..."
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
                <Text style={styles.hintText}>
                  คาดว่าจะเผาผลาญ: {amount ? (parseFloat(amount) * selectedEx.kcal).toFixed(0) : 0} kcal
                </Text>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.saveBtn, !selectedEx && { backgroundColor: '#ccc' }]}
              disabled={!selectedEx}
              onPress={() => {
                alert('บันทึกแผนสำเร็จ!'); // ในอนาคตใช้ POST /api/exercise-logs
                setPlanModalVisible(false);
              }}
            >
              <Text style={styles.saveBtnText}>บันทึกเข้าแผนวันนี้</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      <CalendarModal visible={calendarVisible} onClose={() => setCalendarVisible(false)} />
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardText: { marginTop: 10, fontSize: 16, fontWeight: '600', color: '#444' },
  placeholderCard: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  placeholderTitle: { fontSize: 18, fontWeight: 'bold', color: '#666' },
  placeholderDesc: { color: '#999', textAlign: 'center', marginTop: 10 },
  addBtn: { marginTop: 20, backgroundColor: '#f472a0', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  addBtnText: { color: '#fff', fontWeight: 'bold' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, minHeight: 450 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  label: { fontSize: 16, fontWeight: '600', color: '#666', marginBottom: 10 },
  exercisePicker: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  exItem: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#f0f0f0' },
  exItemSelected: { backgroundColor: '#f472a0' },
  exItemText: { color: '#666' },
  exItemTextSelected: { color: '#fff', fontWeight: 'bold' },
  inputArea: { marginBottom: 25 },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee'
  },
  hintText: { marginTop: 8, color: '#f472a0', fontSize: 13, fontWeight: '600' },
  saveBtn: { 
    backgroundColor: '#f472a0', 
    paddingVertical: 15, 
    borderRadius: 15, 
    alignItems: 'center',
    elevation: 3
  },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  // Video List Styles
  videoItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  videoIconBox: { marginRight: 15 },
  videoTitle: { fontSize: 16, fontWeight: '600', color: '#444' },
  videoSub: { fontSize: 12, color: '#999', marginTop: 2 },
});
