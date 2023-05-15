import React, { FC, memo, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
  BottomSheet,
  Input,
  Gap,
  AccentButton,
  Button,
  Text,
  Flex,
  Card,
} from '../../../UI';
import { useClients } from '../useClients';
import { IClient, IClientOrder } from '../types';
import DatePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { dateHelper } from '../../../shared';

const AddClientModal: FC = () => {
  const {
    addClientModalvisible,
    setClientModalVisible,
    onAddClient,
    onAddOrder,
    modalDefaultProps,
    resetModalProps,
  } = useClients();

  const [contacts, setContacts] = useState('+375');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [date, setDate] = useState(new Date());

  const onPressAddClient = () => {
    const regExp = /^\+375[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/im;

    const getAlert = (msg: string) => {
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

    if (modalDefaultProps.lastname.length > 0) {
      onAddOrder(modalDefaultProps.id, {
        dealAt: date.getTime(),
        description,
        price: +price,
        status: 'wait',
      } as IClientOrder);
    } else {
      onAddClient({
        contacts, // #TODO дата заказа
        lastname,
        name,
        orders: [
          {
            id: Date.now().toString(),
            createdAt: Date.now(),
            dealAt: date.getTime(),
            description,
            price: +price,
            status: 'wait',
          },
        ],
      } as IClient);
    }

    setClientModalVisible();
  };

  const onPhoneValidate = (val: string) => {
    const validPhone = '+' + val.replaceAll(/\D/gim, '');
    setContacts(validPhone);
  };

  const onChange = (event, selectedDate: Date) => {
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
    setContacts(modalDefaultProps.contacts);
    setName(modalDefaultProps.name);
    setLastname(modalDefaultProps.lastname);
    setDate(new Date(modalDefaultProps?.orders[0]?.dealAt || new Date()));
  }, [modalDefaultProps]);

  useEffect(() => {
    !addClientModalvisible && resetModalProps();
  }, [addClientModalvisible]);

  return (
    <>
      <BottomSheet
        isOpen={addClientModalvisible}
        setIsOpen={() => setClientModalVisible(modalDefaultProps)}
        openTo={2.2}
      >
        <View>
          <View style={styles.namesContainer}>
            <Input
              setValue={setName}
              value={name}
              disabled={modalDefaultProps.name.length > 0}
              placeholder='Имя'
              viewProps={{ style: { flex: 1 } }}
            />
            <Input
              setValue={setLastname}
              value={lastname}
              disabled={modalDefaultProps.name.length > 0}
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
              disabled={modalDefaultProps.name.length > 4}
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
              <Button
                disabled={!!modalDefaultProps?.orders[0]?.dealAt}
                onPress={() => showMode('date')}
              >
                {date.toLocaleDateString('ru')}
              </Button>
              <Button
                disabled={!!modalDefaultProps?.orders[0]?.dealAt}
                onPress={() => showMode('time')}
              >
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
});

export default memo(AddClientModal);
