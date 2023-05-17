import {
  storage,
  storageKeys,
  useActions,
  useTypedSelector,
} from '../../shared';
import { IClient, IClientOrder, defaultClient } from './types';

const getNum = ({ orders }: IClient) => {
  const filteredOrders = orders.filter((el) => el.status === 'wait');
  return filteredOrders.length > 0 ? 1 : 0;
};

export const useClients = () => {
  const { clients, addClientModalvisible, modalDefaultProps } =
    useTypedSelector((s) => s.clients);
  const { action } = useActions();

  const sortedClients = [...clients]
    .sort((a, b) => a.orders[0].dealAt - b.orders[0].dealAt)
    .sort((a, b) => getNum(b) - getNum(a));

  const onGetClients = async () => {
    const currentClients = await storage.get(storageKeys.clients);

    currentClients && action.setClientsAC(currentClients);
  };

  const onAddClient = async (data: IClient) => {
    const newClient: IClient = {
      ...data,
      id: Date.now().toString(),
    };

    const currentClients = [newClient, ...clients];

    await storage.set(storageKeys.clients, currentClients);
    action.setClientsAC(currentClients);
  };

  const onUpdateClient = async (data: IClient) => {
    const currentClients = [...clients].map((el) =>
      el.id === data.id ? { ...el, ...data } : el
    );

    await storage.set(storageKeys.clients, currentClients);
    action.setClientsAC(currentClients);
  };

  const onDeleteClient = async (id: string) => {
    const currentClients = clients.filter((el) => el.id !== id);

    await storage.set(storageKeys.clients, currentClients);
    action.setClientsAC(currentClients);
  };

  const setClientModalVisible = (props: IClient = null) => {
    action.setClientsModalVisibleAC(props || defaultClient);
  };

  const resetModalProps = () => {
    action.setClientsModalPropsAC(defaultClient);
  };

  const onAddOrder = (clientId: string, data: IClientOrder) => {
    const client = sortedClients.find((client) => client.id === clientId);

    if (client) {
      const newOrders = [
        { ...data, id: Date.now().toString(), createdAt: Date.now() },
        ...client.orders,
      ] as IClientOrder[];
      const orders = newOrders
        .sort((a, b) => a.dealAt - b.dealAt)
        .sort(
          (a, b) =>
            (b.status === 'wait' ? 1 : 0) - (a.status === 'wait' ? 1 : 0)
        );

      onUpdateClient({ id: client.id, orders } as IClient);
    }
  };

  return {
    clients: sortedClients,
    onGetClients,
    onAddClient,
    onUpdateClient,
    onDeleteClient,
    setClientModalVisible,
    addClientModalvisible,
    modalDefaultProps,
    resetModalProps,
    onAddOrder,
  };
};
