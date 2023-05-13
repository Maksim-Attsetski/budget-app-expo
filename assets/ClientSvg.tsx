import React, { FC, memo } from 'react';
import { Circle, Path, Svg } from 'react-native-svg';
import { colors, useTheme } from '../src/shared';

interface IProps {
  stroke?: string;
  strokeWidth?: number;
}

const ClientSvg: FC<IProps> = ({ stroke = null, strokeWidth = 4 }) => {
  const { isDark } = useTheme();

  const strokeColor = stroke ? stroke : isDark ? colors.white : colors.dark;

  return (
    <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
      <Circle
        cx='24'
        cy='12'
        r='8'
        fill='none'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};

export default memo(ClientSvg);
