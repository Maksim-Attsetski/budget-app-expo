import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '../../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}
const SettingSvg: FC<IProps> = ({ strokeWidth = 4, stroke = null }) => {
  const { color } = useTheme();

  const strokeColor = stroke || color;

  return (
    <>
      <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
        <Path
          d='M24 4L18 10H10V18L4 24L10 30V38H18L24 44L30 38H38V30L44 24L38 18V10H30L24 4Z'
          fill='none'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin='round'
        />
        <Path
          d='M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z'
          fill='none'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin='round'
        />
        <Path
          d='M17 24L22 29L32 19'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin='round'
        />
      </Svg>
    </>
  );
};

export default memo(SettingSvg);
