import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../component/home/Header';
import { Ionicons } from '@expo/vector-icons';
import { Sidebar } from '../component/home/Sidebar';

export default function ExerciseScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const categories = [
    { id: 1, name: 'คาร์ดิโอ', icon: 'heart', color: '#ffb7b2' },
    { id: 2, name: 'เวทเทรนนิ่ง', icon: 'barbell', color: '#ffdac1' },
    { id: 3, name: 'โยคะ', icon: 'body', color: '#e2f0cb' },
    { id: 4, name: 'ยืดเหยียด', icon: 'fitness', color: '#b5ead7' },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#f472a0' }}>
        <Header onOpenMenu={() => setSidebarVisible(true)} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>หมวดหมู่การออกกำลังกาย</Text>
        
        <View style={styles.grid}>
          {categories.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.card, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={40} color="#555" />
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderTitle}>แผนแนะนำวันนี้</Text>
          <Text style={styles.placeholderDesc}>คุณยังไม่มีแผนการออกกำลังกายสำหรับวันนี้</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>สร้างแผนใหม่</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
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
});
