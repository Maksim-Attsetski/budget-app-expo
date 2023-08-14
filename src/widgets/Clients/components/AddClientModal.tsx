import React, { FC, ReactNode, memo, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import BottomSheet from '@gorhom/bottom-sheet';

import {
  Input,
  Gap,
  AccentButton,
  Button,
  Flex,
  Card,
  Title,
  DatePicker,
} from '../../../UI';
import { useClients } from '../useClients';
import { IClient } from '../types';
import { IOrder, useOrders } from '../../Orders';
import { useTheme } from '../../../shared';

interface IProps {
  mKey: string;
  client?: IClient;
  disabledBtn?: boolean;
  icon?: ReactNode;
}

const AddClientModal: FC<IProps> = ({
  mKey,
  client,
  disabledBtn = false,
  icon = null,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { backgroundColor } = useTheme();

  const {
    clientLoading,
    addClientModalKey,
    setClientModalVisible,
    onAddClient,
  } = useClients();
  const { onAddOrder, orderLoading } = useOrders();

  const [contacts, setContacts] = useState(client?.contacts ?? '+375');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState(client?.name ?? '');
  const [lastname, setLastname] = useState(client?.lastname ?? '');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const curLoading = loading || clientLoading || orderLoading;

  const onPressAddClient = async () => {
    if (curLoading) return;
    const regExp = /^\+375[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/im;

    const getAlert = (msg: string): void => {
      Alert.alert('Не верно введены данные', msg);
    };

    try {
      setLoading(true);

      const isPhoneValid = regExp.test(contacts);
      if (!isPhoneValid) {
        return getAlert(
          'Введите корректно номер телефона\nПример: +37529112223344'
        );
      }
      if (name.length < 2) {
        return getAlert('Слишком короткое имя');
      }
      if (lastname.length < 2) {
        return getAlert('Слишком короткая фамилия');
      }
      if (price.length === 0) {
        return getAlert('Введите цену');
      }
      if (Number.isNaN(+price)) {
        return getAlert('Некорректная цена');
      }

      if (client?.lastname.length > 0) {
        await onAddOrder(client?.uid, {
          dealAt: date.getTime(),
          description,
          price: +price,
          clientUid: client?.uid,
          isDone: false,
          createdAt: Date.now(),
          uid: '',
        } as IOrder);
      } else {
        const uid = await onAddClient({
          contacts, // #TODO дата заказа
          lastname,
          name,
        } as IClient);
        await onAddOrder(client?.uid, {
          dealAt: date.getTime(),
          description,
          price: +price,
          clientUid: uid,
          isDone: false,
          createdAt: Date.now(),
          uid: '',
        } as IOrder);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setClientModalVisible('');
    bottomSheetRef.current?.close();
  };

  const onPhoneValidate = (val: string) => {
    const validPhone = '+' + val.replaceAll(/\D/gim, '');
    setContacts(validPhone);
  };

  useEffect(() => {
    if (addClientModalKey.length > 0 && mKey === addClientModalKey) {
      setLastname(client?.lastname);
      setName(client?.name);
      setContacts(client?.contacts ?? '+375');
      bottomSheetRef?.current?.snapToIndex(0);
    } else {
      bottomSheetRef?.current?.snapToIndex(-1);
      setDescription('');
      setPrice('0');
      setDate(new Date());
    }
  }, [addClientModalKey]);

  return (
    <>
      <Button
        style={icon ? {} : styles.button}
        onPress={() => setClientModalVisible(mKey)}
        disabled={disabledBtn || curLoading}
      >
        <Title textColor='dark' size='small'>
          {icon ?? `Добавить ${client ? 'заказ' : 'клиента'}`}
        </Title>
      </Button>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['75%', '100%']}
        containerStyle={{ zIndex: 2 }}
        enablePanDownToClose
        onClose={() => setClientModalVisible('')}
        style={{ paddingHorizontal: 12 }}
        backgroundStyle={{ backgroundColor }}
      >
        <View>
          <View style={styles.namesContainer}>
            <Input
              setValue={setName}
              value={name}
              disabled={client?.name.length > 0}
              placeholder='Имя'
              viewProps={{ style: { flex: 1 } }}
            />
            <Input
              setValue={setLastname}
              value={lastname}
              disabled={client?.name.length > 0}
              placeholder='Фамилия'
              viewProps={{ style: { flex: 1 } }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <Input
              setValue={onPhoneValidate}
              value={contacts}
              keyboardType='phone-pad'
              maxLength={13}
              disabled={client?.name.length > 0}
              viewProps={{ style: { flex: 2.5 } }}
              placeholder='Моб. телефон'
            />
            <Input
              setValue={setPrice}
              value={price}
              keyboardType='numeric'
              maxLength={4}
              viewProps={{ style: { flex: 1.5 } }}
              placeholder='Цена'
            />
          </View>
          <Gap y={7} />
          <Input
            setValue={setDescription}
            value={description}
            multiline
            placeholder='Описание'
            style={{ maxHeight: 150 }}
          />
          <Gap y={7} />
          <DatePicker date={date} setDate={setDate} />
          <Gap y={7} />
          <AccentButton disabled={curLoading} onPress={onPressAddClient}>
            Подтвердить
          </AccentButton>
        </View>
      </BottomSheet>
    </>
  );
};
const styles = StyleSheet.create({
  namesContainer: {
    marginVertical: 14,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default memo(AddClientModal);
