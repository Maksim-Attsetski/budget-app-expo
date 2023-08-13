import React, { FC, memo } from 'react';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';
import { useTheme } from '../src/shared';

interface IProps {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}
const EditSvg: FC<IProps> = ({
  strokeWidth = 4,
  stroke = null,
  fill = 'none',
}) => {
  const { color } = useTheme();

  const strokeColor = stroke ?? color;

  return (
    <>
      <Svg width='24' height='24' viewBox='0 0 48 48' fill={fill}>
        <G clip-path='url(#icon-34832c752696ccc)'>
          <Path
            d='M30.9995 8.99902L38.9995 16.999'
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M7.99953 31.999L35.9994 4L43.9995 11.999L15.9995 39.999L5.99951 41.999L7.99953 31.999Z'
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M30.9995 8.99902L38.9995 16.999'
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M8.99951 31.999L15.9995 38.999'
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M12.9995 34.999L34.9995 12.999'
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </G>
        <Defs>
          <ClipPath id='icon-34832c752696ccc'>
            <Rect width='48' height='48' fill={stroke} />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  );
};

export default memo(EditSvg);
