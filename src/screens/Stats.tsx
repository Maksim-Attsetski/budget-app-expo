import React, { FC, memo } from 'react';
import { Share, View } from 'react-native';

import { Button, Gap, LineChart, Text } from '../UI';
import { Layout } from '../widgets/App';
import { colors, screen } from '../shared';
import { IBudget, useBudget } from '../widgets/Budget';

const data = [50, 30, 40, 95, 85, 91];
const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

const Stats: FC = () => {
  const { budget } = useBudget();

  const onShare = async () => {
    const link =
      'exp://u.expo.dev/a61b36bd-16b9-4006-8290-e61ab62f0f45?channel-name=preview&runtime-version=1.0.0';

    await Share.share({
      message: link,
      url: link,
    });
  };

  const chartIncData = (budget as IBudget[])
    .filter((el) => el.type === 'inc')
    .map((el) => el.value);

  const chartIncLabels: string[] = new Array(chartIncData.length).fill('');

  const chartDecData = (budget as IBudget[])
    .filter((el) => el.type === 'dec')
    .map((el) => el.value);

  const chartDecLabels: string[] = new Array(chartDecData.length).fill('');

  return (
    <Layout>
      <Text>Stats</Text>
      <Button onPress={onShare}>share</Button>
      <Gap y={10} />
      {chartIncData.length > 1 && (
        <LineChart
          data={chartIncData}
          labels={chartIncLabels}
          filled
          lineColor={colors.green}
          fillColor={colors.green}
          width={screen.width - 20}
          title='Доходы'
        />
      )}
      <Gap y={10} />
      {chartDecData.length > 1 && (
        <LineChart
          data={chartDecData}
          labels={chartDecLabels}
          filled
          lineColor={colors.purple}
          fillColor={colors.purple}
          width={screen.width - 20}
          title='Расходы'
        />
      )}
    </Layout>
  );
};

export default memo(Stats);
