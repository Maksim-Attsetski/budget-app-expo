import React, { FC, memo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { AccentButton, Gap, Input, Select } from '../../UI';
import { IBudget, TBudgetType } from './types';
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
  const { onCreate } = useBudget();

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
      type: budgetType.value,
      value: +newPrice,
      description,
    } as IBudget;

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
        maxLength={5}
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
      <AccentButton
        disabled={newPrice.length === 0}
        style={styles.button}
        onPress={onPressAddBudget}
      >
        Добавить
      </AccentButton>
    </View>
  );
};

const styles = StyleSheet.create({
  maxContent: {
    alignItems: 'flex-start',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default memo(BudgetForm);
