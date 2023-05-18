import React, { FC, memo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Path, Text } from 'react-native-svg';

import { colors } from '../shared';

interface IProps {
  data: {
    color: string;
    value: number;
    label: string;
  }[];
}

const PieChart: FC<IProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const angles = data.map((item) => (item.value / total) * Math.PI * 2);

  const radius = 100;
  const centerX = radius + 10;
  const centerY = radius + 10;
  let startAngle = 0;

  const slices = data.map((item, index) => {
    const angle = angles[index];
    const endAngle = startAngle + angle;

    // Calculate the coordinates of the starting point and ending point of the slice
    const startX = centerX + radius * Math.sin(startAngle);
    const startY = centerY - radius * Math.cos(startAngle);
    const endX = centerX + radius * Math.sin(endAngle);
    const endY = centerY - radius * Math.cos(endAngle);

    // Calculate the large arc flag based on the angle
    const largeArcFlag = angle <= Math.PI ? 0 : 1;

    // Create the path for the slice
    const path = `
      M ${centerX} ${centerY}
      L ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      Z
    `;

    // Calculate the coordinates for the label
    const labelRadius = radius / 2;
    const labelX = centerX + labelRadius * Math.sin(startAngle + angle / 2);
    const labelY = centerY - labelRadius * Math.cos(startAngle + angle / 2);

    // Increment the start angle for the next slice
    startAngle = endAngle;

    return (
      <G key={index}>
        <Path d={path} fill={item.color} />
        <Text
          x={labelX}
          y={labelY}
          textAnchor='middle'
          fontSize='12'
          fill={colors.whiteBlock}
        >
          {item.label}
        </Text>
      </G>
    );
  });

  return (
    <View>
      <Svg width={radius * 2 + 20} height={radius * 2 + 20}>
        <G>
          {slices}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill='transparent'
            stroke='gray'
          />
        </G>
      </Svg>
    </View>
  );
};

export default memo(PieChart);
