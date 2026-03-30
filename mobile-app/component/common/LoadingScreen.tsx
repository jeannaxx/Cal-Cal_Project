//เก็บหน้าดาวโหลด มีภาพการ์ตูนผญ ตัวดาวโหลด+กรุณารอสักครู่+ปุ่มหมุนๆๆ
import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

//ดึงขนาดหน้จอให้ทับพอดี ในตอนดาวโหลด
const {width,height} = Dimensions.get('window');

export default function LoadingScreen(){
    return(
        <View style={styles.overlay}>
            <Image
            source={require('../../assets/images/Loading.png')}
            style={styles.image}
            />

        </View>
    )
};
const styles= StyleSheet.create({
        overlay:{},
        image:{}

});

