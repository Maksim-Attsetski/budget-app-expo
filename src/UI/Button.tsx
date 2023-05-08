import React, { FC, memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from './Text';
import { colors } from '../shared';

interface IProps extends TouchableOpacityProps {
  textColor?: string;
}

const Button: FC<IProps> = ({
  textColor = colors.white,
  children,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[props.style, { opacity: disabled ? 0.6 : 1 }]}
    >
      <Text style={{ color: textColor }}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
