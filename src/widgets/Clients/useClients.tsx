import { useActions, useTypedSelector } from '../../shared';
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

  const onGetClients = async () => {};

  const onAddClient = async (data: IClient) => {
    const newClient: IClient = {
      ...data,
      id: Date.now().toString(),
    };
    action.addClientAC(newClient);
  };

  const onUpdateClient = async (data: IClient) => {
    action.updateClientAC(data);
  };

  const onDeleteClient = async (id: string) => {
    action.deleteClientAC(id);
  };

  const setClientModalVisible = (props?: IClient) => {
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
      const orders = newOrders.sort((a, b) => a.dealAt - b.dealAt);

      action.updateClientAC({ id: client.id, orders } as IClient);
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
