import { useState, useMemo, memo } from 'react';
import { View } from 'react-native';

import { colors } from '../shared';
import { Layout } from '../widgets/App';
import { IBudget, ProgressChart } from '../widgets/Budget';
import { Button } from '../UI';

const HomeScreen = ({ navigation }) => {
  const [budget, setBudget] = useState<IBudget[]>([
    { id: 1, type: 'dec', value: 23, date: Date.now() },
    { id: 2, type: 'dec', value: 10, date: Date.now() },
    { id: 3, type: 'dec', value: 15, date: Date.now() },
    { id: 4, type: 'inc', value: 37, date: Date.now() },
  ]);

  const chartData = useMemo(() => {
    const inc = budget.reduce(
      (acc, cur) => (cur.type === 'inc' ? acc + cur.value : acc),
      0
    );
    const dec = budget.reduce(
      (acc, cur) => (cur.type === 'dec' ? acc + cur.value : acc),
      0
    );

    const total = inc + dec;

    const data = {
      first: {
        color: colors.purple,
        value: (inc / total) * 100,
        title: 'Доходы',
      },
      second: {
        color: colors.dark,
        value: (dec / total) * 100,
        title: 'Расходы',
      },
    };

    return data;
  }, [budget]);
  return (
    <Layout>
      <View>
        <ProgressChart data={chartData} />
        {/* <BudgetForm /> */}

        <Button onPress={() => navigation.navigate('Details')}>
          To details
        </Button>
      </View>
    </Layout>
  );
};

export default memo(HomeScreen);
