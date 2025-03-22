import { ChangeEvent, ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { isNil } from 'es-toolkit';
import { Input } from '@/shared/ui/input';

type InputProps = ComponentProps<typeof Input>;

interface CommaSeparatedInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange'> {
  value?: number | null;
  onChange?: (value: number | null) => void;
}

const formatNumberWithCommas = (value?: number | null) => {
  return isNil(value) ? '' : value.toLocaleString();
};

const parseCommaSeparatedNumber = (value: string) => {
  if (!value.trim()) return null;

  const num = Number(value.replaceAll(',', ''));

  return isNaN(num) ? null : num;
};

const SAFE_INTEGER_INPUT_LENGTH = 19;

const CommaSeparatedInput = ({
  value,
  maxLength = SAFE_INTEGER_INPUT_LENGTH,
  onChange,
  ...props
}: CommaSeparatedInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(parseCommaSeparatedNumber(e.target.value));
  };

  return (
    <Input
      {...props}
      type="text"
      value={formatNumberWithCommas(value)}
      maxLength={Math.min(maxLength, SAFE_INTEGER_INPUT_LENGTH)}
      onChange={handleChange}
    />
  );
};

interface RHFCommaSeparatedInputProps extends CommaSeparatedInputProps {
  name: string;
}

const RHFCommaSeparatedInput = ({ name, ...props }: RHFCommaSeparatedInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <CommaSeparatedInput
          {...field}
          {...props}
        />
      )}
    />
  );
};

export { CommaSeparatedInput, RHFCommaSeparatedInput };
