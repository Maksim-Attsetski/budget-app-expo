import React, { FC, memo } from 'react';
import { StyleSheet, TextProps, TextStyle } from 'react-native';

import Text from './Text';
import { colors } from '../shared';

interface IProps extends TextProps {
  size?: 'big' | 'small';
  textAlign?: TextStyle['textAlign'];
  textColor?: keyof typeof colors;
}

const Title: FC<IProps> = ({
  size = 'big',
  textAlign = 'center',
  textColor,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        styles[size],
        textColor ? { textAlign, color: textColor } : { textAlign },
        props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  big: {
    fontSize: 26,
    fontWeight: '600',
  },
  small: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default memo(Title);
