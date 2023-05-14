import React, { FC, memo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AccentButton, BottomSheet, Button, Gap, Input } from '../UI';
import { Layout } from '../widgets/App';
import { ClientItem, useClients } from '../widgets/Clients';

const Clients: FC = () => {
  const { clients, onAddClient } = useClients();

  const [isOpen, setIsOpen] = useState(false);

  const [contacts, setContacts] = useState('+375');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastname] = useState('');

  const onPressAddClient = () => {
    const regExp = /^\+375[0-9](\s{0,1}){2}[0-9]{3}[0-9]{2}[0-9]{2}$/im;

    const isPhoneValid = regExp.test(contacts);
    console.log(isPhoneValid);

    // onAddClient(newClient);
  };

  const onPhoneValidate = (val: string) => {
    const validPhone = '+' + val.replaceAll(/\D/gim, '');
    setContacts(validPhone);
  };

  return (
    <Layout>
      <Gap y={5} />
      <Button onPress={() => setIsOpen((p) => !p)}>Добавить клиента</Button>
      <Gap y={5} />
      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <View>
          <View style={styles.namesContainer}>
            <Input
              setValue={setName}
              value={name}
              placeholder='Имя'
              viewProps={{ style: { width: '48%' } }}
            />
            <Input
              setValue={setLastname}
              value={lastName}
              placeholder='Фамилия'
              viewProps={{ style: { width: '48%' } }}
            />
          </View>
          <Input
            setValue={onPhoneValidate}
            value={contacts}
            keyboardType='phone-pad'
            maxLength={13}
            placeholder='Моб. телефон'
          />
          <Gap y={7} />
          <Input
            setValue={setDescription}
            value={description}
            multiline
            placeholder='Описание'
            style={{ maxHeight: 150 }}
          />
          <Gap y={7} />
          <AccentButton onPress={onPressAddClient}>Подтвердить</AccentButton>
        </View>
      </BottomSheet>
      <Gap y={5} />
      <FlatList
        data={clients}
        ItemSeparatorComponent={() => <Gap y={7} />}
        renderItem={({ item }) => <ClientItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
      <Gap y={45} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  namesContainer: {
    marginVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default memo(Clients);
