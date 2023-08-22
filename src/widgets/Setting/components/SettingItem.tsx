import React, { Dispatch, FC, memo, useState } from 'react';
import { KeyboardTypeOptions, TouchableOpacity } from 'react-native';

import { Button, Card, Flex, Gap, Input, Text, Title } from '../../../UI';
import { Svg } from '../../../../assets';

interface IProps {
  value: string;
  setValue: Dispatch<string>;
  placeholder?: string;
  postfix?: string;
  keyboardType?: KeyboardTypeOptions;
  onSave?: Function;
}

const SettingItem: FC<IProps> = ({
  setValue,
  value,
  placeholder = '',
  postfix = '',
  keyboardType,
  onSave,
}) => {
  const [initValue, setInitValue] = useState<string>(value);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onPressSave = () => {
    if (initValue !== value) {
      onSave();
    }
    setIsEdit(false);
    setInitValue(value);
  };
  const onPressCancel = () => {
    setIsEdit(false);
    setValue(initValue);
  };

  return (
    <Card>
      {isEdit ? (
        <>
          <Text>
            {placeholder} {postfix}
          </Text>
          <Gap y={5} />
          <Flex justify='space-between' align='center'>
            <Input
              keyboardType={keyboardType}
              setValue={setValue}
              value={value}
              style={{ minWidth: '70%' }}
            />
            <Title size='small'>{postfix}</Title>
          </Flex>
          <Gap y={7} />
          <Flex>
            <Button onPress={onPressCancel}>Отменить</Button>
            <Button onPress={onPressSave}>Сохранить</Button>
          </Flex>
        </>
      ) : (
        <Flex justify='space-between' align='center'>
          <Text>
            {placeholder}: {value} {postfix}
          </Text>
          <TouchableOpacity onPress={() => setIsEdit(true)}>
            <Svg.edit />
          </TouchableOpacity>
        </Flex>
      )}
    </Card>
  );
};

export default memo(SettingItem);
