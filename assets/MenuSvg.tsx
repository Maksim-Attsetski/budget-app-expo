import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';

import { useTheme } from '../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}

const MenuSvg: FC<IProps> = ({ strokeWidth = 4, stroke = null }) => {
  const { color } = useTheme();

  const strokeColor = stroke ?? color;
  return (
    <Svg width='28' height='40' viewBox='0 0 45 48' fill='none'>
      <Path
        d='M7.94971 11.9497H39.9497'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M7.94971 23.9497H39.9497'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M7.94971 35.9497H39.9497'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default memo(MenuSvg);
