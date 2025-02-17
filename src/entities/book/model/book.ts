export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  coverImage: string;
}

export interface BookDetail extends Book {
  pageCount: number;
}
