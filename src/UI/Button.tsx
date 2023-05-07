import React, { FC, memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from './Text';
import { colors } from '../shared';

interface IProps extends TouchableOpacityProps {
  textColor?: string;
}

const Button: FC<IProps> = ({
  textColor = colors.dark,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={{ color: textColor }}>{children}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
