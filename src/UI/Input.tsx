import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { TextInput, View, TextInputProps, StyleSheet } from 'react-native';

import { TColors, colors } from '../shared';

interface IProps extends TextInputProps {
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}

const Input: FC<IProps> = ({ setValue, style, disabled, ...props }) => {
  const styles = getStyles(colors, props?.multiline);

  return (
    <View>
      <TextInput
        style={[styles.input, style]}
        {...props}
        onChangeText={setValue}
        cursorColor={colors.white}
        placeholderTextColor={colors.white}
      />
    </View>
  );
};

const getStyles = (color: TColors, multiline?: boolean) =>
  StyleSheet.create({
    input: {
      backgroundColor: colors.darkBlock,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 18,
      borderRadius: 12,
      color: colors.white,
    },
  });

export default memo(Input);
