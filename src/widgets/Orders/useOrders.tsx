import { useState } from 'react';
import { where } from 'firebase/firestore';

import { useActions, useFirestore, useTypedSelector } from '../../shared';
import { IOrder } from './types';

export const useOrders = () => {
  const { orders, count: maxCount } = useTypedSelector((s) => s.orders);
  const { action } = useActions();
  const fbOrder = useFirestore('zefirka-orders');
  const [loading, setLoading] = useState<boolean>(false);

  const sortedOrders = ([...orders] as IOrder[]).sort(
    (a, b) => a.dealAt - b.dealAt
  );

  const onGetOrders = async (clientUid: string | string[]): Promise<void> => {
    try {
      setLoading(true);
      const isArray = Array.isArray(clientUid);
      const curWhere = isArray
        ? where('clientUid', 'in', clientUid)
        : where('clientUid', '==', clientUid);

      const curOrders = await fbOrder.getAll(
        [curWhere],
        isArray ? 10 * clientUid.length : 10
      );

      curOrders?.count > 0 && action?.setOrdersAC?.(curOrders);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onGetNeareastOrder = async (): Promise<IOrder | undefined> => {
    try {
      setLoading(true);

      const curOrders = await fbOrder.get<IOrder>(
        'isDone',
        '==',
        false,
        'dealAt'
      );
      return curOrders[0];
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onAddOrder = async (clientUid: string, data: IOrder): Promise<void> => {
    try {
      setLoading(true);
      const uid = await fbOrder.addWithId(data);
      action.addOrderAC({ ...data, uid, clientUid });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onUpdateOrder = async (data: IOrder): Promise<void> => {
    try {
      setLoading(true);
      await fbOrder.update(data.uid, data);
      action.updateOrderAC(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onDeleteOrder = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      await fbOrder.remove(id);
      action.deleteOrderAC(id);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    maxCount,
    orders: sortedOrders,
    orderLoading: loading,
    onGetOrders,
    onAddOrder,
    onUpdateOrder,
    onDeleteOrder,
    onGetNeareastOrder,
  };
};
