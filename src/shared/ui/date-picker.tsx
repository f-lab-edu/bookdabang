import { Ref } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { isNil, isNotNil } from 'es-toolkit';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button, ButtonProps } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface DatePickerProps extends Omit<ButtonProps, 'value' | 'onChange'> {
  ref?: Ref<HTMLButtonElement>;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date?: Date) => void;
}

const DatePicker = ({ ref, className, placeholder = '날짜 선택', value, onChange, ...props }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          {...props}
          ref={ref}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal shadow-sm focus:ring-1',
            className,
            isNil(value) && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {isNotNil(value) ? format(value, 'PPP', { locale: ko }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          initialFocus
          selected={value ?? undefined}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
