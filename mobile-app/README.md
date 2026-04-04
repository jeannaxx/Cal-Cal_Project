ButtonsInput : หน้าสมัครทั้งหมด เเละหน้าล็อกอิน
TextFilds : หน้าช่องใส่ email,password,nameuser
Selection : กล่องเลือกความเร็วในการลดน้ำหนัก
___________________________________________________________
📁 (auth) การใส่โฟลเดอร์เเบมีวงเล็บ เรียกว่า Route Group
หน้าที่ : เเต่ละชิ้น มาGroup กัน เเล้วเอาชื่อโฟลเดอร์ไปปรากฏเเทน  
เช่น มีไฟล์app/(auth)/login.tsx 
เวลาเข้าใช้งาน URL จะเป็น /login ไม่ใช่ /(auth)/login
ประโยชน์คือ เเยกหน้าอย่างชัดเจน ไม่กระทบกัน
___________________________________________________________
📁เครื่องมือพื้นฐาน” ของ React Native
เเสดงUI,จัดlayout,จัดการkeybord,รับการกด,เเสดงpopup
KeyboardAvoidingView : ช่วยดันUI ขึ้นเวลา keyboard โผล่ (ไม่ให้บังinput)
Platform : ให้เช๊คว่าเป็น ios/Android เช่น
Platform.OS === 'ios'
Alert : เเสดง popup เเจ้งเตือน เช่น กล่อง OK/Cancel
TouchableWithoutFeedback : ทำให้ component กดได้ (tap ได้) แต่ “ไม่มีเอฟเฟกต์” ตอนกด
Keyboard : ใช้ควบคุม keyboard เช่น ปิด keyboard
เช่น Keyboard.dismiss()
___________________________________________________________
📁import { useRouter } from 'expo-router';
- import hook ใช้สำหรับเปลี่ยนหน้า (navigate) ในเเอป /ไปหน้าอื่น ย้อนกลับ replce
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
___________________________________________________________
📁//State 
const [isLoading,setLoading] = useState(false);
📁useState = ตัวเก็บค่า (state ) ในcomponent  
📃const [ตัวแปร, ฟังก์ชันเปลี่ยนค่า] = useState(ค่าเริ่มต้น);
📃 อธิบาย const [isLoading, setLoading] = useState(false);
isLoading : เก็บสถานะ กำลังโหลดอยุ่ไหม
-  ค่าเริ่มต้น : false (ยังไม่โหลด)
setLoading(true) = เริ่มโหลด
setLoading(false ) = โหลดเสร็จ
📃const [email, setEmail] = useState(''); /password
email :เก็บสถานะ เก็บค่าอีเมล์ ที่ผู้ใช้พิม
-   ค่าเริ่มต้น  '' (null) 
: รอผู้ใช้พิมพ์เข้ามา  email is str
setEmail('adlg,@gmail.com') -> เปลี่ยนค่า
___________________________________________________________
Loading Page
📁 การสร้างฟังก์ชั่น handlelogin ใช้ทำงานตอนผู้ใช้กดปุ่ม
const handleLogin = () => {
  setIsLoading(true);
};
-  setIsLoading(true); :เปลี่ยนค่า isLoadingเป็นtrue คือ กำลังโหลดอยู่
-  ใช้ตอน พอกดปุ่ม -> ฟังชันนี้จะทำงาน เช่น
Ex: <Button title="Login" onPress={handleLogin} />
📄  การทำงาน
1.กดปุ่ม Login
2.handleLogin() ทำงาน
3.isLoading = true
4.UI อาจแสดง loading (spinner)
📄  Ex: การต่อยอด 
const handleLogin = () => {
  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
};
- โหลด2 วิเเล้วหยุด
- handleLogin = ฟังก์ชันตอนกด login
- setIsLoading(true) = บอกแอปว่า “กำลังโหลดอยู่”
📁 code มาจาก ฟังก์ชั่น javascit พื้นฐาน  
-  const handleLogin = () => { ... } : คือ arrow function ของ JavaScript
-  setTimeout : คือ JavaScript เอาไว้ “หน่วงเวลา”
setTimeout(() => {
  setIsLoading(false);
}, 2000);
-  useState (React) : มาจาก React (useState) ใช้เปลี่ยนค่าstate
setIsLoading(true); 
🔄 รวมความหมายทั้งหมด
1.กด Login
2.ตั้งค่า isLoading = true (เริ่มโหลด)
3.รอ 2 วินาที (setTimeout)
4.ตั้งค่า isLoading = false (หยุดโหลด)
Loading Page
___________________________________________________________

📁 onst { width, height } = Dimensions.get('window');
การดึงหน้าจอมือ ออกมาใช้ width,height
📄  เเยกที่ละส่วน  
- Dimensions เป็นของ React Native ดูขนาดหน้าจอ
- .get('window') : เอาขนาดจอเเอพ 
📁 resizeMode : prop ของ <Image> ใน React Native
ใช้กำหนดวิธีปรับขนาดรูปเมื่อใส่ใน <Image>
- resizeMode="contain" : contain ขนาดรุปพอดีกับcontainer,ไม่ถุกตัด,สัดส่วนไม่เปลี่ยน
📁 Spinner ปุ่มหมุนตอนดาวโลด
- ActivityIndicator this Basic React-Native,thia show Spinner is 
- size="large" จะมีสองเเบ small,large
___________________________________________________________
TextFiled pange
📁cการทำงาน 
1.State ต่างๆ (formData, errors, touched, isLoading)
2.validateField (ตัวเช็คทีละช่อง)
3.validateForm (ตัวเช็คทั้งฟอร์ม)
4.handleChange (ตัวเก็บค่าตอนพิมพ์)
5.handleBlur (ตัวเช็คตอนเลิกโฟกัสช่องนั้น)
6.handleSubmit (ตัวส่งข้อมูลไปเซฟsupperbase)

📁const [touch,setTouched]=useState<{[key:string]:Boolean}>({});
📁 {[key: string]: boolean} : Type เบบบIndex Signatuer  
- key: string ชื่อของProperty เป็นข้อความStr อะไรก็ได้ เช่นemail
- boolean : ค่าที่เก็บ true false /ถูกเเตะเเล้ว  จริงหรือไม่จริง 
📄 useState<...>( {})  
- <...> คือการบอก TypeScript ว่า State นี้จะมีหน้าตาแบบข้างบนนะ
- ({}) การกำหนดค่าเริ่มต้น Object ว่าง เพาระตอนเปิดหน้าเว็บมาครั้งเเรก ผู้ใช้ยังไม่ได้เเตะช่องไหนเลย
📄 ภาพรวม  
-formData เก้บข้อมุลผู้พิมพ์         { email: "test@mail.com" }
- errors เก็บข้อความค่า/เตือน      { email: "รูปแบบอีเมลไม่ถูกต้อง" }
- touched เก็บช่องว่างไหนถูกเเตะเเล้ว {email : true}
___________________________________________________________

📄(!value.trim()) 
- การตัด " ช่องว่าง " ทั้งข้างหน้าข้างหลัง 
  ถ้าvalue คือ"  hello  " จะเหลือ "hello"
  ถ้าvalue คือ  "   " (มีเเต่ช่องว่าง ) จะเหลือ "" (strว่าง)
- ! (Logical NOT)   การกลับค่า / ถ้าเป็นผิดไปเป็นถูกนั้นเอง
  ในJava strมีค่าว่าง "" ค่าเป็นfalse
  ดังนั้น !"" จึงกลายเป้นtrue
📄เงื่อนไขนี้เพื่อตรวจสอบว่า ผู้ใช้ไม่ได้พิมพ์อะไรเลย หรือ พิมพ์มาแค่เคาะสเปซบาร์ หรือไม่:
-ถ้าผลเป็นTrue แปลวว่า ว่างเปล่า
-ถ้าผลเป็นFalse แปลว่า มีการพิมพืข้อความ เขา้มาจริง
Ex...
if (!value.trim()) {
  console.log("กรุณากรอกข้อมูล ห้ามเว้นว่างไว้ครับ!");
}
📄 return undefined ; 
-โดยเฉพาะ JavaScript คือการบอกให้ฟังก์ชั่น "จบการทำงานเเละส่งค่า ความว่างเปล่า" กลับออกไป
Ex...
function getUserName(user) {
  if (!user) return undefined; // ถ้าไม่มี user ให้หยุดและส่งค่าว่างกลับไป
  return user.name;
}
📄!= / !==   ตัวดำเนินการตรวจสอบความไม่เท่ากันเเบบเข้มงอด 
!=  เเบบไม่เข้มงวด "แปลร่าง" ข้อมมูลให้เหมือนกันก่อนค่อยเทียบ /อาจจะเป็นfasleตลอดๆ
!== เเบบเข้มงวด  "ไม่แปลงร่าง" ข้อมุลชนิดไม่ตรงกัน จะไม่เท่ากันทันที จะTrue fasle ทันที
📄default:
   return undefined
- ค่าที่เราตรวจสอบ ไม่ตรงกับ case ใดๆ ก่อนหน้านี้เลย ปอกดงาน
Ex...
function getStatusColor(status) {
  switch (status) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    
    // ถ้าสถานะที่ส่งมาไม่ใช่ success หรือ error
    default:
      return undefined; // จบการทำงานทันที และบอกว่า "ไม่มีค่าสีจะให้นะ"
  }
  // โค้ดตรงนี้จะไม่มีวันทำงาน เพราะทุก case ข้างบนมี return หมดแล้ว
  console.log("Finished!"); 
}
___________________________________________________________

📄 setFormData((prev) =>({
      ...prev,
      [name]:value,
    }))
- (prev) => ({ ... }) 
- prev : ค่าของformData ณ ปัจจุบัน(ก่อนอัพเดต)
- ...prev : เหมือนคือการก็อปปี้ เหมือนข้อมูลทั้งหมดในObject ทั้งหมดมาวางไว้ก่อน
- [name]:value : []การเอาค่าที่อยุ่ในตัวแปรnameมาเป็นชื่อkey เช่น เช่น ถ้าคุณกำลังพิมพ์ในช่อง <input name="email"> ตัวแปร name ก็จะมีค่าเป็น "email"
Ex...
{ firstName: 'John', lastName: 'Doe' }
-  ...prev    : ก๊อปปี้ของเดิมมา: { firstName: 'John', lastName: 'Doe' }
- [name]: value : เขียนทับตัวที่ชื่อ lastName ด้วย 'Wick'
- ผลลัพธ์ใหม่ : { firstName: 'John', lastName: 'Wick' }

📁 สั่งให้โปรแกรมวิ่งไปตรวจการบ้านทุกช่องในฟอร์ม
(Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
1.Object.keys(formData)
 ดึงหัวข้อkeyทั้งหมดในformData ออกมาเป็นarray
 ถ้า formData คือ { userName: '...', email: '...' } ส่วนนี้จะได้ค่าเป็น ['userName', 'email']
2.as Array<keyof FormData> 
  การยืนยันกับ TypeScript ว่า "เฮ้ย! ไอ้ List ที่ดึงออกมาเนี่ย มันคือชื่อฟิลด์ที่อยู่ใน FormData แน่นอนนะ"
3. .forEach((key) => { ... })
  สั่งให้ทำคำสั่งในวงเล็บ ซ้ำๆ จนครบทุกชื่อฟิลด์ ที่ดึงมาได้จากข้อ 1
4. const error = validateField(key, formData[key]);
  - key: คือชื่อฟิลด์ปัจจุบัน (เช่น "email")
  - formData[key]: คือ "ค่า" ที่ผู้ใช้พิมพ์ไว้ในฟิลด์นั้น (เช่น "test@mail.com")
  - มันจะส่งทั้ง "ชื่อ" และ "ค่า" ไปให้ฟังก์ชัน validateField ตรวจสอบตาม Logic switch-case ที่เราเขียนไว้
5.if (error) { ... }
  -ฟังก์ชันตรวจสอบส่ง "ข้อความด่า" (Error Message) กลับมา (แปลว่าไม่ผ่าน)
  -1.newErrors[key] = error;: บันทึกข้อความนั้นลงใน Object newErrors ตามชื่อฟิลด์นั้นๆ
  -2.isValid = false;: ปักธงไว้เลยว่า "ฟอร์มนี้ใช้งานไม่ได้นะ มีจุดผิด!"

📄สรุปภาพรวมด้วยการเปรียบเทียบ
- Object.keys: คือการนับว่า มีข้อสอบทั้งหมดกี่ข้อ
- .forEach: คือการที่ครูเดินไป ตรวจทีละข้อ
- validateField: คือ เฉลย ที่ครูใช้ดูว่าข้อนั้นตอบถูกไหม
- isValid = false: คือการที่ครู กาหัวกระดาษ ว่าสอบตก ถ้าเจอข้อที่ผิดแม้แต่ข้อเดียว

📁 สรุปโครงสร้างการวาง
- ชั้นนอกสุด: KeyboardAvoidingView (คอยดึงหน้าจอหลบคีย์บอร์ด)
- ชั้นกลาง: TouchableWithoutFeedback (คอยปิดคีย์บอร์ดเมื่อจิ้มที่ว่าง)
- ชั้นใน: ScrollView (คอยให้ไถหน้าจอได้)
- เนื้อหา: พวก TextFields และ CustomButton ของคุณจะอยู่ข้างในสุดครับ