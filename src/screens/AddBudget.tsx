import React, { FC, memo, useState } from 'react';
import { Button, Gap, Input, Select, Text } from '../UI';
import { Layout } from '../widgets/App';
import { TBudgetType } from '../widgets/Budget';
import { StyleSheet, View } from 'react-native';
import { colors } from '../shared';

const options = [
  { value: 'inc', name: 'Доходы' },
  { value: 'dec', name: 'Расходы' },
];

const AddBudget: FC = () => {
  const [budgetType, setBudgetType] = useState(options[0]);
  const [newPrice, setNewPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const onPressAddBudget = () => {
    console.log('gfgggg');
  };

  return (
    <Layout>
      <Gap y={10} />
      <Input placeholder='Цена' value={newPrice} setValue={setNewPrice} />
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
      {/* </View> */}
    </Layout>
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

export default memo(AddBudget);
