import React, { FC, memo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../src/shared';

interface IProps {
  stroke?: string;
  full?: boolean;
}

const ArrowLeftSvg: FC<IProps> = ({ stroke = null, full = true }) => {
  const { color } = useTheme();

  const strokeColor = stroke || color;

  return (
    <Svg width='24' height='24' viewBox='0 0 48 48' fill='none'>
      {full && (
        <Path
          d='M5.79889 24H41.7989'
          stroke={strokeColor}
          strokeWidth='4'
          strokeLinejoin='round'
          strokeLinecap='round'
        />
      )}
      <Path
        d='M17.7988 36L5.79883 24L17.7988 12'
        stroke={strokeColor}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default memo(ArrowLeftSvg);
