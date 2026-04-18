import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system'; // Import FileSystem
import { supabase } from './component/common/supabase'; // Assuming you have supabase client configured

export default function FoodCameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // State สำหรับสถานะการวิเคราะห์
  const [analysisResult, setAnalysisResult] = useState<string | null>(null); // State สำหรับผลลัพธ์
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null); // State สำหรับมื้ออาหาร
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const mealOptions = ['เช้า', 'เที่ยง', 'เย็น', 'ว่าง'];

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>เราต้องการการอนุญาตเพื่อเปิดกล้องจ้า</Text>
        <TouchableOpacity style={styles.btnPermission} onPress={requestPermission}>
          <Text style={styles.btnText}>อนุญาตเลย</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  const analyzeImageWithAI = async () => {
    if (!photo) return;
    
    if (!selectedMeal) {
      Alert.alert('กรุณาเลือกมื้ออาหาร', 'รบกวนเลือกมื้ออาหารก่อนเริ่มวิเคราะห์นะคะ');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // 1. อัปโหลดรูปภาพไปยัง Supabase Storage ก่อน
      const fileName = `${Date.now()}_food.jpg`;
      const filePath = `uploads/${fileName}`;

      // แปลง URI เป็น Blob
      const response = await fetch(photo);
      const blob = await response.blob();

      const { data: storageData, error: storageError } = await supabase.storage
        .from('food-images') // ตรวจสอบว่าคุณสร้าง Bucket ชื่อ 'food-images' ใน Supabase แล้ว
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (storageError) throw storageError;

      // 2. อ่านไฟล์เป็น Base64 เพื่อส่งให้ AI (หรือส่งแค่ Path ไปถ้า Edge Function ดึงเองได้)
      const base64Image = await FileSystem.readAsStringAsync(photo, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 3. ส่งข้อมูลไปยัง AI โดยพ่วง Path ของรูปภาพใน Storage ไปด้วย
      const { data, error } = await supabase.functions.invoke<{ result: string }>('analyze-food-image', {
        body: { 
          image: base64Image, 
          meal: selectedMeal as string,
          storagePath: storageData.path // ส่ง Path เผื่อไว้ใช้บันทึกลงฐานข้อมูล
        },
      });

      if (error) {
        console.error('Supabase Function Error:', error);
        Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถวิเคราะห์รูปภาพได้: ' + error.message);
      } else {
        // 3. แสดงผลลัพธ์ที่ได้จาก AI
        setAnalysisResult(data?.result || 'ไม่พบข้อมูลการวิเคราะห์');
        Alert.alert('ผลการวิเคราะห์', data?.result || 'ไม่พบข้อมูลการวิเคราะห์');
        // TODO: นำผลลัพธ์ไปแสดงในหน้า food-detail หรือบันทึกลง diary
      }
    } catch (e) {
      console.error('Error analyzing image:', e);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถวิเคราะห์รูปภาพได้');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
    setSelectedMeal(null);
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        
        {/* ส่วนเลือกมื้ออาหาร */}
        <View style={styles.mealSelectorContainer}>
          <Text style={styles.mealSelectorTitle}>มื้อนี้คือมื้อไหนคะ?</Text>
          <View style={styles.mealRow}>
            {mealOptions.map((meal) => (
              <TouchableOpacity
                key={meal}
                style={[styles.mealChip, selectedMeal === meal && styles.mealChipActive]}
                onPress={() => setSelectedMeal(meal)}
              >
                <Text style={[styles.mealChipText, selectedMeal === meal && styles.mealChipTextActive]}>{meal}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.previewButtons}>
          <TouchableOpacity style={styles.btnAction} onPress={resetPhoto}>
            <Ionicons name="refresh-circle" size={30} color="#fff" />
            <Text style={styles.btnLabel}>ถ่ายใหม่</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.btnAction, styles.btnConfirm]} 
            onPress={analyzeImageWithAI}
            disabled={isAnalyzing} // ปิดปุ่มระหว่างวิเคราะห์
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons name="analytics" size={30} color="#fff" />
            )}
            <Text style={styles.btnLabel}>วิเคราะห์อาหาร</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="close" size={35} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.guideBox} />
          
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  message: { textAlign: 'center', color: '#fff', marginBottom: 20, marginTop: 100 },
  btnPermission: { backgroundColor: '#f472a0', padding: 15, borderRadius: 20, alignSelf: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between', padding: 20 },
  backBtn: { alignSelf: 'flex-start', marginTop: 20 },
  guideBox: { width: 280, height: 280, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', borderRadius: 20, alignSelf: 'center', borderStyle: 'dashed' },
  bottomControls: { alignItems: 'center' },
  captureBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#fff' },
  preview: { flex: 1, width: '100%', height: '100%' },
  previewButtons: { position: 'absolute', bottom: 40, flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
  btnAction: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 15, borderRadius: 20, minWidth: 120 },
  btnConfirm: { backgroundColor: '#f472a0' },
  btnLabel: { color: '#fff', marginTop: 5, fontSize: 12, fontWeight: 'bold' },
  mealSelectorContainer: {
    position: 'absolute',
    bottom: 140,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  mealSelectorTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 15, textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
  mealRow: { flexDirection: 'row', gap: 10 },
  mealChip: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: '#fff' },
  mealChipActive: { backgroundColor: '#f472a0', borderColor: '#f472a0' },
  mealChipText: { color: '#fff', fontWeight: '600' },
  mealChipTextActive: { color: '#fff' },
});