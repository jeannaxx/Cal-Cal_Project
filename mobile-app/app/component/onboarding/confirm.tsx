import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    kcal: string; days: string; gender: string; age: string;
    height: string; weight: string; targetWeight: string;
  }>();

  const kcalNum = parseInt(params.kcal ?? '1200');

  const handleConfirm = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(params));
      router.replace('/(tabs)/onboarding/done' as any,);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>มาเริ่มนับแคลอรี่เพื่อไปให้ถึงเป้าหมายกัน!</Text>

        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>
            ปริมาณแคลอรี่ที่ควรบริโภค{'\n'}น้อยกว่า{' '}
            <Text style={styles.kcalHighlight}>{kcalNum}</Text>
            {' '}ต่อวัน
          </Text>
          <Text style={styles.confirmSub}>
            ควรออกกำลังกายพ่วงด้วย{'\n'}
            เพื่อช่วยเผาผลาญแคลอรี่{'\n'}
            และสะสมมวลกล้ามเนื้อ
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.btnYes} onPress={handleConfirm}>
            <Text style={styles.btnYesText}>โอเค</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnNo} onPress={() => router.replace('/(tabs)/onboarding/index' as any,)}>
            <Text style={styles.btnNoText}>ยกเลิก</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} onPress={handleConfirm}>
            <Text style={styles.btnOutlineText}>พร้อมแล้ว</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff5f7' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24, alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600', color: '#c23b6a', textAlign: 'center', lineHeight: 24 },
  confirmBox: {
    backgroundColor: '#fff', borderRadius: 20, borderWidth: 1.5,
    borderColor: '#f9c4d0', padding: 24, width: '100%',
    alignItems: 'center', marginTop: 24,
  },
  confirmTitle: { fontSize: 15, color: '#c23b6a', textAlign: 'center', lineHeight: 24, fontWeight: '500' },
  kcalHighlight: { fontSize: 20, color: '#e75480', fontWeight: '700' },
  confirmSub: { fontSize: 13, color: '#888', textAlign: 'center', marginTop: 12, lineHeight: 22 },
  actionRow: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 20 },
  btnYes: {
    flex: 1, backgroundColor: '#4caf50', borderRadius: 20,
    paddingVertical: 12, alignItems: 'center',
  },
  btnYesText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnNo: {
    flex: 1, backgroundColor: '#f44336', borderRadius: 20,
    paddingVertical: 12, alignItems: 'center',
  },
  btnNoText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnRow: { flexDirection: 'row', gap: 12, width: '100%', alignItems: 'center', marginTop: 12 },
  backBtn: { padding: 10 },
  backText: { fontSize: 22, color: '#e07090' },
  btnOutline: {
    flex: 1, backgroundColor: '#fff', borderWidth: 1.5,
    borderColor: '#f9c4d0', borderRadius: 24,
    paddingVertical: 13, alignItems: 'center',
  },
  btnOutlineText: { color: '#e75480', fontSize: 15, fontWeight: '600' },
});