import { Sparkles, TrendingUp } from 'lucide-react';
import { FilterType } from '../model/filter-type';

interface BookFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function BookFilter({ currentFilter, onFilterChange }: BookFilterProps) {
  return (
    <div className="flex space-x-8 border-b">
      <button
        className={`flex flex-col items-center pb-2 ${
          currentFilter === 'new' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
        }`}
        onClick={() => onFilterChange('new')}
      >
        <Sparkles className="mb-1 size-6" />
        <span className="text-xs">신간</span>
      </button>
      <button
        className={`flex flex-col items-center pb-2 ${
          currentFilter === 'bestseller' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
        }`}
        onClick={() => onFilterChange('bestseller')}
      >
        <TrendingUp className="mb-1 size-6" />
        <span className="text-xs">베스트셀러</span>
      </button>
    </div>
  );
}
