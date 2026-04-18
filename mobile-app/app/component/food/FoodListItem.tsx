import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FoodListItemProps {
  item: {
    id: any;
    name: string;
    calories: number;
    image_url?: string;
  };
  onPress: () => void;
  onDelete?: (id: any) => void;
  onEdit?: (item: any) => void;
}

export const FoodListItem = ({ item, onPress, onDelete, onEdit }: FoodListItemProps) => (
  <View style={styles.itemWrapper}>
    <TouchableOpacity style={styles.foodItem} onPress={onPress}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.foodImg} />
      ) : (
        <View style={styles.foodImgPlaceholder} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodSub}>10% ของแคลอรี่ที่ควรบริโภคต่อวัน</Text>
      </View>
      <Text style={styles.foodCal}>{item.calories} <Text style={{ fontSize: 10 }}>kcal</Text></Text>
    </TouchableOpacity>
    {onEdit && (
      <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(item)}>
        <Ionicons name="create-outline" size={20} color="#f472a0" />
      </TouchableOpacity>
    )}
    {onDelete && (
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={20} color="#FF4D4D" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9"
  },
  foodItem: { 
    flex: 1,
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15, 
  },
  foodImgPlaceholder: { width: 50, height: 50, backgroundColor: "#eee", borderRadius: 25, marginRight: 15 },
  foodImg: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  foodName: { fontSize: 16, fontWeight: "bold" },
  foodSub: { fontSize: 10, color: "#999" },
  foodCal: { fontSize: 18, fontWeight: "bold", color: "#f472a0" },
  deleteBtn: { padding: 10, paddingRight: 15, justifyContent: 'center' },
  editBtn: { padding: 10, justifyContent: 'center' }
});