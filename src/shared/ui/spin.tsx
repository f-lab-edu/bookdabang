import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const spinVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      default: 'size-12',
      sm: 'size-8',
      lg: 'size-16',
      icon: 'size-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface SpinProps extends VariantProps<typeof spinVariants> {
  className?: string;
}

const Spin = ({ size, className }: SpinProps) => {
  return <Loader2 className={cn(spinVariants({ size, className }))} />;
};

export { Spin, spinVariants };
