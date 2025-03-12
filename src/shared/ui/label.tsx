'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Root as LabelRoot } from '@radix-ui/react-label';
import { cn } from '@/shared/lib/utils';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

type LabelProps = ComponentPropsWithoutRef<typeof LabelRoot> &
  VariantProps<typeof labelVariants> & {
    required?: boolean;
  };

const Label = forwardRef<ElementRef<typeof LabelRoot>, LabelProps>(({ className, required, ...props }, ref) => (
  <LabelRoot
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  >
    {props.children}
    {required && (
      <span
        aria-hidden="true"
        className="ml-1 text-red-500"
      >
        *
      </span>
    )}
  </LabelRoot>
));
Label.displayName = LabelRoot.displayName;

export { Label };
