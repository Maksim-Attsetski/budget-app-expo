import { useActions, useFirestore, useTypedSelector } from '../../shared';
import { IClient, defaultClient } from './types';

export const useClients = () => {
  const { clients, addClientModalvisible, modalDefaultProps } =
    useTypedSelector((s) => s.clients);
  const { action } = useActions();
  const fbClient = useFirestore('zefirka-clients');

  const onGetClients = async () => {
    const curClients = await fbClient.getAll([], 10);

    curClients.count > 0 && action.setClientsAC(curClients.result);
  };

  const onAddClient = async (data: IClient) => {
    const uid = await fbClient.addWithId(data);
    action.addClientAC({ ...data, uid });
  };

  const onUpdateClient = async (data: IClient) => {
    await fbClient.update(data.uid, data);
    action.updateClientAC(data);
  };

  const onDeleteClient = async (id: string) => {
    await fbClient.remove(id);
    action.deleteClientAC(id);
  };

  const setClientModalVisible = (props: IClient = null) => {
    action.setClientsModalVisibleAC(props || defaultClient);
  };

  const resetModalProps = () => {
    action.setClientsModalPropsAC(defaultClient);
  };

  return {
    clients,
    onGetClients,
    onAddClient,
    onUpdateClient,
    onDeleteClient,
    setClientModalVisible,
    addClientModalvisible,
    modalDefaultProps,
    resetModalProps,
  };
};
