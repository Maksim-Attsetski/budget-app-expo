import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text, Title } from '../../UI';
import { IMenuItem } from '../types';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  item: IMenuItem;
}

const MenuItem: FC<IProps> = ({ item }) => {
  const { navigate } = useNavigation();
  const onGoTo = () => {
    // @ts-ignore
    navigate(item.to);
  };

  return (
    <TouchableOpacity onPress={onGoTo}>
      <Card style={styles.menu}>
        {item.icon}
        <Title size='small'>{item.name}</Title>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
  },
});

export default memo(MenuItem);
