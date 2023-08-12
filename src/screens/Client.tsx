import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { where } from 'firebase/firestore';

import { Card, Flex, Gap, Text } from '../UI';
import { IScreen, colors, dateHelper } from '../shared';
import { Layout } from '../widgets/App';
import { AddClientModal, IClient, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';

const Client: FC<IScreen> = ({ route }) => {
  // @ts-ignore
  const clientId: string = route.params?.id ?? '';

  const { onGetClients, setClientModalVisible, clientLoading } = useClients();
  const { orders: ordersData, onGetOrders, orderLoading } = useOrders();

  const [client, setClient] = useState<IClient | null>(null);
  const orders = ordersData.filter((el) => el.clientUid === clientId);

  const onGetClient = useCallback(async () => {
    if (clientId.length > 0) {
      const res = await onGetClients([where('uid', '==', clientId)], 10, false);
      res.count > 0 && setClient(res.result[0]);
      await onGetOrders(clientId);
    }
  }, [clientId]);

  useEffect(() => {
    onGetClient();

    return () => {
      setClientModalVisible('');
    };
  }, []);

  return (
    <Layout>
      <Gap y={5} />
      <AddClientModal
        mKey='one_client_modal'
        disabledBtn={clientLoading}
        client={client}
      />
      {clientLoading ? (
        <>
          <Gap y={10} />
          <Card
            loading
            style={{ maxHeight: 370 }}
            rows={5}
            rowHeight={50}
            loadingText='Ищем такого клиента...'
          />
        </>
      ) : client ? (
        <>
          <FlatList
            ListHeaderComponent={
              <>
                <Text style={styles.title}>
                  {client.name} {client.lastname}
                </Text>
                <Text style={styles.contacts}>{client.contacts}</Text>
                <Gap y={7} />
                <Flex justify='space-around'>
                  <Text style={styles.subTitle}>Заказы</Text>
                </Flex>
                <Gap y={7} />
              </>
            }
            scrollEnabled
            scrollsToTop
            nestedScrollEnabled
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
            refreshing={orderLoading}
            onRefresh={onGetClient}
            ListEmptyComponent={<Text>Пока не было заказов</Text>}
          />
        </>
      ) : (
        <Text>Клиент не найден</Text>
      )}
    </Layout>
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
