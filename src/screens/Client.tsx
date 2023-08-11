import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { where } from 'firebase/firestore';

import { Button, Card, Flex, Gap, Text } from '../UI';
import { IScreen, colors, dateHelper } from '../shared';
import { Layout } from '../widgets/App';
import { AddClientModal, IClient, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';

const Client: FC<IScreen> = ({ route }) => {
  // @ts-ignore
  const clientId: string = route.params?.id ?? '';

  const { setClientModalVisible, onGetClients } = useClients();
  const { orders: ordersData } = useOrders();

  const [client, setClient] = useState<IClient | null>(null);
  const orders = ordersData.filter((el) => el.clientUid === clientId);

  const onGetClient = useCallback(async () => {
    if (clientId.length > 0) {
      const res = await onGetClients([where('uid', '==', clientId)], 10, false);
      res.count > 0 && setClient(res.result[0]);
    }
  }, [clientId]);

  useEffect(() => {
    onGetClient();
  }, []);

  return (
    <>
      <AddClientModal />
      <Layout>
        <View>
          <Text>{clientId ?? 'ffff'}</Text>
        </View>
        {client && (
          <View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.title}>
                {client.name} {client.lastname}
              </Text>
            </View>
            {/* <View style={{ flexDirection: 'column' }}>
              <Text style={styles.contacts}>{client.contacts}</Text>
            </View> */}
            <Gap y={7} />
            <Flex justify='space-around'>
              <Button
                textProps={{ style: { fontSize: 20 } }}
                onPress={() => setClientModalVisible(client)}
              >
                Добавить заказ
              </Button>
              <Text style={{ fontSize: 20 }}>Заказы</Text>
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
            />
          </View>
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
});

export default memo(Client);
