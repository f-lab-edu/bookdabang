'use client';

import { useState } from 'react';
import { Command, CommandGroup, CommandItem, CommandList } from './command';
import { Input, InputProps } from './input';
import { Popover, PopoverContent, PopoverAnchor } from './popover';
import { Spin } from './spin';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: string;
  options: AutocompleteOption[];
  loading?: boolean;
  onChange?: (value: string) => void;
}

export const Autocomplete = ({ value, onChange, options, loading, ...props }: AutocompleteProps) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const shouldShowDropdown = loading || (options.length > 0 && dropdownActive);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setDropdownActive(true);
  };

  const handleOptionSelect = (value: string) => {
    onChange?.(value);
    setDropdownActive(false);
  };

  return (
    <Popover
      open={shouldShowDropdown}
      onOpenChange={setDropdownActive}
    >
      <PopoverAnchor asChild>
        <Input
          {...props}
          type="search"
          value={value}
          onChange={handleInputChange}
        />
      </PopoverAnchor>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[var(--radix-popper-anchor-width)] p-0"
      >
        {loading ? (
          <div className="flex h-16 items-center justify-center">
            <Spin size="sm" />
          </div>
        ) : (
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleOptionSelect}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};
