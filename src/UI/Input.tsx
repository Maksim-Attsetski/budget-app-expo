import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import {
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
  ViewProps,
} from 'react-native';

import { colors, useTheme } from '../shared';

interface IProps extends TextInputProps {
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  inversed?: boolean;
  viewProps?: ViewProps;
}

const Input: FC<IProps> = ({
  viewProps,
  setValue,
  style,
  disabled,
  inversed = false,
  ...props
}) => {
  const { color, isDark, backgroundColor } = useTheme();

  return (
    <View {...viewProps}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: inversed
              ? backgroundColor
              : isDark
              ? colors.dark
              : colors.white,
            opacity: disabled ? 0.6 : 1,
            color,
          },
          style,
        ]}
        {...props}
        editable={!disabled}
        onChangeText={setValue}
        cursorColor={color}
        placeholderTextColor={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 12,
  },
});

export default memo(Input);
