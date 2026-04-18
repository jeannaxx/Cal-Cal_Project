//กำหนด interfct ข้อมล

export interface Article {
  id: string;
  title: string;
  image: string;
  source: string;
  logo: string;
  content_url: string; // เพิ่ม URL สำหรับกดไปอ่านต่อ
}