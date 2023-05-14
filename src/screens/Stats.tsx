import React, { FC, memo } from 'react';
import { Share } from 'react-native';

import { Button, Text } from '../UI';
import { Layout } from '../widgets/App';

const Stats: FC = () => {
  const onShare = async () => {
    const link =
      'exp://u.expo.dev/a61b36bd-16b9-4006-8290-e61ab62f0f45?channel-name=preview&runtime-version=1.0.0';

    await Share.share({
      message: link,
      url: link,
    });
  };
  return (
    <Layout>
      <Text>Stats</Text>
      <Button onPress={onShare}>share</Button>
    </Layout>
  );
};

export default memo(Stats);
