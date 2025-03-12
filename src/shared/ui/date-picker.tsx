import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { isNil, isNotNil } from 'es-toolkit';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface DatePickerProps {
  placeholder?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
}

const DatePicker = ({ placeholder = '날짜 선택', value, onChange }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-full justify-start text-left font-normal', isNil(value) && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 size-4" />
          {isNotNil(value) ? format(value, 'PPP', { locale: ko }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          initialFocus
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
