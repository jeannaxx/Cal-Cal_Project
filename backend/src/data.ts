//ไฟล์เก็บข้อมูลสมมติ (mock data)
import { Article } from './types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'อย่า ลดน้ำหนักผิดวิธี ทำไมการลดน้ำหนักผิดวิธีอาจทำให้คุณอ้วนขึ้นกว่าเดิม',
    image: 'https://picsum.photos/id/102/800/400', 
    source: 'SEMed.co.th',
    logo: 'https://picsum.photos/id/1011/50/50',
    content_url: 'https://example.com/article/1'
  },
  {
    id: '2',
    title: '7 เหตุผล ที่คุณลดน้ำหนักไม่ลงสักที แม้จะคุมอาหารแล้ว',
    image: 'https://picsum.photos/id/103/800/400',
    source: 'akesisonlogy.com',
    logo: 'https://picsum.photos/id/1027/50/50',
    content_url: 'https://example.com/article/2'
  }
];