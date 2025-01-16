'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { BookCard } from '@/entities/book';

const books = [
  {
    id: 1,
    title: '클린 코드',
    author: '로버트 C. 마틴',
    publisher: '인사이트',
    publishDate: '2013-12-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 2,
    title: '1984',
    author: '조지 오웰',
    publisher: '민음사',
    publishDate: '2009-08-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 3,
    title: '해리 포터와 마법사의 돌',
    author: 'J.K. 롤링',
    publisher: '문학수첩',
    publishDate: '2019-11-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 4,
    title: '어린 왕자',
    author: '생텍쥐페리',
    publisher: '열린책들',
    publishDate: '2015-10-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 5,
    title: '사피엔스',
    author: '유발 하라리',
    publisher: '김영사',
    publishDate: '2015-11-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 6,
    title: '데미안',
    author: '헤르만 헤세',
    publisher: '민음사',
    publishDate: '2009-01-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 7,
    title: '이것이 자바다',
    author: '신용권',
    publisher: '한빛미디어',
    publishDate: '2022-01-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 8,
    title: '파이썬 알고리즘 인터뷰',
    author: '박상길',
    publisher: '책만',
    publishDate: '2020-08-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 9,
    title: '토지',
    author: '박경리',
    publisher: '나남',
    publishDate: '2002-03-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 10,
    title: '칼의 노래',
    author: '김훈',
    publisher: '문학동네',
    publishDate: '2001-01-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 11,
    title: '혼자 공부하는 머신러닝+딥러닝',
    author: '박해선',
    publisher: '한빛미디어',
    publishDate: '2020-12-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 12,
    title: '객체지향의 사실과 오해',
    author: '조영호',
    publisher: '위키북스',
    publishDate: '2015-06-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 13,
    title: '죽음의 수용소에서',
    author: '빅터 프랭클',
    publisher: '청아출판사',
    publishDate: '2005-08-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 14,
    title: '코스모스',
    author: '칼 세이건',
    publisher: '사이언스북스',
    publishDate: '2006-12-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 15,
    title: '침묵의 봄',
    author: '레이첼 카슨',
    publisher: '에코리브르',
    publishDate: '2011-10-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 16,
    title: '프로그래머의 길, 멘토에게 묻다',
    author: '데이브 후버, 애디웨일 오시나이',
    publisher: '인사이트',
    publishDate: '2010-07-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 17,
    title: '맨큐의 경제학',
    author: '그레고리 맨큐',
    publisher: '센게이지러닝',
    publishDate: '2018-01-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 18,
    title: '총, 균, 쇠',
    author: '재레드 다이아몬드',
    publisher: '문학사상사',
    publishDate: '2005-12-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 19,
    title: '이기적 유전자',
    author: '리처드 도킨스',
    publisher: '을유문화사',
    publishDate: '2018-10-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 20,
    title: '연금술사',
    author: '파울로 코엘료',
    publisher: '문학동네',
    publishDate: '2001-04-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 21,
    title: '모던 자바스크립트 Deep Dive',
    author: '이웅모',
    publisher: '위키북스',
    publishDate: '2020-09-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 22,
    title: '정의란 무엇인가',
    author: '마이클 샌델',
    publisher: '김영사',
    publishDate: '2014-11-01',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 23,
    title: '2024년 트렌드 예측',
    author: '김트렌드',
    publisher: '미래출판사',
    publishDate: '2024-01-15',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 24,
    title: '인공지능과 윤리',
    author: '이AI',
    publisher: '기술과철학',
    publishDate: '2023-11-30',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 25,
    title: '현대 심리학의 이해',
    author: '박마인드',
    publisher: '심리학사',
    publishDate: '2023-10-05',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 26,
    title: '글로벌 경제 전망 2024',
    author: '최경제',
    publisher: '세계경제연구소',
    publishDate: '2023-12-20',
    coverImage: 'https://placehold.co/200x300',
  },
  {
    id: 27,
    title: '디지털 전환 시대의 리더십',
    author: '정디지털',
    publisher: '혁신경영',
    publishDate: '2024-02-01',
    coverImage: 'https://placehold.co/200x300',
  },
];

export default function HomePage() {
  const [filter, setFilter] = useState('new');
  const [searchTerm, setSearchTerm] = useState('');

  const newBooks = books.filter((book) => book.id % 2 === 0);
  const bestsellerBooks = books.filter((book) => book.id % 2 !== 0);
  const booksToShow = filter === 'new' ? newBooks : bestsellerBooks;
  const filteredBooks = booksToShow.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Input
          type="search"
          placeholder="도서 검색..."
          className="mb-4 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-8 border-b">
          <button
            className={`flex flex-col items-center pb-2 ${filter === 'new' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            onClick={() => setFilter('new')}
          >
            <Sparkles className="mb-1 size-6" />
            <span className="text-xs">신간</span>
          </button>
          <button
            className={`flex flex-col items-center pb-2 ${filter === 'bestseller' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            onClick={() => setFilter('bestseller')}
          >
            <TrendingUp className="mb-1 size-6" />
            <span className="text-xs">베스트셀러</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            {...book}
          />
        ))}
      </div>
    </div>
  );
}
