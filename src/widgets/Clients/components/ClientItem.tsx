import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, Card, Gap, Text } from '../../../UI';
import { IClient } from '../types';
import DeleteSvg from '../../../../assets/DeleteSvg';
import { colors, dateHelper } from '../../../shared';
import SuccessSvg from '../../../../assets/SuccessSvg';
import { useClients } from '../useClients';
import { routes } from '../../App/types';
import RebuySvg from '../../../../assets/RebuySvg';

interface IProps {
  item: IClient;
}

const ClientItem: FC<IProps> = ({ item }) => {
  const { onDeleteClient, setClientModalVisible } = useClients();
  const { navigate } = useNavigation();

  const onPressRebuy = () => {
    setClientModalVisible({ ...item });
  };

  const harOrder = item.orders.some((el) => el.status === 'wait');

  return (
    <Card style={styles.container}>
      {/* @ts-ignore */}
      <Button onPress={() => navigate(routes.client, { id: item.id })}>
        <Text style={styles.title}>
          {item.name} {item.lastname}
        </Text>
        <Text>Контакты: {item.contacts}</Text>
        {/* <Gap y={7} /> */}
        {item.orders[0] && item.orders[0].status === 'wait' ? (
          <>
            <Text>Ближайший заказ:</Text>
            <Text> {dateHelper.getBeautifulDate(item.orders[0].dealAt)}</Text>
          </>
        ) : (
          <Text>Нет активных заказов</Text>
        )}
      </Button>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => onDeleteClient(item.id)}
          style={[styles.deleteBtn, styles.btn]}
        >
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
          <Button onPress={onPressRebuy} style={[styles.rebuyBtn, styles.btn]}>
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
    position: 'relative',
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
