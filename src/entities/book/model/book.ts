export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  coverImage: string;
}

export interface BookDetail extends Book {
  pageCount: number;
}
