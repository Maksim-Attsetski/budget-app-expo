import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { colors, useTheme } from '../src/shared';
import { StyleSheet, View } from 'react-native';

interface IProps {
  stroke?: string;
}

const PlusSvg: FC<IProps> = ({ stroke = colors.darkBlock }) => {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  const strokeColor = stroke ? stroke : isDark ? colors.white : colors.dark;

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

const getStyles = (theme: boolean) =>
  StyleSheet.create({
    plus: {
      padding: 10,
      borderRadius: 999,
      backgroundColor: theme ? colors.whiteBlock : colors.darkBlock,
    },
  });

export default memo(PlusSvg);
