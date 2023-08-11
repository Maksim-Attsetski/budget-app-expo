import React, { FC, memo, useEffect } from 'react';
import { FlatList } from 'react-native';

import { Button, Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fbStore } from '../config';

const Clients: FC = () => {
  const { clients, setClientModalVisible } = useClients();

  useEffect(() => {
    (async () => {
      const q = query(
        collection(fbStore, 'price-list'),
        where('price', '>=', 20)
      );

      const querySnapshot = await getDocs(q);
      const result: any[] = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
      console.log('result => ', result);
    })();
  }, []);

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
        ListEmptyComponent={<Text>Ещё нет клиентов</Text>}
      />
      <Gap y={45} />
    </Layout>
  );
};

export default memo(Clients);
