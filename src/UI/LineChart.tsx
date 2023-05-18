import React, { FC, memo, useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Line, G, Text, Path, Circle } from 'react-native-svg';
import { colors, useAnimated, useTheme } from '../shared';
import MText from './Text';

interface IPoint {
  x: number;
  y: number;
}

interface ILine {
  data: number[];
  color: string;
  label?: string;
}

interface IProps {
  lines: ILine[];
  labels?: string[];
  height?: number;
  width?: number;
  margin?: number;
  filled?: boolean;
  fillColor?: string;
  title?: string;
}

const LineChart: FC<IProps> = ({
  lines = [],
  labels = [],
  filled = false,
  height = 200,
  width = 300,
  margin = 20,
  fillColor = 'blue',
  title = '',
}) => {
  const { color } = useTheme();

  const [left, animateLeft] = useAnimated(0);
  const [top, animateTop] = useAnimated(0);

  const [popup, setPopup] = useState({ x: 0, y: 0, visible: false, text: '' });

  const maxValues = lines.map((line) => Math.max(...line.data));
  const minValues = lines.map((line) => Math.min(...line.data));

  const maxValue = Math.max(...maxValues) + Math.max(...maxValues) / 5;
  const minValue = Math.min(...minValues) - Math.min(...minValues) / 5;

  const chartHeight = height - 2 * margin;
  const chartWidth = width - 2 * margin;

  const xInterval = chartWidth / (lines[0].data.length - 1);
  const yInterval = chartHeight / (maxValue - minValue);

  const points: IPoint[][] = lines.map((line) =>
    line.data.map((value, index) => ({
      x: index * xInterval + margin,
      y: chartHeight - (value - minValue) * yInterval + margin,
    }))
  );

  const linesElements = points.map((linePoints, lineIndex) =>
    linePoints.map((point, index) =>
      index < linePoints.length - 1 ? (
        <Line
          onPress={(e) => {
            e.stopPropagation();
            setPopup({
              y: point.y,
              x: point.x,
              visible: true,
              text: `${lines[lineIndex].data[index]}${
                lines[lineIndex].label ? '\n' + lines[lineIndex].label : ''
              }`,
            });
          }}
          key={`line${lineIndex}-${index}`}
          x1={point.x}
          y1={point.y}
          x2={linePoints[index + 1].x}
          y2={linePoints[index + 1].y}
          stroke={lines[lineIndex].color}
          strokeWidth={2}
        />
      ) : null
    )
  );

  const circles = points.map((linePoints, inx) =>
    linePoints.map((point, index) => (
      <Circle
        key={`circle-${index}`}
        onPress={(e) => {
          e.stopPropagation();
          setPopup({
            y: point.y - margin,
            x: point.x - margin,
            visible: true,
            text: lines[index].data + '',
          });
        }}
        fill={'grey'}
        cx={5}
        cy={5}
        r={4}
        x={point.x - margin / 4}
        y={point.y - margin / 4}
        stroke={lines[inx].color}
        strokeWidth={2}
      />
    ))
  );

  const areaPaths = lines.map((line, lineIndex) => {
    const linePoints = points[lineIndex];
    const path = `
      M ${margin} ${margin + chartHeight}
      L ${margin} ${linePoints[0].y}
      ${linePoints.map((point) => `L ${point.x} ${point.y}`).join(' ')}
      L ${linePoints[linePoints.length - 1].x} ${margin + chartHeight}
      Z
    `;
    return (
      <Path
        key={`area-${lineIndex}`}
        d={path}
        fill={line.color}
        opacity={0.2}
      />
    );
  });

  const xAxisLabels = points[0].map((point, index) => (
    <Text
      key={`x-axis-label-${index}`}
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
        key={`y-axis-label-${index}`}
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
          {filled && areaPaths}
          {linesElements}
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
