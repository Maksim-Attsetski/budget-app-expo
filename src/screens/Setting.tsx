import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { Text } from '../UI';
import { Layout } from '../widgets/App';

const Setting: FC = () => {
  return (
    <Layout>
      <Text>Настройки</Text>
    </Layout>
  );
};

export default memo(Setting);
