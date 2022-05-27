import React, { MouseEventHandler, ReactNode } from 'react';
import './button.scss';

interface ButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: any;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} className={`btn ${props.className}`}>
      {props.children}
    </button>
  );
};

export const OutlineButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button onClick={props.onClick} className={`btn-outline ${props.className}`}>
      {props.children}
    </Button>
  );
};
