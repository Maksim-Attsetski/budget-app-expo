import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  interpolateColor,
  SharedValue,
} from 'react-native-reanimated';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors, useTheme } from '..';
import Input from '../../UI/Input';
import Card from '../../UI/Card';
import { Button } from '../../UI/Button';
import SearchSvg from '../../../assets/SearchSvg';
import LoadingSvg from '../../../assets/LoadingSvg';

const { width } = Dimensions.get('window');

const paddingHorizontal = 16;

interface IProps {
  scrollY: SharedValue<number>;
  inputSize?: number;
  offsetY?: number;
  placeHolder?: string;
  onFocus?: () => void;
}
const RefreshInput: FC<IProps> = ({
  scrollY,
  inputSize = 80,
  offsetY = 170,
  placeHolder = '',
  onFocus = () => {},
}) => {
  const { backgroundColor } = useTheme();
  const styles = getStyles(inputSize);

  const inputS = useAnimatedStyle(() => {
    const int = (input: number[], output: number[] = [100, 0]) =>
      interpolate(scrollY.value, input, output, {
        extrapolateRight: Extrapolation.CLAMP,
      });
    const input = [0, offsetY / 2.2];
    const inputWidth = int(input, [inputSize, width - paddingHorizontal * 2]);
    const borderRadius = int(input, [100, 12]);

    return { width: inputWidth, borderRadius };
  });

  const inputLoaderS = useAnimatedStyle(() => {
    const int = (input: number[], output: number[] = [100, 0]) =>
      interpolate(scrollY.value, input, output, {
        extrapolateRight: Extrapolation.CLAMP,
      });
    const input = [0, offsetY / 2.2];
    const left = int(input, [0, 0]);
    const opacity = int(input, [1, 0]);
    const width = int(input, [offsetY, 50]);

    return { left, opacity, width };
  });

  const textS = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [100, 200], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return { opacity };
  });

  const searchS = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [100, 200], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return { opacity };
  });

  const loadSvgS = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [100, 200], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const rotate = interpolate(scrollY.value, [0, 200], [720, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return { opacity, transform: [{ rotate: rotate + 'deg' }] };
  });

  return (
    <Animated.View style={[styles.inputContainer, inputS]}>
      {/* <LoadingSvg /> */}
      <TouchableWithoutFeedback
        onPress={(e) => {
          e.stopPropagation();
          onFocus();
        }}
        style={{ position: 'relative' }}
      >
        <Animated.Text
          style={[{ width: offsetY, backgroundColor }, textS, styles.input]}
        >
          {placeHolder ?? ''}
        </Animated.Text>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.search, searchS]}>
        <SearchSvg />
      </Animated.View>
      <Animated.View style={[styles.search, loadSvgS]}>
        <LoadingSvg stroke={colors.white} />
      </Animated.View>
      <Animated.View
        style={[
          { backgroundColor: colors.purple },
          styles.control,
          inputLoaderS,
        ]}
      />
    </Animated.View>
  );
};

const getStyles = (inputSize: number) =>
  StyleSheet.create({
    control: {
      position: 'absolute',
      top: 0,
      width: inputSize,
      height: inputSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    inputContainer: {
      alignSelf: 'center',
      overflow: 'hidden',
      position: 'relative',
      minHeight: inputSize * 0.9,
    },
    input: {
      paddingHorizontal,
      paddingVertical: 12,
      fontSize: 18,
      borderRadius: 12,
    },
    search: {
      position: 'absolute',
      top: 12,
      right: 16,
      width: 20,
      zIndex: 2,
    },
  });

export default memo(RefreshInput);
