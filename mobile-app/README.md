ButtonsInput : หน้าสมัครทั้งหมด เเละหน้าล็อกอิน
TextFilds : หน้าช่องใส่ email,password,nameuser
Selection : กล่องเลือกความเร็วในการลดน้ำหนัก
_____________________________________
✭ (auth) การใส่โฟลเดอร์เเบมีวงเล็บ เรียกว่า Route Group
หน้าที่ : เเต่ละชิ้น มาGroup กัน เเล้วเอาชื่อโฟลเดอร์ไปปรากฏเเทน  
เช่น มีไฟล์app/(auth)/login.tsx 
เวลาเข้าใช้งาน URL จะเป็น /login ไม่ใช่ /(auth)/login
ประโยชน์คือ เเยกหน้าอย่างชัดเจน ไม่กระทบกัน
_____________________________________
✭ เครื่องมือพื้นฐาน” ของ React Native
เเสดงUI,จัดlayout,จัดการkeybord,รับการกด,เเสดงpopup
KeyboardAvoidingView : ช่วยดันUI ขึ้นเวลา keyboard โผล่ (ไม่ให้บังinput)
Platform : ให้เช๊คว่าเป็น ios/Android เช่น
Platform.OS === 'ios'
Alert : เเสดง popup เเจ้งเตือน เช่น กล่อง OK/Cancel
TouchableWithoutFeedback : ทำให้ component กดได้ (tap ได้) แต่ “ไม่มีเอฟเฟกต์” ตอนกด
Keyboard : ใช้ควบคุม keyboard เช่น ปิด keyboard
เช่น Keyboard.dismiss()
______________________________________
👉import { useRouter } from 'expo-router';
: import hook ใช้สำหรับเปลี่ยนหน้า (navigate) ในเเอป /ไปหน้าอื่น ย้อนกลับ replce
Ex.
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <Button
      title="ไปหน้า Profile"
      onPress={() => router.push('/profile')}
    />
  );
}
router.push('/page') : ไปหน้าใหม่
router.replace('/page') : เปลี่ยนหน้าเเทนหน้าเดิม
router.replace('/page') : ย้อนกลับ 
_____________________________________
👉👉👉//State 
const [isLoading,setLoading] = useState(false);
useState = ตัวเก็บค่า (state ) ในcomponent  
👉 const [ตัวแปร, ฟังก์ชันเปลี่ยนค่า] = useState(ค่าเริ่มต้น);
👉 อธิบาย const [isLoading, setLoading] = useState(false);
isLoading : เก็บสถานะ กำลังโหลดอยุ่ไหม
✭  ค่าเริ่มต้น : false (ยังไม่โหลด)
setLoading(true) = เริ่มโหลด
setLoading(false ) = โหลดเสร็จ
👉const [email, setEmail] = useState('');/password
email :เก็บสถานะ เ้บค่าอีเมล์ ที่ผู้ใช้พิม
✭  ค่าเริ่มต้น  '' (null) รอผุ้ใช้พิมพ์เข้ามา  email is str
setEmail('adlg,@gmail.com') : เปลี่ยนค่า
_____________________________________
👉👉👉 การสร้างฟังก์ชั่น handlelogin ใช้ทำงานตอนผู้ใช้กดปุ่ม

const handleLogin = () => {
  setIsLoading(true);
};
✭ setIsLoading(true); :เปลี่ยนค่า isLoadingเป็นtrue คือ กำลังโหลดอยู่
✭ ใช้ตอน พอกดปุ่ม -> ฟังชันนี้จะทำงาน เช่น
Ex: <Button title="Login" onPress={handleLogin} />
👉 การทำงาน
1.กดปุ่ม Login
2.handleLogin() ทำงาน
3.isLoading = true
4.UI อาจแสดง loading (spinner)
👉 Ex: การต่อยอด 
const handleLogin = () => {
  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
};
✭ โหลด2 วิเเล้วหยุด
✭handleLogin = ฟังก์ชันตอนกด login
✭setIsLoading(true) = บอกแอปว่า “กำลังโหลดอยู่”
👉 👉code มาจาก ฟังก์ชั่น javascit พื้นฐาน  
✭ const handleLogin = () => { ... } : คือ arrow function ของ JavaScript
✭ setTimeout : คือ JavaScript เอาไว้ “หน่วงเวลา”
setTimeout(() => {
  setIsLoading(false);
}, 2000);
✭useState (React) : มาจาก React (useState) ใช้เปลี่ยนค่าstate
setIsLoading(true); 
🔄 รวมความหมายทั้งหมด
1.กด Login
2.ตั้งค่า isLoading = true (เริ่มโหลด)
3.รอ 2 วินาที (setTimeout)
4.ตั้งค่า isLoading = false (หยุดโหลด)
_____________________________________
👉👉👉const { width, height } = Dimensions.get('window');
การดึงหน้าจอมือ ออกมาใช้ width,height
👉  เเยกที่ละส่วน  
✭Dimensions เป็นของ React Native ดูขนาดหน้าจอ
✭.get('window') : เอาขนาดจอเเอพ 
_____________________________________
👉👉👉 resizeMode : prop ของ <Image> ใน React Native
ใช้กำหนดวิธีปรับขนาดรูปเมื่อใส่ใน <Image>
👉 resizeMode="contain" : contain ขนาดรุปพอดีกับcontainer,ไม่ถุกตัด,สัดส่วนไม่เปลี่ยน