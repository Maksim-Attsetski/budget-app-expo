import React, { FC, memo } from 'react';
import { Alert } from 'react-native';

import { Gap } from '../UI';
import { ListWithInput } from '../shared';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';

const Clients: FC = () => {
  const { clients, onGetClients, clientLoading, onSearchClients } =
    useClients();
  const { orderLoading, onGetOrders } = useOrders();

  const onRefresh = async (): Promise<void> => {
    const clients = await onGetClients();
    clients.result?.length > 0 &&
      (await onGetOrders(clients.result?.map((el) => el.uid)));
  };

  const onSearch = async (query: string): Promise<void> => {
    try {
      const clients = await onSearchClients(query, true, 50);

      clients.result?.length > 0 &&
        (await onGetOrders(clients.result?.map((el) => el.uid)));
    } catch (error) {
      Alert.alert('Ошибка', error?.message);
    }
  };

  return (
    <Layout headerProps={{ children: 'Клиенты' }}>
      <Gap y={5} />
      <AddClientModal mKey='clients_page_modal' />
      <Gap y={5} />
      <ListWithInput
        data={clients}
        renderItem={(item) => (
          <ClientItem orderLoading={orderLoading} item={item} />
        )}
        onSearch={onSearch}
        inputPlaceholder='Введите имя пользователя'
        loading={clientLoading}
        onRefresh={onRefresh}
        limitForInput={2}
      />
    </Layout>
  );
};

export default memo(Clients);
