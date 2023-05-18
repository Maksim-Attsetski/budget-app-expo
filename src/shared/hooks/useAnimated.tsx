import { useRef } from 'react';
import { Animated } from 'react-native';
import { getTiming } from '../utils';

type TUseAnimated = (
  initialValue: number,
  duration?: number
) => [Animated.Value, (v: number) => void];

export const useAnimated: TUseAnimated = (initialValue, duration = 400) => {
  const value = useRef(new Animated.Value(initialValue)).current;

  const change = (toValue: number) => {
    getTiming(value, toValue, duration, false);
  };

  return [value, change];
};
