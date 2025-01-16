import { Flex } from '@radix-ui/themes';
import type { ChangeEvent } from 'react';

import './styles.scss';

interface InputProps {
  value: string | number;
  type: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const BaseInput = ({
  value,
  type,
  onChange,
  placeholder = 'Введите ответ...',
  disabled = false,
}: InputProps) => {
  return (
    <Flex align="center" className="input-wrapper">
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
        onChange={onChange}
      />
    </Flex>
  );
};
