import { View, StyleSheet } from "react-native";

interface StepDotsProps {
  currentStep: number;
  totalSteps?: number;
}

export const StepDots = ({ currentStep, totalSteps = 4 }: StepDotsProps) => (
  <View style={styles.container}>
    {[...Array(totalSteps)].map((_, i) => (
      <View key={i} style={[styles.dot, i === currentStep ? styles.active : styles.inactive]} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 5 },
  active: { backgroundColor: '#c23b6a' },
  inactive: { backgroundColor: '#f9c4d0' },
});