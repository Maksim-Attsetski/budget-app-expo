import React, { FC, memo } from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

import { useTheme } from '../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}

const OrderSvg: FC<IProps> = ({ strokeWidth = 4, stroke = null }) => {
  const { color } = useTheme();

  const strokeColor = stroke ?? color;
  return (
    <Svg width='26' height='28' viewBox='0 0 44 48' fill='none'>
      <Rect
        x='9'
        y='8'
        width='30'
        height='36'
        rx='2'
        fill='none'
        stroke='#333'
        stroke-width='4'
        stroke-linejoin='round'
      />
      <Path
        d='M18 4V10'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M30 4V10'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M16 19L32 19'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M16 27L28 27'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M16 35H24'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default memo(OrderSvg);
