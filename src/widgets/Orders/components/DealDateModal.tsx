import React, { FC, MutableRefObject, memo, useState } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheet from '@gorhom/bottom-sheet';

import { AccentButton, DatePicker, Gap, Title } from '../../../UI';
import { useOrders } from '../useOrders';
import { IOrder } from '../types';

interface IProps {
  bottomSheetRef: MutableRefObject<BottomSheetMethods>;
  initDate?: number;
  orderUid?: string;
}

const DealDateModal: FC<IProps> = ({
  bottomSheetRef,
  initDate = Date.now(),
  orderUid,
}) => {
  const { onUpdateOrder } = useOrders();
  const [date, setDate] = useState(new Date(initDate));

  const onChangeDealDate = async (): Promise<void> => {
    if (orderUid) {
      await onUpdateOrder({
        uid: orderUid,
        dealAt: date.getTime(),
        isDone: false,
      } as IOrder);
    }
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['100%']}
      containerStyle={{ zIndex: 2 }}
      enablePanDownToClose
      onClose={() => {}}
      style={{ paddingHorizontal: 20 }}
    >
      <Title>Выберите дату</Title>
      <Gap y={7} />
      <DatePicker date={date} setDate={setDate} />
      <AccentButton onPress={onChangeDealDate}>Сохранить</AccentButton>
    </BottomSheet>
  );
};

export default memo(DealDateModal);
