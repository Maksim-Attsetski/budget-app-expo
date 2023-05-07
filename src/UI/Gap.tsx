import React, { FC, memo } from 'react';
import { View } from 'react-native';

interface IProps {
  x?: number;
  y?: number;
}

const Gap: FC<IProps> = ({ x = 0, y = 0 }) => {
  return <View style={{ marginHorizontal: x, marginVertical: y }} />;
};

export default memo(Gap);
