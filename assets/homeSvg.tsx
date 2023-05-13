import React, { FC, memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../src/shared';

interface IProps {
  stroke?: string;
}

const HomeSvg: FC<IProps> = ({ stroke = null }) => {
  const { color } = useTheme();

  const strokeColor = stroke || color;

  return (
    <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
      <Path
        d='M44 44V20L24 4L4 20L4 44H16V26H32V44H44Z'
        fill='none'
        stroke={strokeColor}
        strokeWidth='4'
        strokeLinejoin='round'
      />
      <Path
        d='M24 44V34'
        stroke={strokeColor}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default memo(HomeSvg);
