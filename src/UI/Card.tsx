import React, { FC, memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors } from '../shared';

const Card: FC<ViewProps> = (props) => {
  return (
    <View style={{ alignItems: 'flex-start' }}>
      <View {...props} style={[styles.card, props.style]}>
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.darkBlock,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default memo(Card);
