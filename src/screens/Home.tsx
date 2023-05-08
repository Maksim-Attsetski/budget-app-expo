import { useMemo, memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../shared';
import { Layout } from '../widgets/App';
import { ProgressChart, useBudget } from '../widgets/Budget';
import { Text, Card, Gap } from '../UI';

const HomeScreen = ({ navigation }) => {
  const { budget } = useBudget();

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
        color: colors.green,
        value: (inc / total) * 100,
        title: 'Доходы',
      },
      second: {
        color: colors.purple,
        value: (dec / total) * 100,
        title: 'Расходы',
      },
    };

    return data;
  }, [budget]);

  return (
    <Layout>
      <View style={styles.chartContainer}>
        <ProgressChart data={chartData} />
      </View>
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
});

export default memo(HomeScreen);
