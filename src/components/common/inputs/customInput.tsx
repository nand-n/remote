import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

interface CustomInputProps extends InputProps {
  height?: string | number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  height,
  style,
  ...props
}) => {
  const inputStyle = { height, ...style };

  return <Input style={inputStyle} {...props} />;
};

export default CustomInput;
