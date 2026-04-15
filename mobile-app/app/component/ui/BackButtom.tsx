import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
      <Text style={styles.text}>←</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: { padding: 10 },
  text: { fontSize: 24, color: '#f472a0', fontWeight: 'bold' }
});