import React, { FC, memo } from 'react';
import { Share } from 'react-native';

import { Button, Gap, LineChart, PieChart, Text } from '../UI';
import { Layout } from '../widgets/App';
import { colors, screen } from '../shared';
import { IBudget, useBudget } from '../widgets/Budget';

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

  return (
    <Layout>
      <Text>Stats</Text>
      <Button onPress={onShare}>share</Button>
      <Gap y={10} />
      <LineChart
        lines={[
          {
            color: colors.green,
            data: [10, 20, 45, 30, 55],
            label: 'Доходы',
          },
          {
            color: colors.purple,
            data: [5, 10, 25, 10, 15],
            label: 'Расходы',
          },
        ]}
        filled
        width={screen.width - 20}
        title='Доходы и расходы'
      />
      <PieChart
        data={[
          { value: 60, color: colors.green, label: 'Доходы' },
          { value: 20, color: colors.red, label: 'Прочее' },
          { value: 20, color: colors.purple, label: 'Расходы' },
        ]}
      />
    </Layout>
  );
};

export default memo(Stats);
