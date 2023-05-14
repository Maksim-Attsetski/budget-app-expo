import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Card, Text } from '../../../UI';
import { IClient } from '../types';

interface IProps {
  item: IClient;
}

const ClientItem: FC<IProps> = ({ item }) => {
  return (
    <Card>
      <Text style={styles.title}>
        {item.name} {item.lastname}
      </Text>
      <Text>{item.description}</Text>
      <Text>{item.status}</Text>
      <Text>Контакты: {item.contacts}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
});

export default memo(ClientItem);
