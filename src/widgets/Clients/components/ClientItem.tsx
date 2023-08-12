import React, { FC, memo } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RebuySvg from '../../../../assets/RebuySvg';
import DeleteSvg from '../../../../assets/DeleteSvg';
import SuccessSvg from '../../../../assets/SuccessSvg';
import { IClient } from '../types';
import { routes } from '../../App/types';
import { useOrders } from '../../Orders';
import { useClients } from '../useClients';
import { Button, Card, Text } from '../../../UI';
import { colors, dateHelper } from '../../../shared';

interface IProps {
  item: IClient;
}

const ClientItem: FC<IProps> = ({ item }) => {
  const { onDeleteClient, setClientModalVisible } = useClients();
  const { navigate } = useNavigation();
  const { orders: data, onDeleteOrder } = useOrders();

  const orders = data.filter((el) => el.clientUid === item.uid);
  const harOrder = orders.some((el) => !el.isDone);

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
          {orders[0] && !orders[0].isDone ? (
            <>
              <Text>Ближайший заказ:</Text>
              <Text> {dateHelper.getBeautifulDate(orders[0].dealAt)}</Text>
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
        {harOrder ? (
          <Button
            // @ts-ignore
            onPress={() => navigate(routes.successDeal, { client: item })}
            style={[styles.successBtn, styles.btn]}
          >
            <SuccessSvg stroke={colors.whiteBlock} />
          </Button>
        ) : (
          <Button
            onPress={() => setClientModalVisible(true)}
            textColor={colors.whiteBlock}
            style={[styles.rebuyBtn, styles.btn]}
          >
            <RebuySvg stroke={colors.whiteBlock} />
          </Button>
        )}
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
