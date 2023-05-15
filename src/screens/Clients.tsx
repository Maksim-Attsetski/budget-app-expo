import React, { FC, memo } from 'react';
import { FlatList } from 'react-native';

import { Button, Gap } from '../UI';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';

const Clients: FC = () => {
  const { clients, setClientModalVisible } = useClients();

  return (
    <Layout>
      <Gap y={5} />
      <Button onPress={() => setClientModalVisible()}>Добавить клиента</Button>
      <Gap y={5} />
      <AddClientModal />
      <Gap y={5} />
      <FlatList
        data={clients}
        ItemSeparatorComponent={() => <Gap y={7} />}
        renderItem={({ item }) => <ClientItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
      <Gap y={45} />
    </Layout>
  );
};

export default memo(Clients);
