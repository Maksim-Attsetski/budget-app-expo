import { FC, memo } from 'react';
import { Text, View, TextProps } from 'react-native';

import { useTheme } from '../shared';

const _Text: FC<TextProps> = ({ style, ...props }) => {
  const { color } = useTheme();

  return (
    <View>
      <Text {...props} style={[{ fontSize: 18, color }, style]} />
    </View>
  );
};

export default memo(_Text);
