import React, { FC, memo, useEffect } from 'react';
import { FlatList } from 'react-native';

import { Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';

const Clients: FC = () => {
  const { clients, setClientModalVisible, onGetClients } = useClients();

  useEffect(() => {
    onGetClients();
  }, []);

  return (
    <Layout>
      <Gap y={5} />
      <Gap y={5} />
      <AddClientModal />
      <Gap y={5} />
      <FlatList
        data={clients}
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
