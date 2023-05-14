import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}
const SuccessSvg: FC<IProps> = ({
  strokeWidth = 4,
  stroke = null,
  fill = 'none',
}) => {
  const { color } = useTheme();

  const strokeColor = stroke || color;

  return (
    <>
      <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
        <Path
          d='M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z'
          fill={fill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M17 24L22 29L32 19'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </>
  );
};

export default memo(SuccessSvg);
