import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import Card from './Card';
import Flex from './Flex';
import { Button } from './Button';
import { colors, useTheme } from '../shared';

interface IProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const DatePicker: FC<IProps> = ({ date, setDate }) => {
  const { isDark, color } = useTheme();

  const onChange = (_, selectedDate: Date) => {
    if (selectedDate.getTime() > Date.now()) {
      setDate(selectedDate);
    }
  };

  const showMode = (mode: 'time' | 'date') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode,
      is24Hour: true,
      minimumDate: new Date(),
    });
  };

  return (
    <Card
      style={{
        backgroundColor: isDark ? colors.dark : colors.white,
      }}
    >
      <Flex justify='space-between'>
        <Button textColor={color} onPress={() => showMode('date')}>
          {date.toLocaleDateString('ru')}
        </Button>
        <Button textColor={color} onPress={() => showMode('time')}>
          {date.toLocaleTimeString('ru')}
        </Button>
      </Flex>
    </Card>
  );
};

export default memo(DatePicker);
