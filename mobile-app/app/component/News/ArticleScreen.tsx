import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import ArticleCard, { Article } from '../../component/News/ArticleCard';
import axios from 'axios';

const ArticleScreen: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // ฟังก์ชันดึงข้อมูล
  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(false);
      // เปลี่ยน localhost เป็น IP เครื่องคอมพิวเตอร์ของคุณ เช่น http://192.168.1.35:3000
      const response = await axios.get('http://localhost:3000/api/articles');
      setArticles(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleArticlePress = (id: string) => {
    console.log('Pressed Article ID:', id);
  };

  // 1. หน้าจอตอนกำลังโหลด
  if (loading && articles.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#D81B60" />
      </View>
    );
  }

  // 2. หน้าจอตอนเกิดข้อผิดพลาด (เช่น เชื่อมต่อหลังบ้านไม่ได้)
  if (error && articles.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>ไม่สามารถดึงข้อมูลได้</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchArticles}>
          <Text style={styles.retryText}>ลองใหม่อีกครั้ง</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ArticleCard item={item} onPress={handleArticlePress} />
        )}
        contentContainerStyle={styles.listContent}
        // ส่วนหัวของรายการบทความ
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>บทความที่น่าสนใจ</Text>
          </View>
        )}
        // ระบบดึงลงเพื่อ Refresh ข้อมูล
        onRefresh={fetchArticles}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0F3', // สีชมพูอ่อนตามดีไซน์
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30, // เผื่อระยะให้แถบ Bottom Navigation
  },
  headerContainer: {
    paddingVertical: 24,
    paddingTop: 40, // ชดเชยระยะที่ไม่มี SafeAreaView
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#D81B60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default ArticleScreen;