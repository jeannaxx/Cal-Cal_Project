import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import CustomAlert from '../app/component/ui/CustomAlert';
import { API_URL } from '../constants/Config';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function AddMealScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // Form State
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [categoryId, setCategoryId] = useState('');

  const [alertConfig, setAlertConfig] = useState({
    visible: false, title: '', message: '', icon: 'information-circle' as any
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // ดึงข้อมูลประเภทอาหารใช้แค่ 5 วิพอ

      const res = await fetch(`${API_URL}/food-categories`, { signal: controller.signal });
      clearTimeout(timeoutId);
      const data = await res.json();
      if (data.length > 0) {
        setCategories(data);
        setCategoryId(data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showAlert = (title: string, message: string, icon: any = 'information-circle') => {
    setAlertConfig({ visible: true, title, message, icon });
  };

  const handleSubmit = async () => {
    if (!name || !calories) {
      showAlert('ข้อมูลไม่ครบ', 'กรุณาระบุชื่ออาหารและแคลอรี่ด้วยนะจ๊ะ', 'warning');
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const payload = {
        name,
        calories: parseInt(calories),
        protein: parseFloat(protein) || 0,
        carbs: parseFloat(carbs) || 0,
        fat: parseFloat(fat) || 0,
        meal_type: mealType,
        food_category_id: categoryId,
        log_date: new Date().toISOString().split('T')[0]
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_URL}/meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        router.back();
      } else {
        throw new Error('บันทึกไม่สำเร็จ');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        showAlert('เกิดข้อผิดพลาด', 'การเชื่อมต่อใช้เวลานานเกินไป (Timeout) กรุณาลองใหม่อีกครั้ง', 'alert-circle');
      } else {
        showAlert('เกิดข้อผิดพลาด', error.message, 'alert-circle');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#FF4D6D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>เพิ่มมื้ออาหาร</Text>
        <TouchableOpacity onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#FF4D6D" /> : <Text style={styles.saveText}>บันทึก</Text>}
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.label}>ชื่ออาหาร</Text>
          <TextInput
            style={styles.input}
            placeholder="เช่น ข้าวมันไก่"
            value={name}
            onChangeText={setName}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>แคลอรี่ (kcal)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>ประเภทมื้อ</Text>
              <View style={styles.typeContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {MEAL_TYPES.map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[styles.typeBtn, mealType === type && styles.typeBtnActive]}
                      onPress={() => setMealType(type)}
                    >
                      <Text style={[styles.typeBtnText, mealType === type && styles.typeBtnTextActive]}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>

          <Text style={styles.label}>หมวดหมู่</Text>
          <View style={styles.categoryRow}>
            {categories.map((cat: any) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catBtn, categoryId === cat.id && styles.catBtnActive]}
                onPress={() => setCategoryId(cat.id)}
              >
                <Text style={styles.catIcon}>{cat.icon || '🍴'}</Text>
                <Text style={[styles.catText, categoryId === cat.id && styles.catTextActive]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>สารอาหาร (กรัม)</Text>
          <View style={styles.row}>
            <NutrientInput label="Protein" value={protein} onChange={setProtein} />
            <NutrientInput label="Carbs" value={carbs} onChange={setCarbs} />
            <NutrientInput label="Fat" value={fat} onChange={setFat} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        icon={alertConfig.icon}
        onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
      />
    </SafeAreaView>
  );
}

const NutrientInput = ({ label, value, onChange }: any) => (
  <View style={{ flex: 1, marginHorizontal: 5 }}>
    <Text style={styles.labelSmall}>{label}</Text>
    <TextInput
      style={[styles.input, { textAlign: 'center' }]}
      placeholder="0"
      keyboardType="numeric"
      value={value}
      onChange={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F3' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#590D22' },
  saveText: { fontSize: 16, fontWeight: '700', color: '#FF4D6D' },
  content: { padding: 25 },
  label: { fontSize: 14, fontWeight: '700', color: '#FF4D6D', marginBottom: 8, marginTop: 15 },
  labelSmall: { fontSize: 12, color: '#999', marginBottom: 5, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#590D22', marginTop: 30, marginBottom: 10 },
  input: { backgroundColor: '#fff', borderRadius: 15, padding: 15, fontSize: 16, color: '#590D22', elevation: 1 },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  typeContainer: { height: 50 },
  typeBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 8, borderWidth: 1, borderColor: '#FFB7C5' },
  typeBtnActive: { backgroundColor: '#FF4D6D', borderColor: '#FF4D6D' },
  typeBtnText: { color: '#FF758F', fontWeight: '600' },
  typeBtnTextActive: { color: '#fff' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  catBtn: { width: '30%', backgroundColor: '#fff', padding: 10, borderRadius: 15, alignItems: 'center', marginBottom: 10, marginRight: '3%', borderWidth: 1, borderColor: 'transparent' },
  catBtnActive: { borderColor: '#FF4D6D', backgroundColor: '#FFF0F3' },
  catIcon: { fontSize: 24, marginBottom: 5 },
  catText: { fontSize: 11, color: '#999', fontWeight: '600' },
  catTextActive: { color: '#FF4D6D' }
});