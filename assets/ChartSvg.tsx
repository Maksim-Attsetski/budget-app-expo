import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';

import { useTheme } from '../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
}
const ChartSvg: FC<IProps> = ({ strokeWidth = 4, stroke = null }) => {
  const { color } = useTheme();

  const strokeColor = stroke || color;

  return (
    <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
      <Path
        d='M44 5H3.99998V17H44V5Z'
        fill='none'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin='round'
      />
      <Path
        d='M3.99998 41.0301L16.1756 28.7293L22.7549 35.0301L30.7982 27L35.2786 31.368'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M44 16.1719V42.1719'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <Path
        d='M3.99998 16.1719V30.1719'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <Path
        d='M13.0155 43H44'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <Path
        d='M17 11H38'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <Path
        d='M9.99998 10.9966H11'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
    </Svg>
  );
};

export default memo(ChartSvg);
