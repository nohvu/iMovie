import React from 'react';

import './input.scss';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e)}></input>
  );
};
