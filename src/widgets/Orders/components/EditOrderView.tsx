import React, { Dispatch, FC, SetStateAction, memo, useState } from 'react';

import { AccentButton, Card, DatePicker, Gap, Input, Title } from '../../../UI';
import { useOrders } from '../useOrders';
import { IOrder } from '../types';
import { Alert } from 'react-native';

interface IProps {
  order?: IOrder;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditOrderView: FC<IProps> = ({ setIsEdit, order }) => {
  const { onUpdateOrder, orderLoading } = useOrders();

  const [description, setDescription] = useState<string>(
    order?.description ?? ''
  );
  const [price, setPrice] = useState<string>('' + order?.price ?? '0');
  const [date, setDate] = useState<Date>(new Date(order?.dealAt));

  const onSave = async (): Promise<void> => {
    if (order?.uid) {
      const dealAt = date.getTime();
      const isNeedUpdate =
        order.dealAt !== dealAt ||
        order.description !== description ||
        +price !== order.price;

      if (isNaN(+price)) {
        return Alert.alert(
          'Введите цену правильно',
          'Разрешено использовать только цифры от 0 до 9'
        );
      }

      isNeedUpdate &&
        (await onUpdateOrder({
          uid: order?.uid,
          isDone: false,
          dealAt,
          price: +price,
          description,
        } as IOrder));
      setIsEdit(false);
    }
  };

  return (
    <Card
      loading={orderLoading}
      style={{
        maxHeight: orderLoading ? 130 : '100%',
      }}
    >
      <Input
        setValue={setPrice}
        value={price}
        placeholder='Цена'
        onFocus={(e) => e.stopPropagation()}
        keyboardType='number-pad'
      />
      <Gap y={7} />
      <Input
        onFocus={(e) => e.stopPropagation()}
        setValue={setDescription}
        value={description}
        placeholder='Описание'
        multiline
      />
      <Gap y={7} />
      <DatePicker date={date} setDate={setDate} />
      <Gap y={7} />
      <AccentButton onPress={onSave}>Сохранить</AccentButton>
    </Card>
  );
};

export default memo(EditOrderView);
