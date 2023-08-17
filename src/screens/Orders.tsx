import React, { FC, memo, useCallback, useEffect } from 'react';
import { where } from 'firebase/firestore';

import { Layout } from '../widgets/App';
import { IScreen, ListWithInput } from '../shared';
import { IOrder, OrderItem, useOrders } from '../widgets/Orders';

const minDateDefault = new Date();
minDateDefault.setDate(1);
const maxDateDefault = new Date();
maxDateDefault.setDate(30);

const Orders: FC<IScreen> = ({ route }) => {
  const { onGetOrdersByQuery, orderLoading, orders } = useOrders();

  // @ts-ignore
  const from = route.params?.from ?? minDateDefault.getTime();
  // @ts-ignore
  const to = route.params?.to ?? maxDateDefault.getTime();

  const onCheckOrders = useCallback(async () => {
    if (from && to) {
      await onGetOrdersByQuery([
        where('dealAt', '>=', from),
        where('dealAt', '<=', to),
      ]);
    }
  }, [from, to]);

  useEffect(() => {
    onCheckOrders();
  }, []);

  return (
    <Layout>
      <ListWithInput
        data={orders}
        renderItem={(item: IOrder) => <OrderItem order={item} />}
        search={(data, query) =>
          data.filter((item: IOrder) => item.description.includes(query))
        }
        inputPlaceholder='Поиск по описанию'
        loading={orderLoading}
        onRefresh={onCheckOrders}
        emptyText='В данный период времени нет заказов'
        limitForInput={2}
      />
    </Layout>
  );
};

export default memo(Orders);
