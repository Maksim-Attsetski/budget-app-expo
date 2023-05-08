import React, { FC, memo, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Layout } from '../../widgets/App';
import { Button, Gap, Input, Select, Text } from '../../UI';
import { colors } from '../../shared';
import { TBudgetType } from './types';
import { useBudget } from './useBudget';

interface IOption {
  value: TBudgetType;
  name: string;
}

const options: IOption[] = [
  { value: 'dec', name: 'Расходы' },
  { value: 'inc', name: 'Доходы' },
];

const BudgetForm: FC = () => {
  const { onCreate, budget } = useBudget();

  const [budgetType, setBudgetType] = useState(options[0]);
  const [newPrice, setNewPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const onPressAddBudget = () => {
    if (Number.isNaN(+newPrice)) {
      Alert.alert(
        'Не правильно указана цена',
        'Исользуйте точку для деления цифр на нецелые числа'
      );
      return;
    }

    if (+newPrice <= 0) {
      Alert.alert(
        'Не правильно указана цена',
        'Число должно быть положительным'
      );
      return;
    }

    const newBudget = {
      id: budget.length + 1,
      type: budgetType.value,
      value: +newPrice,
      description,
      date: Date.now(),
    };

    onCreate(newBudget);

    setBudgetType(options[0]);
    setNewPrice('');
    setDescription('');
  };

  return (
    <View style={{ flex: 1 }}>
      <Input
        placeholder='Цена'
        value={newPrice}
        setValue={setNewPrice}
        keyboardType='number-pad'
      />
      <Gap y={10} />
      <Input
        placeholder='Описание'
        multiline
        value={description}
        setValue={setDescription}
      />
      <Gap y={10} />
      <View style={styles.maxContent}>
        <Select
          title='Вид'
          options={options}
          value={budgetType.name}
          onChange={setBudgetType}
        />
      </View>
      <Button
        style={styles.button}
        disabled={newPrice.length === 0}
        onPress={onPressAddBudget}
      >
        Добавить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  maxContent: {
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 20,
    paddingHorizontal: 26,
    borderRadius: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    marginHorizontal: 16,
  },
});

export default memo(BudgetForm);