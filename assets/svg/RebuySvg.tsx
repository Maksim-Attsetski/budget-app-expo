import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '../../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}
const RebuySvg: FC<IProps> = ({
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
          d='M11.2721 36.7279C14.5294 39.9853 19.0294 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C19.0294 6 14.5294 8.01472 11.2721 11.2721C9.6141 12.9301 6 17 6 17'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M6 9V17H14'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </>
  );
};

export default memo(RebuySvg);
