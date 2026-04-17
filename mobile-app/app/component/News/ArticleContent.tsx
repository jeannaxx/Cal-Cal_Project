import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
  content: string;
  coverImage: string;
}

export const ArticleContent: React.FC<Props> = ({ content, coverImage }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: coverImage }} 
        style={styles.coverImage} 
        resizeMode="cover" 
      />
      <Text style={styles.contentText}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  coverImage: { width: '100%', height: 220, borderRadius: 20, marginBottom: 20 },
  contentText: { fontSize: 16, color: '#555', lineHeight: 26, textAlign: 'left' },
});