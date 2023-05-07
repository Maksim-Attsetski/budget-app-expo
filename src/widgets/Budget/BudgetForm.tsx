import React, { FC, memo, useState } from 'react';
import { View } from 'react-native';
import { Input, Text } from '../../UI';

const BudgetForm: FC = () => {
  const [newPrice, setNewPrice] = useState(0);
  return (
    <View>
      <Text>Hello</Text>
      <Input keyboardType='numeric' />
    </View>
  );
};

export default memo(BudgetForm);
