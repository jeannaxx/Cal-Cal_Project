import React,{useState} from "react";
import { View,StyleSheet,Text,ScrollView,KeyboardAvoidingView,Platform,TouchableWithoutFeedback } from "react-native";
import { useRouter } from 'expo-router';
//อันที่สร้างไว้
// import TextFields from '../../component/TextFields';
// import ButtonsInput from '../../component/ButtonsInput';
import LoadingScreen from '../../component/common/LoadingScreen';



export default function LoginScreen(){
    const router = useRouter();

    //2.state ข้อมุล,กรอก
    //State loading
    const [isLoading,setIsLoading] = useState(false);
    //State Email
    const[email,setEmail] = useState('');
    //State Pasword
    const[password,setPassword] = useState('');

    //3.fucntiion การกดปุ่ม เข้าสุ่่ระบบ
    const handleLogin = () =>{
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        },3000);
    };
    return(
        <View style={styles.container}>
            {isLoading && <LoadingScreen/>}
            {/* ส่วนหัว: อาจจะใส่โลโก้หรือเว้นที่ว่าง */}
            <ScrollView style={styles.header}>
                
            </ScrollView>


        </View>
    );

};
const styles = StyleSheet.create({
    container:{},
    header:{}

})