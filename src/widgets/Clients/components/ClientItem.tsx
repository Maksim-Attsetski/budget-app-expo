import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IClient } from '../types';
import { Button, Card, Gap, Text, Title } from '../../../UI';
import { colors, dateHelper } from '../../../shared';
import { Svg } from '../../../../assets';

import { routes } from '../../App/types';
import { useOrders } from '../../Orders';
import { useClients } from '../useClients';

interface IProps {
  item: IClient;
  orderLoading?: boolean;
}

const ClientItem: FC<IProps> = ({ item, orderLoading = false }) => {
  const { onDeleteClient } = useClients();
  const { navigate } = useNavigation();
  const { orders: data, onDeleteOrder } = useOrders();

  const orders = data.filter((el) => el.clientUid === item.uid);
  const harOrder = orders.find((el) => !el.isDone);

  const onClickDelete = async (): Promise<void> => {
    await onDeleteClient(item.uid);
    orders.forEach(async (order) => {
      await onDeleteOrder(order.uid);
    });
  };

  return (
    <Card style={styles.container}>
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigate(routes.client, { id: item.uid })}
      >
        <>
          <Title textAlign='left'>
            {item.name} {item.lastname}
          </Title>
          <Gap y={3} />
          <Text>Контакты: {item.contacts}</Text>
          <Gap y={3} />
          {orderLoading ? (
            <Text>Ищем заказы...</Text>
          ) : harOrder ? (
            <>
              <Text>Ближайший заказ:</Text>
              <Text> {dateHelper.getBeautifulDate(harOrder.dealAt)}</Text>
            </>
          ) : (
            <Text>Нет активных заказов</Text>
          )}
        </>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <Button onPress={onClickDelete} style={[styles.deleteBtn, styles.btn]}>
          <Svg.remove stroke={colors?.whiteBlock} />
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  buttonsContainer: {
    gap: 8,
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    borderRadius: 100,
  },
  successBtn: {
    backgroundColor: colors?.green,
  },
  deleteBtn: {
    backgroundColor: colors?.red,
  },
  rebuyBtn: {
    backgroundColor: colors?.orange,
  },
});

export default memo(ClientItem);
