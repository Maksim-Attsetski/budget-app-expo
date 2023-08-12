import React, { FC, ReactNode, memo, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import BottomSheet from '@gorhom/bottom-sheet';

import { Input, Gap, AccentButton, Button, Flex, Card } from '../../../UI';
import { useClients } from '../useClients';
import { IClient } from '../types';
import { IOrder, useOrders } from '../../Orders';

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

  const { addClientModalKey, setClientModalVisible, onAddClient } =
    useClients();
  const { onAddOrder } = useOrders();

  const [contacts, setContacts] = useState('+375');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [date, setDate] = useState(new Date());

  const onPressAddClient = async () => {
    const regExp = /^\+375[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/im;

    const getAlert = (msg: string): void => {
      Alert.alert('Не верно введены данные', msg);
    };

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
      await onAddClient({
        contacts, // #TODO дата заказа
        lastname,
        name,
      } as IClient);
    }

    setClientModalVisible('');
    bottomSheetRef.current?.close();
  };

  const onPhoneValidate = (val: string) => {
    const validPhone = '+' + val.replaceAll(/\D/gim, '');
    setContacts(validPhone);
  };

  const onChange = (_, selectedDate: Date) => {
    if (selectedDate.getTime() > Date.now()) {
      setDate(selectedDate);
    }
  };

  const showMode = (mode: 'time' | 'date') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode,
      is24Hour: true,
      minimumDate: new Date(),
    });
  };

  useEffect(() => {
    if (addClientModalKey.length > 0 && mKey === addClientModalKey) {
      bottomSheetRef?.current?.snapToIndex(1);
      setContacts(client?.contacts);
      setName(client?.name);
      setLastname(client?.lastname);
    } else {
      setContacts('+375');
      setName('');
      setLastname('');
      bottomSheetRef?.current?.snapToIndex(-1);
    }
    setDate(new Date());
  }, [addClientModalKey]);

  return (
    <>
      <Button
        style={icon ? {} : styles.button}
        textProps={{ style: styles.buttonText }}
        onPress={() => setClientModalVisible(mKey)}
        disabled={disabledBtn}
      >
        {icon ?? `Добавить ${client ? 'заказ' : 'клиента'}`}
      </Button>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['75%', '100%']}
        containerStyle={{ zIndex: 2 }}
        enablePanDownToClose
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
          <Card>
            <Flex justify='space-between'>
              <Button onPress={() => showMode('date')}>
                {date.toLocaleDateString('ru')}
              </Button>
              <Button onPress={() => showMode('time')}>
                {date.toLocaleTimeString('ru')}
              </Button>
            </Flex>
          </Card>
          <Gap y={7} />
          <AccentButton onPress={onPressAddClient}>Подтвердить</AccentButton>
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
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default memo(AddClientModal);
