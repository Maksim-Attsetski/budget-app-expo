import React, { FC, memo, useState } from 'react';
import { Gap, Input, Select, Text } from '../UI';
import { Layout } from '../widgets/App';
import { TBudgetType } from '../widgets/Budget';
import { View } from 'react-native';

const options = [
  { value: 'inc', name: 'Доходы' },
  { value: 'dec', name: 'Расходы' },
];

const AddBudget: FC = () => {
  const [budgetType, setBudgetType] = useState(options[0]);
  return (
    <Layout>
      <Text>Новые данные о бюджете</Text>
      <Gap y={10} />
      <Input placeholder='Цена' />
      <Gap y={10} />
      <Input placeholder='Описание' multiline />
      <Gap y={10} />

      <View style={{ alignItems: 'flex-start' }}>
        <Select
          title='Вид'
          options={options}
          value={budgetType.name}
          onChange={setBudgetType}
        />
      </View>
    </Layout>
  );
};

export default memo(AddBudget);
