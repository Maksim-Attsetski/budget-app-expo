import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gap, Text, Title } from '../../UI';

const AppLoading: FC = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Добро пожаловать</Title>
      <Gap y={7} />
      <Title>Подгружаем данные...</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default memo(AppLoading);
