import React, { FC, memo, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Card, Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';

const Clients: FC = () => {
  const { clients, onGetClients, setClientModalVisible, clientLoading } =
    useClients();
  const { onGetOrders, orderLoading } = useOrders();

  useEffect(() => {
    setClientModalVisible('');
    onGetClients();
  }, []);

  useEffect(() => {
    if (clients && clients?.length > 0) {
      onGetOrders(clients.map((el) => el.uid));
    }
  }, [clients]);

  return (
    <Layout>
      <Gap y={5} />
      <AddClientModal mKey='clients_page_modal' />
      <Gap y={5} />
      {clientLoading ? (
        <FlatList
          data={[1, 2]}
          renderItem={({ item }) => (
            <Card style={{ maxHeight: 130 }} key={item} loading />
          )}
          ItemSeparatorComponent={() => <Gap y={7} />}
          showsVerticalScrollIndicator={false}
          refreshing
          onRefresh={() => {}}
        />
      ) : (
        <FlatList
          scrollEnabled
          data={clients}
          renderItem={({ item }) => (
            <ClientItem orderLoading={orderLoading} item={item} />
          )}
          ItemSeparatorComponent={() => <Gap y={7} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>Ещё нет клиентов</Text>}
          refreshing={clientLoading}
          onRefresh={onGetClients}
        />
      )}
    </Layout>
  );
};

export default memo(Clients);
