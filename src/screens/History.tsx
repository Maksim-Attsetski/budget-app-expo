import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { Text } from '../UI';
import { Layout } from '../widgets/App';

const History: FC = () => {
  return (
    <Layout>
      <View>
        <Text>History</Text>
      </View>
    </Layout>
  );
};

export default memo(History);
