import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onClose: () => void;
}

export default function CustomAlert({ 
  visible, 
  title, 
  message, 
  icon = 'information-circle', 
  onClose 
}: CustomAlertProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertBox}>
          <Ionicons name={icon} size={60} color="#FF4D6D" style={{ marginBottom: 12 }} />
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>
          <TouchableOpacity style={styles.alertButton} onPress={onClose}>
            <Text style={styles.alertButtonText}>ตกลง</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  alertBox: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  alertTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: '#FF4D6D', 
    marginBottom: 12,
    textAlign: 'center' 
  },
  alertMessage: { 
    fontSize: 16, 
    color: '#590D22', 
    textAlign: 'center', 
    marginBottom: 24, 
    lineHeight: 22 
  },
  alertButton: {
    backgroundColor: '#FF4D6D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  alertButtonText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});