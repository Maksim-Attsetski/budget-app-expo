import { useState } from 'react';
import { QueryFilterConstraint } from 'firebase/firestore';

import { useActions, useFirestore, useTypedSelector } from '../../shared';
import { IClient } from './types';

export const useClients = () => {
  const { clients, addClientModalKey } = useTypedSelector((s) => s.clients);
  const { action } = useActions();
  const fbClient = useFirestore('zefirka-clients');
  const [loading, setLoading] = useState<boolean>(false);

  const onGetClients = async (
    whereArr: QueryFilterConstraint[] = [],
    limitVal: number = 10,
    save: boolean = true
  ) => {
    try {
      setLoading(true);
      const curClients = await fbClient.getAll(whereArr, limitVal);

      curClients.count > 0 && save && action.setClientsAC(curClients.result);
      return curClients;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onSearchClients = async (
    query: string,
    save: boolean = false,
    limitVal: number = 10
  ) => {
    try {
      setLoading(true);
      const curClients = await fbClient.search(
        query,
        ['contacts', 'lastname', 'name'],
        limitVal
      );

      save && action.setClientsAC(curClients.result);
      return curClients;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onAddClient = async (data: IClient): Promise<string> => {
    try {
      setLoading(true);
      const newClient = { ...data, createdAt: Date.now() };
      const uid = await fbClient.addWithId(newClient);
      action.addClientAC({ ...newClient, uid });
      return uid;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onUpdateClient = async (data: IClient): Promise<void> => {
    try {
      setLoading(true);
      await fbClient.update(data.uid, data);
      action.updateClientAC(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onDeleteClient = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      await fbClient.remove(id);
      action.deleteClientAC(id);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const setClientModalVisible = (value?: string): void => {
    action.setClientsModalVisibleAC(value ?? '');
  };

  return {
    clients,
    addClientModalKey,
    clientLoading: loading,
    onGetClients,
    onAddClient,
    onUpdateClient,
    onDeleteClient,
    setClientModalVisible,
    onSearchClients,
  };
};
