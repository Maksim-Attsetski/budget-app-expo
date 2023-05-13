import React, { FC, memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Text from './Text';
import { TColors, colors, useTheme } from '../shared';

interface IProps extends TouchableOpacityProps {
  textColor?: string;
}

const Button: FC<IProps> = ({
  textColor = null,
  children,
  disabled = false,
  ...props
}) => {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[props.style, { opacity: disabled ? 0.6 : 1 }]}
    >
      <Text style={{ color: textColor || isDark ? colors.white : colors.dark }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
