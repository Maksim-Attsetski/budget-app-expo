import { Animated } from 'react-native';

type TGetTiming = (
  value: Animated.Value | Animated.ValueXY,
  toValue?:
    | number
    | Animated.Value
    | Animated.ValueXY
    | { x: number; y: number }
    | Animated.AnimatedInterpolation<number>,
  duration?: number,
  useNativeDriver?: boolean
) => void;

export const getTiming: TGetTiming = (
  value,
  toValue,
  duration = 300,
  useNativeDriver = true
) => {
  Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver,
  }).start();
};
