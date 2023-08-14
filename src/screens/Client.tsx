import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { FlatList, Linking, StyleSheet } from 'react-native';
import { where } from 'firebase/firestore';

import { Card, Flex, Gap, List, Text, Title } from '../UI';
import { IScreen, colors } from '../shared';
import { Layout } from '../widgets/App';
import { AddClientModal, IClient, useClients } from '../widgets/Clients';
import { OrderItem, useOrders } from '../widgets/Orders';

const mKey = 'one_client_modal';

const Client: FC<IScreen> = ({ route }) => {
  // @ts-ignore
  const clientId: string = route.params?.id ?? '';

  const { onGetClients, setClientModalVisible, clientLoading } = useClients();
  const { orders: ordersData } = useOrders();

  const [client, setClient] = useState<IClient | null>(null);
  const orders = ordersData.filter((el) => el.clientUid === clientId);

  const onGetClient = useCallback(async () => {
    if (clientId.length > 0) {
      const res = await onGetClients([where('uid', '==', clientId)], 10, false);
      res.count > 0 && setClient(res.result[0]);
    }
  }, [clientId]);

  const onOpenContact = useCallback(async () => {
    if (client?.contacts) {
      const canOpen = await Linking.canOpenURL(client?.contacts);
      if (canOpen) {
        const url = 'tel:' + client?.contacts;
        await Linking.openURL(url);
      }
    }
  }, [client?.contacts]);

  useEffect(() => {
    onGetClient();

    return () => {
      setClientModalVisible('');
    };
  }, []);

  return (
    <Layout>
      <Gap y={5} />
      <AddClientModal mKey={mKey} disabledBtn={clientLoading} client={client} />
      <Gap y={5} />

      <List
        emptyText='Данный клиент еще ничего не заказывал'
        loadingText='Ищем такого клиента...'
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              {client?.name} {client?.lastname}
            </Text>
            <Gap y={7} />
            <Title size='small' onPress={onOpenContact} textAlign='left'>
              {client?.contacts}
            </Title>
            <Gap y={7} />
            <Flex justify='space-around'>
              <Title>Заказы</Title>
            </Flex>
            <Gap y={7} />
          </>
        }
        scrollEnabled
        scrollsToTop
        data={orders}
        ItemSeparatorComponent={() => <Gap y={7} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <OrderItem order={item} />}
        keyExtractor={(item) => item.uid}
        loading={clientLoading}
        onRefresh={onGetClient}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 12,
  },
  summaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonsContainer: {
    gap: 8,
    flexDirection: 'row',
    marginTop: 12,
  },
  btn: {
    padding: 10,
    borderRadius: 100,
  },
  successBtn: {
    backgroundColor: colors.green,
  },
  deleteBtn: {
    backgroundColor: colors.red,
  },
  rebuyBtn: {
    backgroundColor: colors.orange,
  },
});

export default memo(Client);
