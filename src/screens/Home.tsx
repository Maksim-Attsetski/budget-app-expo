import { useMemo, memo } from 'react';
import { StyleSheet } from 'react-native';

import { colors } from '../shared';
import { Layout } from '../widgets/App';
import { ProgressChart, useBudget } from '../widgets/Budget';
import { Text, Card, Gap, Flex, Button } from '../UI';

const HomeScreen = () => {
  const { budget } = useBudget();

  const inc: number = budget.reduce(
    (acc, cur) => (cur.type === 'inc' ? acc + cur.value : acc),
    0
  );
  const dec: number = budget.reduce(
    (acc, cur) => (cur.type === 'dec' ? acc + cur.value : acc),
    0
  );

  const chartData = useMemo(() => {
    const total = inc + dec;

    const incValue = (inc / total) * 100;
    const decValue = (dec / total) * 100;

    const data = {
      first: {
        color: colors.green,
        value: incValue || 0,
        title: 'Доходы',
      },
      second: {
        color: colors.purple,
        value: decValue || 0,
        title: 'Расходы',
      },
    };

    return data;
  }, [inc, dec]);

  return (
    <Layout>
      <Gap y={5} />
      <Card>
        <Flex justify='space-evenly'>
          <Text style={styles.profitText}>Доход: {inc} р.</Text>
          <Text style={styles.lossText}>Расходы: {dec} р.</Text>
        </Flex>
        <Gap y={10} />
        <Flex justify='center'>
          <Text style={styles.boldText}>Чистая прибыль: {inc - dec} р.</Text>
        </Flex>
      </Card>
      <Gap y={7} />
      <Card>
        <ProgressChart data={chartData} />
      </Card>
      <Gap y={7} />
      {budget[0] && (
        <Card>
          <Text style={{ textAlign: 'center' }}>Недавняя активнось</Text>
          <Gap y={5} />
          <Text>Цена: {budget[0].value} р.</Text>
          <Gap y={5} />
          <Text>Тип: {budget[0].type === 'inc' ? 'Доход' : 'Расходы'}</Text>

          {budget[0].description && (
            <>
              <Gap y={5} />
              <Text>Описание: {budget[0].description}</Text>
            </>
          )}
        </Card>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    padding: 20,
    backgroundColor: colors.darkBlock,
    borderRadius: 20,
    marginVertical: 20,
  },
  boldText: {
    fontSize: 20,
  },
  profitText: {
    fontSize: 22,
    color: colors.green,
    fontWeight: 'bold',
  },
  lossText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.purple,
  },
});

export default memo(HomeScreen);
