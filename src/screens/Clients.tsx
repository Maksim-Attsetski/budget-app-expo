import React, { FC, memo, useEffect } from 'react';

import { Gap } from '../UI';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';
import { ListWithInput } from '../shared';

const Clients: FC = () => {
  const { clients, onGetClients, clientLoading } = useClients();
  const { onGetOrders, orderLoading } = useOrders();

  useEffect(() => {
    if (clients && clients?.length > 0) {
      onGetOrders(clients.map((el) => el.uid));
    }
  }, [clients]);

  return (
    <Layout>
      <>
        <>
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
            onRefresh={onGetClients}
            limitForInput={2}
          />
        </>
      </>
    </Layout>
  );
};

export default memo(Clients);
