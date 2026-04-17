import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Author } from '../../types/article';

interface Props {
  title: string;
  author: Author;
  date: string;
}

export const ArticleHeader: React.FC<Props> = ({ title, author, date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.authorRow}>
        <Image source={{ uri: author.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.authorName}>{author.name}</Text>
          <Text style={styles.metaText}>{date} • {author.role}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#c23b6a', 
    marginBottom: 15, 
    lineHeight: 34 
  },
  authorRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  authorName: { fontSize: 16, fontWeight: '600', color: '#444' },
  metaText: { fontSize: 13, color: '#888', marginTop: 2 },
});