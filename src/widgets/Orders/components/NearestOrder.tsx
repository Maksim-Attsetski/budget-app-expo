import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, Text, Card, Gap, Flex, Title } from '../../../UI';
import { colors } from '../../../shared';
import { IOrder } from '../types';
import { useOrders } from '../useOrders';
import { routes } from '../../App/types';

const NearestOrder: FC = () => {
  const { onGetNeareastOrder, orderLoading } = useOrders();
  const { navigate } = useNavigation();

  const [nearestOrder, setNearestOrder] = useState<null | IOrder>(null);

  const onPressOrder = () => {
    if (nearestOrder.clientUid) {
      // @ts-ignore
      navigate(routes.client, { id: nearestOrder.clientUid });
    }
  };

  useEffect(() => {
    (async () => {
      const curOrder = await onGetNeareastOrder();
      curOrder && setNearestOrder(curOrder);
    })();
  }, []);

  return (
    <Card
      loading={orderLoading}
      loadingText='Ищем ближайший заказ'
      rowHeight={35}
      rows={3}
      style={{ position: 'relative', width: '100%', marginVertical: 3 }}
    >
      {nearestOrder ? (
        <>
          <Button style={StyleSheet.absoluteFill} onPress={onPressOrder} />
          <Title>Ближайший заказ</Title>
          <Gap y={7} />
          {nearestOrder?.description &&
            nearestOrder?.description.length > 0 && (
              <>
                <Text>Описание</Text>
                <Text> {nearestOrder?.description}</Text>
                <Gap y={7} />
              </>
            )}
          <Flex justify='space-between'>
            <Text style={{ color: colors?.green, fontSize: 22 }}>
              +{nearestOrder?.price} р.
            </Text>
            <Text>
              {new Date(nearestOrder?.dealAt).toLocaleDateString('ru-RU')}
            </Text>
          </Flex>
        </>
      ) : (
        <Text>У вас нет заказов</Text>
      )}
    </Card>
  );
};

export default memo(NearestOrder);
