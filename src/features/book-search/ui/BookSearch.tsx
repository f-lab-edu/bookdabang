import { Input } from '@/shared/ui/input';

interface BookSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function BookSearch({ searchTerm, onSearch }: BookSearchProps) {
  return (
    <Input
      type="search"
      placeholder="도서 검색..."
      className="mb-4 w-full"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
