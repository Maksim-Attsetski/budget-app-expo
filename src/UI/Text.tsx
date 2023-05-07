import { FC, memo } from 'react';
import { Text, View, TextProps } from 'react-native';
import { colors } from '../shared';

const _Text: FC<TextProps> = ({ style, ...props }) => {
  return (
    <View>
      <Text
        {...props}
        style={[
          {
            fontSize: 18,
            color: colors.white,
          },
          style,
        ]}
      />
    </View>
  );
};

export default memo(_Text);
