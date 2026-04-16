import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../component/home/Header';
import { Ionicons } from '@expo/vector-icons';
import { Sidebar } from '../component/home/Sidebar';

export default function ConsultantScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#f472a0' }}>
        <Header onOpenMenu={() => setSidebarVisible(true)} />
      </SafeAreaView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.aiMessage}>
            <View style={styles.aiAvatar}>
              <Ionicons name="sparkles" size={16} color="#fff" />
            </View>
            <View style={styles.aiBubble}>
              <Text style={styles.aiText}>
                สวัสดีค่ะ! ฉันคือ AI ที่ปรึกษาจาก CAL-CAL วันนี้มีคำถามเกี่ยวกับสุขภาพหรือการคุมอาหารไหมคะ?
              </Text>
            </View>
          </View>

          <View style={styles.userMessage}>
            <View style={styles.userBubble}>
              <Text style={styles.userText}>แนะนำเมนูอาหารเย็นลดน้ำหนักหน่อยครับ</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="พิมพ์ข้อความ..." 
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={[styles.sendBtn, { opacity: message.length > 0 ? 1 : 0.6 }]}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  chatContent: { padding: 20 },
  aiMessage: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-end' },
  aiAvatar: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    backgroundColor: '#f472a0', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 8
  },
  aiBubble: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    borderBottomLeftRadius: 2,
    maxWidth: '80%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  aiText: { color: '#333', lineHeight: 20 },
  userMessage: { alignSelf: 'flex-end', marginBottom: 20, maxWidth: '80%' },
  userBubble: {
    backgroundColor: '#f472a0',
    padding: 15,
    borderRadius: 18,
    borderBottomRightRadius: 2,
  },
  userText: { color: '#fff', lineHeight: 20 },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    borderRadius: 25,
    paddingHorizontal: 18,
    height: 45,
    marginRight: 10,
    fontSize: 16,
  },
  sendBtn: {
    backgroundColor: '#f472a0',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});