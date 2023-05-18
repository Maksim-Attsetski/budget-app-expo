import React, { FC, memo, useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Line, G, Text, Path, Circle } from 'react-native-svg';
import { colors, useAnimated, useTheme } from '../shared';
import MText from './Text';

interface IPoint {
  x: number;
  y: number;
}

interface IProps {
  data?: number[];
  labels?: string[];
  height?: number;
  width?: number;
  margin?: number;
  filled?: boolean;
  lineColor?: string;
  fillColor?: string;
  title?: string;
}

const LineChart: FC<IProps> = ({
  data = [],
  labels = [],
  filled = false,
  height = 200,
  width = 300,
  margin = 20,
  fillColor = 'blue',
  lineColor = 'blue',
  title = '',
}) => {
  const { color } = useTheme();

  const [left, animateLeft] = useAnimated(0);
  const [top, animateTop] = useAnimated(0);

  const [popup, setPopup] = useState({ x: 0, y: 0, visible: false, text: '' });

  const maxValue = Math.max(...data) + Math.max(...data) / 5;
  const minValue = Math.min(...data) - Math.min(...data) / 5;
  const chartHeight = height - 2 * margin;
  const chartWidth = width - 2 * margin;
  const xInterval = chartWidth / (data.length - 1);
  const yInterval = chartHeight / (maxValue - minValue);

  const points: IPoint[] = data.map((value, index) => ({
    x: index * xInterval + margin,
    y: chartHeight - (value - minValue) * yInterval + margin,
  }));

  const lines = points.map((point, index) =>
    index < points.length - 1 ? (
      <Line
        onPress={(e) => {
          e.stopPropagation();
          setPopup({
            y: point.y,
            x: point.x,
            visible: true,
            text: `${data[index]}${labels[index] ? '\n' + labels[index] : ''}`,
          });
        }}
        key={'line' + index}
        x1={point.x}
        y1={point.y}
        x2={points[index + 1].x}
        y2={points[index + 1].y}
        stroke={lineColor}
        strokeWidth={2}
      />
    ) : null
  );

  const circles = points.map((point, index) => (
    <Circle
      key={'circle' + index}
      onPress={(e) => {
        e.stopPropagation();
        setPopup({
          y: point.y - margin,
          x: point.x - margin,
          visible: true,
          text: data[index] + '',
        });
      }}
      fill={'grey'}
      cx={5}
      cy={5}
      r={4}
      x={point.x - margin / 4}
      y={point.y - margin / 4}
      stroke={lineColor}
      strokeWidth={2}
    />
  ));

  const areaPath = `
  M ${margin} ${margin + chartHeight}
  L ${margin} ${points[0].y}
  ${points.map((point) => `L ${point.x} ${point.y}`).join(' ')}
  L ${points[points.length - 1].x} ${margin + chartHeight}
  Z
`;

  const xAxisLabels = points.map((point, index) => (
    <Text
      key={index}
      x={point.x}
      y={height - margin + 15}
      fontSize='10'
      textAnchor='middle'
      fill={color}
    >
      {labels[index]}
    </Text>
  ));

  const yAxisLabels = Array.from(
    { length: Math.ceil((maxValue - minValue) / 10) + 1 },
    (_, index) => (
      <Text
        key={index}
        x={margin - 5}
        y={height - margin - index * 10 * yInterval}
        fontSize='10'
        textAnchor='end'
        fill={color}
      >
        {minValue + index * 10}
      </Text>
    )
  );

  useEffect(() => {
    if (popup.y > 0 && popup.x > 0) {
      animateTop(popup.y);
      animateLeft(popup.x);
    }
  }, [popup.x]);

  return (
    <View style={styles.container}>
      {title && <MText style={styles.title}>{title}</MText>}
      <Svg
        onPress={() => {
          popup.visible && setPopup({ x: 0, y: 0, visible: false, text: '' });
        }}
        width={width}
        height={height}
      >
        <G>
          {filled && <Path d={areaPath} fill={fillColor} opacity={0.2} />}
          {lines}
          {circles}
          {xAxisLabels}
          {yAxisLabels}
        </G>
      </Svg>
      <Animated.View
        style={[
          styles.popup,
          {
            top,
            left,
            opacity: popup.visible ? 1 : 0,
            zIndex: popup.visible ? 2 : -10,
          },
        ]}
      >
        <MText style={{ textAlign: 'center' }}>{popup.text}</MText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: -10,
  },
  popup: {
    position: 'absolute',
    borderRadius: 12,
    borderColor: colors.green,
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default memo(LineChart);
