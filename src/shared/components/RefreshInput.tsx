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
  inputSize = 48,
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

  return (
    <View>
      <Animated.View style={[styles.inputContainer, inputS]}>
        <TouchableWithoutFeedback
          onPress={(e) => {
            e.stopPropagation();
            onFocus();
          }}
        >
          <Animated.Text
            style={[{ width: offsetY, backgroundColor }, textS, styles.input]}
          >
            {placeHolder ?? ''}
          </Animated.Text>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            { backgroundColor: colors.purple },
            styles.control,
            inputLoaderS,
          ]}
        />
      </Animated.View>
    </View>
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
    },
    input: {
      paddingHorizontal,
      paddingVertical: 12,
      fontSize: 18,
      borderRadius: 12,
    },
  });

export default memo(RefreshInput);
