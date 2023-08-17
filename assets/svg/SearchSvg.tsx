import React, { FC, memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { useTheme } from '../../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}

const SearchSvg: FC<IProps> = ({
  strokeWidth = 4,
  stroke = null,
  fill = 'none',
  style = {},
}) => {
  const { color } = useTheme();

  const strokeColor = stroke ?? color;
  return (
    <Svg style={style} width='24' height='24' viewBox='0 0 48 48' fill='none'>
      <Path
        d='M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z'
        fill='none'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin='round'
      />
      <Path
        d='M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M33.2216 33.2217L41.7069 41.707'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default memo(SearchSvg);
