import { where } from 'firebase/firestore';
import { useActions, useFirestore, useTypedSelector } from '../../shared';
import { IOrder } from './types';

export const useOrders = () => {
  const { orders, count: maxCount } = useTypedSelector((s) => s.orders);
  const { action } = useActions();
  const fbOrder = useFirestore('zefirka-orders');

  const sortedOrders = ([...orders] as IOrder[]).sort(
    (a, b) => a.dealAt - b.dealAt
  );

  const onGetOrders = async (clientUid: string | string[]): Promise<void> => {
    const isArray = Array.isArray(clientUid);
    const curWhere = isArray
      ? where('clientUid', 'in', clientUid)
      : where('clientUid', '==', clientUid);

    const curOrders = await fbOrder.getAll(
      [curWhere],
      isArray ? 10 * clientUid.length : 10
    );

    curOrders?.count > 0 && action?.setOrdersAC?.(curOrders);
  };

  const onAddOrder = async (clientUid: string, data: IOrder): Promise<void> => {
    const uid = await fbOrder.addWithId(data);
    action.addOrderAC({ ...data, uid, clientUid });
  };

  const onUpdateOrder = async (data: IOrder): Promise<void> => {
    await fbOrder.update(data.uid, data);
    action.updateOrderAC(data);
  };

  const onDeleteOrder = async (id: string): Promise<void> => {
    await fbOrder.remove(id);
    action.deleteOrderAC(id);
  };

  return {
    maxCount,
    orders: sortedOrders,
    onGetOrders,
    onAddOrder,
    onUpdateOrder,
    onDeleteOrder,
  };
};
