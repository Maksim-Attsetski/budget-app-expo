import React, { FC, memo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import DeleteSvg from '../../../../assets/DeleteSvg';
import SuccessSvg from '../../../../assets/SuccessSvg';
import EditSvg from '../../../../assets/EditSvg';
import RebuySvg from '../../../../assets/RebuySvg';
import {
  Card,
  Gap,
  Button,
  Text,
  Title,
  DatePicker,
  AccentButton,
} from '../../../UI';
import { colors, dateHelper } from '../../../shared';
import { IOrder } from '../types';
import { useOrders } from '../useOrders';
import DealDateModal from './DealDateModal';
import EditOrderView from './EditOrderView';
import { routes } from '../../App/types';

interface IProps {
  order: IOrder;
}

const OrderItem: FC<IProps> = ({ order }) => {
  const { onDeleteOrder } = useOrders();
  const { navigate } = useNavigation();

  const dealDateSheetRef = useRef<BottomSheet>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onOpenDealDateModal = (): void => {
    dealDateSheetRef.current?.snapToIndex(0);
  };

  const onOpenEditModal = (): void => {
    setIsEdit(true);
  };

  return (
    <>
      {isEdit ? (
        <EditOrderView setIsEdit={setIsEdit} order={order} />
      ) : (
        <>
          <DealDateModal
            bottomSheetRef={dealDateSheetRef}
            initDate={order?.dealAt}
            orderUid={order?.uid}
          />
          <Card>
            <View style={styles.summaContainer}>
              <Title size='small'>Сумма:</Title>
              <Title
                size='small'
                style={{
                  color: !order.isDone ? colors.green : colors.purple,
                }}
              >
                {order.price > 0 ? order.price : 'Бесплатно'}
              </Title>
            </View>
            {order.description && (
              <>
                <Text>Описание:</Text>
                <Text> {order.description}</Text>
              </>
            )}
            <Gap y={7} />
            <Text>{dateHelper.getBeautifulDate(order.dealAt)}</Text>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={() => onDeleteOrder(order.uid)}
                style={[styles.deleteBtn, styles.btn]}
              >
                <DeleteSvg stroke={colors.whiteBlock} />
              </Button>
              {order?.isDone ? (
                <>
                  <Button
                    onPress={onOpenDealDateModal}
                    style={[styles.editBtn, styles.btn]}
                  >
                    <RebuySvg stroke={colors.whiteBlock} />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onPress={onOpenEditModal}
                    style={[styles.editBtn, styles.btn]}
                  >
                    <EditSvg stroke={colors.whiteBlock} />
                  </Button>
                  <Button
                    onPress={() =>
                      // @ts-ignore
                      navigate(routes.successDeal, {
                        client: order,
                        orderId: order.uid,
                      })
                    }
                    style={[styles.successBtn, styles.btn]}
                  >
                    <SuccessSvg stroke={colors.whiteBlock} />
                  </Button>
                </>
              )}
            </View>
          </Card>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 12,
  },
  summaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonsContainer: {
    gap: 8,
    flexDirection: 'row',
    marginTop: 12,
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
  editBtn: {
    backgroundColor: colors.orange,
  },
});

export default memo(OrderItem);
