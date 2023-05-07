import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { colors } from '../src/shared';
import { StyleSheet, View } from 'react-native';

interface IProps {
  stroke?: string;
}

const PlusSvg: FC<IProps> = ({ stroke = colors.darkBlock }) => {
  return (
    <View style={styles.plus}>
      <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
        <Path
          d='M24.0605 10L24.0239 38'
          stroke={stroke}
          strokeWidth={10}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M10 24L38 24'
          stroke={stroke}
          strokeWidth={10}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  plus: {
    padding: 10,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
});

export default memo(PlusSvg);
