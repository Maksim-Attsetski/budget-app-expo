import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import {
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
  ViewProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

import { useTheme } from '../shared';

interface IProps extends TextInputProps {
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  viewProps?: ViewProps;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const Input: FC<IProps> = ({
  viewProps,
  setValue,
  style,
  disabled,
  onFocus = () => {},
  ...props
}) => {
  const { backgroundColor, color } = useTheme();

  return (
    <View {...viewProps}>
      <TextInput
        style={[
          styles.input,
          { backgroundColor, color, opacity: disabled ? 0.6 : 1 },
          style,
        ]}
        {...props}
        editable={!disabled}
        onChangeText={setValue}
        cursorColor={color}
        onFocus={onFocus}
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
