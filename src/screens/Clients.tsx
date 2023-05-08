import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { Text } from '../UI';
import { Layout } from '../widgets/App';

const Clients: FC = () => {
  return (
    <Layout>
      <View>
        <Text>Clients</Text>
      </View>
    </Layout>
  );
};

export default memo(Clients);
