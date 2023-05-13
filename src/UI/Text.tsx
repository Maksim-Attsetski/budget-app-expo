import { FC, memo } from 'react';
import { Text, View, TextProps } from 'react-native';

import { colors, useTheme } from '../shared';

const _Text: FC<TextProps> = ({ style, ...props }) => {
  const { isDark } = useTheme();

  return (
    <View>
      <Text
        {...props}
        style={[
          {
            fontSize: 18,
            color: isDark ? colors.white : colors.dark,
          },
          style,
        ]}
      />
    </View>
  );
};

export default memo(_Text);
