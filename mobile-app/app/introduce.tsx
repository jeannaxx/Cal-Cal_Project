import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Introduce() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Lesgo.png')} // เปลี่ยน path รูปให้ตรง
        style={styles.image}
      />
      <Text style={styles.title}>Cal-Cal</Text>
      <Text style={styles.subtitle}>สวัสดีจ้า คนเก่ง!!!</Text>
      <Text style={styles.desc}>
        แอพเพื่อสุขภาพและการโภชนาที่ช่วยคนไทย{'\n'}
        ทำตามเป้าหมายการลดน้ำหนักกัน 
      </Text>

      <TouchableOpacity
        style={styles.button}
       onPress={() => router.push('/(auth)/login' as any)}  // ไป login
      >
        <Text style={styles.buttonText}>ไปลุยกันเลย!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 8,
  },
  desc: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 40,
  },
  buttonText: {
    color: '#FF6B9D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});