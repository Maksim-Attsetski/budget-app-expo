import { useMemo, memo, FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { IScreen, colors } from '../shared';
import { Layout } from '../widgets/App';
import { ProgressChart, useBudget } from '../widgets/Budget';
import { Text, Card, Gap, Flex, Button } from '../UI';
import { useClients } from '../widgets/Clients';
import { routes } from '../widgets/App/types';
import { useOrders } from '../widgets/Orders';

const HomeScreen: FC<IScreen> = ({ navigation }) => {
  const { budget } = useBudget();
  const { clients } = useClients();
  const { orders } = useOrders();

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

  const nearestOrder = orders[0] || null;

  const onPressOrder = () => {
    // @ts-ignore
    navigation.navigate(routes.client, { id: clients[0].id });
  };

  const onPressActivity = () => {
    // @ts-ignore
    navigation.navigate(routes.history);
  };

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <Flex justify='space-between'>
          {clients.length > 0 && nearestOrder && (
            <Card style={{ position: 'relative' }}>
              <Button style={styles.layer} onPress={onPressOrder} />
              <Text>Ближайший заказ</Text>
              <Gap y={7} />
              <Flex>
                <Text style={{ color: colors.green }}>
                  +{nearestOrder.price} р.
                </Text>
                <Text>
                  {new Date(nearestOrder.dealAt).toLocaleDateString('ru-RU')}
                </Text>
              </Flex>
            </Card>
          )}
          {budget[0] && (
            <Card style={{ position: 'relative' }}>
              <Button style={styles.layer} onPress={onPressActivity} />

              <Text style={{ textAlign: 'center' }}>Активность</Text>
              <Gap y={5} />
              <Text
                style={{
                  color:
                    budget[0].type === 'inc' ? colors.green : colors.purple,
                  textAlign: 'center',
                  fontSize: 22,
                }}
              >
                {budget[0].type === 'inc' ? '+' : '-'} {budget[0].value} р.
              </Text>
            </Card>
          )}
        </Flex>
      </ScrollView>
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
