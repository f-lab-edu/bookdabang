'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import {
  Root as SelectPrimitiveRoot,
  Group as SelectPrimitiveGroup,
  Value as SelectPrimitiveValue,
  Trigger as SelectPrimitiveTrigger,
  Icon as SelectPrimitiveIcon,
  ScrollUpButton as SelectPrimitiveScrollUpButton,
  ScrollDownButton as SelectPrimitiveScrollDownButton,
  Content as SelectPrimitiveContent,
  Label as SelectPrimitiveLabel,
  Item as SelectPrimitiveItem,
  Portal as SelectPrimitivePortal,
  Viewport as SelectPrimitiveViewport,
  Separator as SelectPrimitiveSeparator,
  ItemIndicator as SelectPrimitiveItemIndicator,
  ItemText as SelectPrimitiveItemText,
} from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const Select = SelectPrimitiveRoot;

const SelectGroup = SelectPrimitiveGroup;

const SelectValue = SelectPrimitiveValue;

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitiveTrigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitiveTrigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitiveTrigger
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitiveIcon asChild>
      <ChevronDown className="size-4 opacity-50" />
    </SelectPrimitiveIcon>
  </SelectPrimitiveTrigger>
));
SelectTrigger.displayName = SelectPrimitiveTrigger.displayName;

const SelectScrollUpButton = forwardRef<
  ElementRef<typeof SelectPrimitiveScrollUpButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitiveScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitiveScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="size-4" />
  </SelectPrimitiveScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitiveScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof SelectPrimitiveScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitiveScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitiveScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="size-4" />
  </SelectPrimitiveScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitiveScrollDownButton.displayName;

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitiveContent>,
  ComponentPropsWithoutRef<typeof SelectPrimitiveContent>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitivePortal>
    <SelectPrimitiveContent
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitiveViewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitiveViewport>
      <SelectScrollDownButton />
    </SelectPrimitiveContent>
  </SelectPrimitivePortal>
));
SelectContent.displayName = SelectPrimitiveContent.displayName;

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitiveLabel>,
  ComponentPropsWithoutRef<typeof SelectPrimitiveLabel>
>(({ className, ...props }, ref) => (
  <SelectPrimitiveLabel
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitiveLabel.displayName;

const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitiveItem>,
  ComponentPropsWithoutRef<typeof SelectPrimitiveItem>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitiveItem
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitiveItemIndicator>
        <Check className="size-4" />
      </SelectPrimitiveItemIndicator>
    </span>
    <SelectPrimitiveItemText>{children}</SelectPrimitiveItemText>
  </SelectPrimitiveItem>
));
SelectItem.displayName = SelectPrimitiveItem.displayName;

const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitiveSeparator>,
  ComponentPropsWithoutRef<typeof SelectPrimitiveSeparator>
>(({ className, ...props }, ref) => (
  <SelectPrimitiveSeparator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitiveSeparator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
