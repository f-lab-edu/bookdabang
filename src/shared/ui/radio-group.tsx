'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import {
  Root as RadioGroupPrimitiveRoot,
  Item as RadioGroupPrimitiveItem,
  Indicator as RadioGroupPrimitiveIndicator,
} from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitiveRoot>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitiveRoot>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitiveRoot
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitiveRoot.displayName;

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitiveItem>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitiveItem>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitiveItem
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitiveIndicator className="flex items-center justify-center">
        <Circle className="size-3.5 fill-primary" />
      </RadioGroupPrimitiveIndicator>
    </RadioGroupPrimitiveItem>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitiveItem.displayName;

export { RadioGroup, RadioGroupItem };
