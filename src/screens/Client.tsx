import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { FlatList, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { where } from 'firebase/firestore';

import { Card, Empty, Flex, Gap, List, Skeleton, Text, Title } from '../UI';
import { IScreen, colors } from '../shared';
import { Layout } from '../widgets/App';
import { AddClientModal, IClient, useClients } from '../widgets/Clients';
import { IOrder, OrderItem, useOrders } from '../widgets/Orders';
import { Svg } from '../../assets';

const mKey = 'one_client_modal';

const Client: FC<IScreen> = ({ route, navigation }) => {
  // @ts-ignore
  const clientId: string = route.params?.id ?? '';

  const {
    clients,
    setClientModalVisible,
    clientLoading,
    onGetClients,
    onDeleteClient,
  } = useClients();
  const {
    orders: ordersData,
    onGetOrders,
    orderLoading,
    onDeleteOrder,
  } = useOrders();

  const [client, setClient] = useState<IClient | null>(null);
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onGetClient = useCallback((): void => {
    if (clientId.length > 0) {
      try {
        setLoading(true);

        const res = clients.find((item) => item.uid === clientId);
        const orders = ordersData.filter((el) => el.clientUid === clientId);
        res && setClient(res);
        setUserOrders(orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [clientId, ordersData]);

  const onRefresh = useCallback(async (): Promise<void> => {
    if (clientId.length > 0) {
      try {
        setLoading(true);
        const res = await onGetClients([where('uid', '==', clientId)]);
        res.result.length > 0 && setClient(res.result[0]);

        const orderResponse = await onGetOrders(clientId);
        setUserOrders(orderResponse.result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [clientId]);

  const onOpenContact = async (): Promise<void> => {
    if (client?.contacts) {
      const url = 'tel:' + client?.contacts;
      await Linking.openURL(url);
    }
  };

  const onDeleteUser = async (): Promise<void> => {
    if (client?.uid) {
      const notDoneOrders = userOrders
        .filter((order) => !order.isDone)
        .map((el) => onDeleteOrder(el.uid));

      await Promise.all([...notDoneOrders]);
      await onDeleteClient(client.uid);
      navigation.goBack();
    }
  };

  const allLoading = loading || clientLoading || orderLoading;
  const userName = client ? client?.name + ' ' + client?.lastname : '';

  useEffect(() => {
    onGetClient();

    return () => {
      setClientModalVisible('');
    };
  }, [clientId]);

  return (
    <Layout
      headerProps={{
        children: userName,
        right: (
          <TouchableOpacity onPress={onDeleteUser}>
            <Svg.remove stroke={colors.red} />
          </TouchableOpacity>
        ),
      }}
    >
      <Gap y={5} />
      <AddClientModal mKey={mKey} disabledBtn={clientLoading} client={client} />
      <Gap y={5} />

      <List
        emptyText='Данный клиент еще ничего не заказывал'
        loadingText='Ищем такого клиента...'
        ListHeaderComponent={
          <>
            {allLoading ? (
              <Skeleton rows={3} rowHeight={30} maxHeight={150} />
            ) : (
              <>
                <Text style={styles.title}>{userName}</Text>
                <Gap y={7} />
                <Title size='small' onPress={onOpenContact} textAlign='left'>
                  {client?.contacts}
                </Title>
              </>
            )}
            <Gap y={7} />
            <Flex justify='space-around'>
              <Title>Заказы</Title>
            </Flex>
            <Gap y={7} />
          </>
        }
        scrollEnabled
        scrollsToTop
        data={userOrders}
        ItemSeparatorComponent={() => <Gap y={7} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <OrderItem order={item} />}
        keyExtractor={(item) => item.uid}
        loading={clientLoading}
        onRefresh={onRefresh}
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
    backgroundColor: colors?.green,
  },
  deleteBtn: {
    backgroundColor: colors?.red,
  },
  rebuyBtn: {
    backgroundColor: colors?.orange,
  },
});

export default memo(Client);
