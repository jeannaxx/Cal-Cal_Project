import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// กำหนดโครงสร้างข้อมูลบทความ
export interface Article {
  id: string;
  title: string;
  image: string;
  source: string;
  logo: string;
}

interface ArticleCardProps {
  item: Article;
  onPress?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => onPress?.(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.sourceGroup}>
            <Image source={{ uri: item.logo }} style={styles.sourceLogo} />
            <Text style={styles.sourceName}>{item.source}</Text>
          </View>
          
          <View style={styles.creditBadge}>
            <Text style={styles.creditText}>เครดิตจาก : {item.source}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    lineHeight: 22,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  sourceName: {
    fontSize: 12,
    color: '#777',
  },
  creditBadge: {
    backgroundColor: '#FCE4EC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  creditText: {
    fontSize: 10,
    color: '#C2185B',
    fontWeight: 'bold',
  },
});

export default ArticleCard;