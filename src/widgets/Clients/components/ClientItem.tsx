import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DeleteSvg from '../../../../assets/DeleteSvg';
import { IClient } from '../types';
import { routes } from '../../App/types';
import { useOrders } from '../../Orders';
import { useClients } from '../useClients';
import { Button, Card, Text } from '../../../UI';
import { colors, dateHelper } from '../../../shared';

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
          <Text style={styles.title}>
            {item.name} {item.lastname}
          </Text>
          <Text>Контакты: {item.contacts}</Text>
          <Text>
            создано: {new Date(item.createdAt)?.toLocaleDateString('ru')}
          </Text>
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
          <DeleteSvg stroke={colors.whiteBlock} />
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
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
    backgroundColor: colors.green,
  },
  deleteBtn: {
    backgroundColor: colors.red,
  },
  rebuyBtn: {
    backgroundColor: colors.orange,
  },
});

export default memo(ClientItem);
