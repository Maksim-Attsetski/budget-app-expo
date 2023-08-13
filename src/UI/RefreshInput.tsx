import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  interpolateColor,
  SharedValue,
} from 'react-native-reanimated';
import { Dimensions, StyleSheet, View } from 'react-native';
import { colors, useTheme } from '../shared';
import Input from './Input';
import Card from './Card';

const { width } = Dimensions.get('window');

const paddingHorizontal = 12;

interface IProps {
  scrollY: SharedValue<number>;
  inputSize?: number;
  offsetY?: number;
  placeHolder?: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}
const RefreshInput: FC<IProps> = ({
  scrollY,
  inputSize = 48,
  offsetY = 170,
  placeHolder = '',
  value = '',
  setValue = () => {},
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

    return { left, opacity };
  });

  return (
    <View>
      <Animated.View style={[styles.inputContainer, inputS]}>
        <Input
          style={{
            width: offsetY,
            backgroundColor,
          }}
          value={value}
          setValue={setValue}
          placeholder={placeHolder}
        />
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
    },
    inputContainer: {
      alignSelf: 'center',
      overflow: 'hidden',
      position: 'relative',
    },
  });

export default memo(RefreshInput);
