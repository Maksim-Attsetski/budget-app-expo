import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { useTheme } from '../src/shared';

interface IProps {
  stroke?: string;
}

const PlusSvg: FC<IProps> = ({ stroke = null }) => {
  const { color, backgroundColor } = useTheme();
  const styles = getStyles(color);

  const strokeColor = stroke || backgroundColor;

  return (
    <View style={styles.plus}>
      <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
        <Path
          d='M24.0605 10L24.0239 38'
          stroke={strokeColor}
          strokeWidth={10}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M10 24L38 24'
          stroke={strokeColor}
          strokeWidth={10}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

const getStyles = (backgroundColor: string) =>
  StyleSheet.create({
    plus: {
      padding: 10,
      borderRadius: 999,
      backgroundColor,
    },
  });

export default memo(PlusSvg);
