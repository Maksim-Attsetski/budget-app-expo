import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '../../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}
const RecipeSvg: FC<IProps> = ({
  strokeWidth = 4,
  stroke = null,
  fill = 'none',
}) => {
  const { color } = useTheme();

  const strokeColor = stroke ?? color;

  return (
    <>
      <Svg width='24' height='24' viewBox='0 0 48 48' fill={fill}>
        <Path
          d='M10 6C10 4.89543 10.8954 4 12 4H36C37.1046 4 38 4.89543 38 6V44L31 39L24 44L17 39L10 44V6Z'
          fill={fill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M18 22L30 22'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M18 30L30 30'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M18 14L30 14'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </>
  );
};

export default memo(RecipeSvg);
