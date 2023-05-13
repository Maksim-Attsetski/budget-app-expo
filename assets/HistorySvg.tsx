import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
}

const HistorySvg: FC<IProps> = ({ strokeWidth = 4, stroke = null }) => {
  const { color } = useTheme();

  const strokeColor = stroke || color;

  return (
    <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
      <Path
        d='M5.81836 6.72729V14H13.0911'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C16.598 4 10.1351 8.02111 6.67677 13.9981'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M24.005 12L24.0038 24.0088L32.4832 32.4882'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default memo(HistorySvg);
