import React from 'react';
import Button from '@mui/material/Button';

interface AtomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
}

const AtomButton: React.FC<AtomButtonProps> = ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
);

export default AtomButton; 