import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => (
  <View style={styles.container}>
    <Image 
      source={require('../../../assets/Qusetion.png')} 
      style={styles.image} 
    />
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 60, 
    paddingHorizontal: 40 
  },
  image: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 20, opacity: 0.8 },
  message: { fontSize: 16, color: '#f9a8c0', textAlign: 'center', fontWeight: '600', lineHeight: 24 }
});