import React, { FC, memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../shared';

const Card: FC<ViewProps> = (props) => {
  const { backgroundColor } = useTheme();

  return (
    <View {...props} style={[styles.card, { backgroundColor }, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});

export default memo(Card);
