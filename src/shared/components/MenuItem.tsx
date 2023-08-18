import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Flex, Text, Title } from '../../UI';
import { IMenuItem } from '../types';
import { useNavigation } from '@react-navigation/native';
import { Svg } from '../../../assets';

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
        <Flex align='center'>
          {item.icon}
          <Title size='small'>{item.name}</Title>
        </Flex>
        <View style={{ transform: [{ rotate: '180deg' }] }}>
          <Svg.arrowLeft full={false} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 24,
  },
});

export default memo(MenuItem);
