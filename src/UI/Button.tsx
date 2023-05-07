import React, { FC, memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Text from './Text';
import { colors } from '../shared';

interface IProps extends TouchableOpacityProps {
  textColor?: string;
}

const Button: FC<IProps> = ({
  textColor = colors.white,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[props.style, { opacity: props?.disabled ? 0.1 : 1 }]}
      {...props}
    >
      <Text style={{ color: textColor }}>{children}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
