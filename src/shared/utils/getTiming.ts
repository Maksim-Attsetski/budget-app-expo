import { Animated } from 'react-native';

type TGetTiming = (
  value: Animated.Value | Animated.ValueXY,
  toValue?:
    | number
    | Animated.Value
    | Animated.ValueXY
    | { x: number; y: number }
    | Animated.AnimatedInterpolation<number>,
  duration?: number
) => void;

export const getTiming: TGetTiming = (value, toValue, duration = 300) => {
  Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
  }).start();
};
