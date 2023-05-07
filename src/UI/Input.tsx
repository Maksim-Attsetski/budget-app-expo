import React, { FC, memo } from 'react';
import { TextInput, View, TextInputProps, StyleSheet } from 'react-native';
import { TColors, colors } from '../shared';

interface IProps extends TextInputProps {}

const Input: FC<IProps> = ({ style, ...props }) => {
  const styles = getStyles(colors, props?.multiline);

  return (
    <View>
      <TextInput
        style={[styles.input, style]}
        {...props}
        cursorColor={colors.white}
        placeholderTextColor={colors.white}
      />
    </View>
  );
};

const getStyles = (color: TColors, multiline?: boolean) =>
  StyleSheet.create({
    input: {
      borderRadius: 12,
      minWidth: 200,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 18,
      backgroundColor: colors.darkBlock,
      color: color.white,
      minHeight: multiline ? 100 : undefined,
    },
  });

export default memo(Input);
