export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Article {
  title: string;
  publishDate: string;
  content: string;
  coverImage: string;
  author: Author;
  tags: string[];
}