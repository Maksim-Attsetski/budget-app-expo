import React, { FC, memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Text } from '../../UI';

export interface IProgressChartData {
  [key: string]: {
    color: string;
    value: number;
    title: string;
  };
}
interface IProps {
  circleSize?: number;
  strokeWidth?: number;
  data?: IProgressChartData;
}
const ProgressChart: FC<IProps> = ({
  circleSize = 300,
  strokeWidth = 80,
  data = {
    first: {
      color: 'red',
      value: 50,
      title: 'Red',
    },
    second: {
      color: 'green',
      value: 50,
      title: 'Green',
    },
  },
}) => {
  const size = circleSize / 2;
  const radius = circleSize / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const greenLength = circumference * (data.second.value / 100);
  const redLength = circumference * (data.first.value / 100);

  const titles = useMemo(
    () =>
      Object.values(data).map((el, inx) => (
        <View style={styles.title} key={inx}>
          <Text>
            {el.title}, {Math.round(el.value)}%
          </Text>
          <View style={[styles.colorBlock, { backgroundColor: el.color }]} />
        </View>
      )),
    [data]
  );

  return (
    <View style={styles.container}>
      <View style={styles.titles}>{titles}</View>
      <Svg width={circleSize} height={circleSize}>
        <Circle
          cx={size}
          cy={size}
          r={radius}
          stroke='#e5e5e5'
          strokeWidth={strokeWidth}
          fill='none'
        />
        <Circle
          cx={size}
          cy={size}
          r={radius}
          fill='none'
          stroke={data.second.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${greenLength} ${circumference - greenLength}`}
          strokeDashoffset={circumference - greenLength}
        />
        <Circle
          cx={size}
          cy={size}
          r={radius}
          fill='none'
          stroke={data.first.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${redLength} ${circumference - redLength}`}
          strokeDashoffset={redLength * 2}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    marginHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorBlock: {
    marginLeft: 10,
    width: 15,
    height: 15,
  },
});

export default memo(ProgressChart);
