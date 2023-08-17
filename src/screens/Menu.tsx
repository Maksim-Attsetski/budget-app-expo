import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { Text } from '../UI';

const Menu: FC = () => {
  return (
    <View>
      <Text>Главное меню</Text>
    </View>
  );
};

export default memo(Menu);
