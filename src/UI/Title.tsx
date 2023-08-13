import React, { FC, memo } from 'react';
import { StyleSheet, TextProps, TextStyle } from 'react-native';

import Text from './Text';

interface IProps extends TextProps {
  size?: 'big' | 'small';
  textAlign?: TextStyle['textAlign'];
}

const Title: FC<IProps> = ({
  size = 'big',
  textAlign = 'center',
  ...props
}) => {
  return <Text {...props} style={[styles[size], { textAlign }, props.style]} />;
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
