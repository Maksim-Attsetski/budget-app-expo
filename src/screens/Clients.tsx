import React, { FC, memo, useEffect } from 'react';
import { FlatList } from 'react-native';

import { Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';

const Clients: FC = () => {
  const { clients, onGetClients, setClientModalVisible } = useClients();
  const { onGetOrders } = useOrders();

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
      <FlatList
        data={[...clients]}
        ItemSeparatorComponent={() => <Gap y={7} />}
        renderItem={({ item }) => <ClientItem item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>Ещё нет клиентов</Text>}
      />
      <Gap y={45} />
    </Layout>
  );
};

export default memo(Clients);
