import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import Card from './Card';
import Flex from './Flex';
import { Button } from './Button';

interface IProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const DatePicker: FC<IProps> = ({ date, setDate }) => {
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
    <Card>
      <Flex justify='space-between'>
        <Button onPress={() => showMode('date')}>
          {date.toLocaleDateString('ru')}
        </Button>
        <Button onPress={() => showMode('time')}>
          {date.toLocaleTimeString('ru')}
        </Button>
      </Flex>
    </Card>
  );
};

export default memo(DatePicker);
