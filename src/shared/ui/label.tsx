'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Root as LabelRoot } from '@radix-ui/react-label';
import { cn } from '@/shared/lib/utils';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

const Label = forwardRef<
  ElementRef<typeof LabelRoot>,
  ComponentPropsWithoutRef<typeof LabelRoot> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelRoot
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelRoot.displayName;

export { Label };
