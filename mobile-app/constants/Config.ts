import { Platform } from 'react-native';

// ตรวจสอบเลข IP จาก Terminal (ipconfig getifaddr en0) ทุกครั้งที่เปลี่ยนวง Wi-Fi
// มั่นใจว่าเลขนี้ตรงกับที่ Backend Log แจ้งออกมาล่าสุด

// วิธีเลือก IP อัตโนมัติ:
// 1. ถ้าใช้ Android Emulator ให้ใช้ 10.0.2.2
// 2. ถ้าใช้ iOS หรือเครื่องจริง ให้ใช้ IP เครื่องคอมพิวเตอร์ของคุณ
// const DEV_IP = '192.168.1.34'; 
// const BASE_IP = Platform.OS === 'android' && __DEV__ ? '10.0.2.2' : DEV_IP;
// const PORT = '3000';
// export const API_URL = `http://${BASE_IP}:${PORT}/api`;

/**
 * ใช้ ngrok URL แทนในช่วงสุดท้ายเพื่อให้ข้ามปัญหา Network
 * อย่าลืมเติม /api ต่อท้าย URL ที่ได้จาก ngrok
 */
export const API_URL = 'https://proactive-semicolon-fedora.ngrok-free.dev/api';