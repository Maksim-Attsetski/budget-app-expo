import { useActions, useTypedSelector } from '../../shared';
import { IClient } from './types';

const getNum = ({ status }: IClient) => {
  if (status === 'wait') return 1;
  return 0;
};

export const useClients = () => {
  const { clients } = useTypedSelector((s) => s.clients);
  const { action } = useActions();

  const sortedClients = [...clients].sort((a, b) => getNum(b) - getNum(a));

  const onGetClients = async () => {};

  const onAddClient = async (
    data: IClient,
    alreadySuccess: boolean = false
  ) => {
    const newClient: IClient = {
      ...data,
      id: Date.now().toString(),
      status: alreadySuccess ? 'success' : 'wait',
    };
    action.addClientAC(newClient);
  };

  const onUpdateClient = async (data: IClient) => {
    action.updateClientAC(data);
  };

  const onDeleteClient = async (id: string) => {
    action.deleteClientAC(id);
  };

  return {
    clients: sortedClients,
    onGetClients,
    onAddClient,
    onUpdateClient,
    onDeleteClient,
  };
};
