import React, { FC, memo } from 'react';

import { Gap } from '../UI';
import { ListWithInput } from '../shared';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';

const Clients: FC = () => {
  const { clients, onGetClients, clientLoading } = useClients();
  const { orderLoading, onGetOrders } = useOrders();

  const onRefresh = async (): Promise<void> => {
    const clients = await onGetClients();
    clients.result?.length > 0 &&
      (await onGetOrders(clients.result?.map((el) => el.uid)));
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
        search={(arr, val) =>
          arr.filter((item) => (item.name + item.lastname).includes(val))
        }
        inputPlaceholder='Введите имя пользователя'
        loading={clientLoading}
        onRefresh={onRefresh}
        limitForInput={2}
      />
    </Layout>
  );
};

export default memo(Clients);
