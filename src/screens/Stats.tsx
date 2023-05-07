import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { Text } from '../UI';
import { Layout } from '../widgets/App';

const Stats: FC = () => {
  return (
    <Layout>
      <Text>Stats</Text>
    </Layout>
  );
};

export default memo(Stats);
