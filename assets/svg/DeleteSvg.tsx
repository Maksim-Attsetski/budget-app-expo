import React, { FC, memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import { useTheme } from '../../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
}
const DeleteSvg: FC<IProps> = ({ strokeWidth = 4, stroke = null }) => {
  const { color } = useTheme();

  const strokeColor = stroke || color;

  return (
    <>
      <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
        <Path
          d='M9 10V44H39V10H9Z'
          fill='none'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin='round'
        />
        <Path
          d='M20 20V33'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M28 20V33'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M4 10H44'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M16 10L19.289 4H28.7771L32 10H16Z'
          fill='none'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin='round'
        />
      </Svg>
    </>
  );
};

export default memo(DeleteSvg);
