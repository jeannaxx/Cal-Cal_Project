import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Article } from '../../types/article';

interface Props {
  articles: Partial<Article>[];
}

export const RelatedArticles: React.FC<Props> = ({ articles }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>บทความที่เกี่ยวข้อง</Text>
      <FlatList
        data={articles}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.coverImage }} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.date}>{item.publishDate}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 30, paddingBottom: 20 },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#c23b6a', 
    marginBottom: 15, 
    paddingHorizontal: 20 
  },
  listContent: { paddingHorizontal: 15 },
  card: { 
    width: 200, 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    marginRight: 15, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    overflow: 'hidden' 
  },
  image: { width: '100%', height: 110 },
  info: { padding: 10 },
  title: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 5 },
  date: { fontSize: 11, color: '#999' },
});