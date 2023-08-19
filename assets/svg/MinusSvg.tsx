import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '../../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  isPlus?: boolean;
}
const MinusSvg: FC<IProps> = ({
  strokeWidth = 4,
  stroke = null,
  fill = 'none',
  isPlus = false,
}) => {
  const { color } = useTheme();

  const strokeColor = stroke ?? color;

  return (
    <>
      <Svg width='24' height='24' viewBox='0 0 48 48' fill={fill}>
        {isPlus && (
          <Path
            d='M24.0605 10L24.0239 38'
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        )}
        <Path
          d='M10 24L38 24'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        {/* <Path
          d='M10.5 24L38.5 24'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        /> */}
      </Svg>
    </>
  );
};

export default memo(MinusSvg);
