import React, { FC } from 'react';
import {
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import Text from './Text';
import { colors, useTheme } from '../shared';

export interface IButtonProps extends TouchableOpacityProps {
  textColor?: string;
  textProps?: TextProps;
}

export const Button: FC<IButtonProps> = ({
  textColor = '',
  children,
  disabled = false,
  textProps,
  ...props
}) => {
  const { color } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[props.style, { opacity: disabled ? 0.6 : 1 }]}
    >
      <Text
        {...props}
        style={[textProps?.style ?? {}, { color: textColor ?? color }]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const AccentButton: FC<IButtonProps> = ({ style, ...props }) => {
  return (
    <Button
      {...props}
      style={[
        style,
        {
          paddingHorizontal: 20,
          paddingVertical: 20,
          width: '100%',
          backgroundColor: colors?.green,
          borderRadius: 12,
          alignItems: 'center',
        },
      ]}
      textColor={colors?.whiteBlock}
      textProps={{ style: { fontSize: 20 } }}
    />
  );
};
