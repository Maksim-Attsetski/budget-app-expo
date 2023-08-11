import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { where } from 'firebase/firestore';

import { Card, Flex, Gap, Text } from '../UI';
import { IScreen, colors, dateHelper } from '../shared';
import { Layout } from '../widgets/App';
import { AddClientModal, IClient, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';

const Client: FC<IScreen> = ({ route }) => {
  // @ts-ignore
  const clientId: string = route.params?.id ?? '';

  const { onGetClients } = useClients();
  const { orders: ordersData, onGetOrders } = useOrders();

  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const orders = ordersData.filter((el) => el.clientUid === clientId);

  const onGetClient = useCallback(async () => {
    if (clientId.length > 0) {
      try {
        const res = await onGetClients(
          [where('uid', '==', clientId)],
          10,
          false
        );
        res.count > 0 && setClient(res.result[0]);
        await onGetOrders(clientId);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    onGetClient();
  }, []);

  return (
    <>
      <Layout>
        <Gap y={5} />
        <AddClientModal disabledBtn={loading} client={client} />
        {loading ? (
          <>
            <Gap y={10} />
            <Card>
              <Text>Ищем такого клиента...</Text>
            </Card>
          </>
        ) : client ? (
          <View>
            <Text style={styles.title}>
              {client.name} {client.lastname}
            </Text>
            <Text style={styles.contacts}>{client.contacts}</Text>
            <Gap y={7} />
            <Flex justify='space-around'>
              <Text style={styles.subTitle}>Заказы</Text>
            </Flex>
            <Gap y={7} />
            <FlatList
              scrollEnabled
              style={{ marginBottom: 100 }}
              data={orders}
              ItemSeparatorComponent={() => <Gap y={7} />}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Card key={item.uid}>
                  <View style={styles.summaContainer}>
                    <Text>Сумма:</Text>
                    <Text
                      style={{
                        color: item.isDone ? colors.green : colors.purple,
                      }}
                    >
                      {item.price}
                    </Text>
                  </View>
                  {item.description && (
                    <>
                      <Text>Описание:</Text>
                      <Text> {item.description}</Text>
                    </>
                  )}
                  <Gap y={7} />
                  <Text>{dateHelper.getBeautifulDate(item.dealAt)}</Text>
                </Card>
              )}
              ListEmptyComponent={<Text>Пока не было заказов</Text>}
            />
          </View>
        ) : (
          <Text>Клиент не найден</Text>
        )}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 12,
  },
  contacts: {
    fontSize: 20,
    marginVertical: 12,
  },
  summaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default memo(Client);
