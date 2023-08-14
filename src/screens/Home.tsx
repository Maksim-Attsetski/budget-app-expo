import { useMemo, memo, FC, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { IScreen, colors } from '../shared';
import { Layout } from '../widgets/App';
import { ProgressChart, useBudget } from '../widgets/Budget';
import { Text, Card, Gap, Flex, Button, Title } from '../UI';
import { routes } from '../widgets/App/types';
import { NearestOrder, OrderPerWeek } from '../widgets/Orders';

const HomeScreen: FC<IScreen> = ({ navigation }) => {
  const { budget, setBudget, budgetLoading } = useBudget();

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

  const onPressActivity = () => {
    // @ts-ignore
    navigation.navigate(routes.history);
  };

  useEffect(() => {
    setBudget();
  }, []);

  return (
    <Layout>
      <OrderPerWeek />
      <FlatList
        data={[]}
        renderItem={() => <></>}
        showsVerticalScrollIndicator={false}
        onRefresh={setBudget}
        refreshing={budgetLoading}
        ListHeaderComponent={
          <>
            <Gap y={5} />
            <Card loading={budgetLoading} style={{ maxHeight: 130 }}>
              <Flex justify='space-evenly'>
                <Text style={styles.profitText}>Доход: {inc} р.</Text>
                <Text style={styles.lossText}>Расходы: {dec} р.</Text>
              </Flex>
              <Gap y={10} />
              <Flex justify='center'>
                <Text style={styles.boldText}>
                  Чистая прибыль: {inc - dec} р.
                </Text>
              </Flex>
            </Card>
            <Gap y={7} />
            <Card
              loading={budgetLoading}
              style={{ maxHeight: budgetLoading ? 330 : '100%' }}
              rows={3}
              rowHeight={90}
            >
              <ProgressChart data={chartData} />
            </Card>
            <Gap y={7} />
            <Flex justify='space-between'>
              <NearestOrder />
              {budget[0] && (
                <Card style={{ position: 'relative', width: '100%' }}>
                  <Button style={styles.layer} onPress={onPressActivity} />
                  <Title size='small' textAlign='left'>
                    Последняя активность
                  </Title>
                  <Gap y={5} />
                  <Title
                    size='small'
                    style={{
                      color:
                        budget[0].type === 'inc' ? colors.green : colors.purple,
                    }}
                  >
                    {budget[0].type === 'inc' ? '+' : '-'} {budget[0].value} р.
                  </Title>
                </Card>
              )}
            </Flex>
          </>
        }
      />
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
  layer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
});

export default memo(HomeScreen);
