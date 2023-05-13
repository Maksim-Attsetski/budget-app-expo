import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { TextInput, View, TextInputProps, StyleSheet } from 'react-native';

import { useTheme } from '../shared';

interface IProps extends TextInputProps {
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}

const Input: FC<IProps> = ({ setValue, style, disabled, ...props }) => {
  const { backgroundColor, color } = useTheme();

  return (
    <View>
      <TextInput
        style={[styles.input, { backgroundColor, color }, style]}
        {...props}
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
