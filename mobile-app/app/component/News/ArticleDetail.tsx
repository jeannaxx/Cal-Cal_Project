import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ArticleHeader } from './ArticleHeader';
import { ArticleContent } from './ArticleContent';
import { supabase } from '../../component/common/supabase'; // ตรวจสอบ path ให้ถูกต้อง
import { RelatedArticles } from './RelatedArticles';
import { Article } from '../../types/article';

const mockArticle: Article = {
  title: "วิธีการเขียนโค้ดให้สะอาด (Clean Code) สำหรับมือใหม่",
  publishDate: "15 พฤษภาคม 2024",
  coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  content: "การเขียนโค้ดให้ทำงานได้นั้นเป็นเรื่องพื้นฐาน แต่การเขียนโค้ดให้อ่านง่ายและบำรุงรักษาง่ายนั้นเป็นทักษะที่สำคัญกว่า...",
  author: {
    name: "สมชาย สายโค้ด",
    avatar: "https://i.pravatar.cc/150?u=somchai",
    role: "Senior Developer"
  },
  tags: ["Programming", "Clean Code", "Web Development"]
};

export const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const [relatedArticles, setRelatedArticles] = useState<Partial<Article>[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      setLoadingRelated(true);
      try {
        // ในที่นี้จะดึงบทความ 3 ชิ้นที่ไม่ใช่บทความปัจจุบัน (mockArticle.title)
        // ในสถานการณ์จริง คุณอาจจะใช้ tags หรือ category ในการค้นหาบทความที่เกี่ยวข้อง
        const { data, error } = await supabase
          .from('articles') // สมมติว่าชื่อตารางบทความคือ 'articles'
          .select('id, title, publishDate, coverImage') // เลือกเฉพาะคอลัมน์ที่ต้องการ
          .neq('title', mockArticle.title) // ไม่เอาบทความปัจจุบัน
          .limit(3); // จำกัดจำนวนบทความที่เกี่ยวข้อง

        if (error) {
          console.error('Error fetching related articles:', error);
        } else {
          // แปลงข้อมูลที่ได้จาก Supabase ให้เข้ากับ Partial<Article>
          const formattedData = data.map((item: any) => ({
            title: item.title,
            publishDate: item.publishDate, // ตรวจสอบว่า format ตรงกัน
            coverImage: item.coverImage,
          }));
          setRelatedArticles(formattedData);
        }
      } catch (error) {
        console.error('Unexpected error fetching related articles:', error);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedArticles();
  }, []); // [] เพื่อให้รันแค่ครั้งเดียวตอน component mount

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#f472a0" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>บทความสุขภาพ</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
            <ArticleHeader
              title={mockArticle.title} 
              author={mockArticle.author} 
              date={mockArticle.publishDate} 
            />
            <ArticleContent 
              content={mockArticle.content} 
              coverImage={mockArticle.coverImage} 
            />
            
            <View style={styles.tagSection}>
              {mockArticle.tags.map(tag => (
                <View key={tag} style={styles.tagBadge}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
        </View>

        {loadingRelated ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#f472a0" />
            <Text style={styles.loaderText}>กำลังโหลดบทความที่เกี่ยวข้อง...</Text>
          </View>
        ) : relatedArticles.length > 0 ? (
          <RelatedArticles articles={relatedArticles} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  navTitle: { fontSize: 18, fontWeight: '700', color: '#c23b6a' },
  contentPadding: { padding: 20 },
  tagSection: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  tagBadge: { backgroundColor: '#FFF0F3', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { color: '#f472a0', fontSize: 13, fontWeight: '500' },
  loaderContainer: { paddingVertical: 30, alignItems: 'center', justifyContent: 'center' },
  loaderText: { marginTop: 10, fontSize: 12, color: '#f9a8c0' },
});