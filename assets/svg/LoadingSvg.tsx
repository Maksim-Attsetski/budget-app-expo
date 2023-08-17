import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';

import { useTheme } from '../../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}

const LoadingSvg: FC<IProps> = ({
  strokeWidth = 4,
  stroke = null,
  fill = 'none',
}) => {
  const { color } = useTheme();

  const strokeColor = stroke ?? color;
  return (
    <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
      <Path
        d='M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default memo(LoadingSvg);
