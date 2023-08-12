import { QueryFilterConstraint } from 'firebase/firestore';
import { useActions, useFirestore, useTypedSelector } from '../../shared';
import { IClient } from './types';

export const useClients = () => {
  const { clients, addClientModalvisible } = useTypedSelector((s) => s.clients);
  const { action } = useActions();
  const fbClient = useFirestore('zefirka-clients');

  const onGetClients = async (
    whereArr: QueryFilterConstraint[] = [],
    limitVal: number = 10,
    save: boolean = true
  ) => {
    const curClients = await fbClient.getAll(whereArr, limitVal);

    curClients.count > 0 && save && action.setClientsAC(curClients.result);
    return curClients;
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

  const setClientModalVisible = () => {
    action.setClientsModalVisibleAC();
  };

  return {
    clients,
    onGetClients,
    onAddClient,
    onUpdateClient,
    onDeleteClient,
    setClientModalVisible,
    addClientModalvisible,
  };
};
