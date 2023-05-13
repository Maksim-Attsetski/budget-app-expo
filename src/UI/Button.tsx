import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Text from './Text';
import { useTheme } from '../shared';

interface IProps extends TouchableOpacityProps {
  textColor?: string;
}

const Button: FC<IProps> = ({
  textColor = null,
  children,
  disabled = false,
  ...props
}) => {
  const { color } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[props.style, { opacity: disabled ? 0.6 : 1 }]}
    >
      <Text style={{ color: textColor || color }}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
