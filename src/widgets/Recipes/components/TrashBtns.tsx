import React, { FC, memo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Flex, Text } from '../../../UI';
import { colors } from '../../../shared';
import { Svg } from '../../../../assets';

interface IProps {
  onPlus: Function;
  onMinus: Function;
  count?: number;
  maxCount?: number;
}

const TrashBtns: FC<IProps> = ({
  count = 0,
  maxCount = 50,
  onMinus,
  onPlus,
}) => {
  const [counter, setCounter] = useState(count);
  const styles = getStyles(colors);

  const onPressMinus = (): void => {
    if (counter > 0) {
      setCounter((prev) => (prev > 0 ? prev - 1 : prev));
      onMinus(counter - 1);
    }
  };

  const onPressPlus = (): void => {
    if (counter < maxCount) {
      setCounter((prev) => (prev < maxCount ? prev + 1 : prev));
      onPlus(counter + 1);
    }
  };

  return (
    <Flex>
      <Flex style={styles.view} align='center'>
        <TouchableOpacity onPress={onPressMinus}>
          <Svg.minus />
        </TouchableOpacity>
        {counter > 0 && <Text>{counter}</Text>}
        <TouchableOpacity onPress={onPressPlus}>
          <Svg.minus isPlus />
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
};

const getStyles = (_colors: typeof colors) =>
  StyleSheet.create({
    view: {
      backgroundColor: _colors?.white,
      // width: 120,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 20,
      height: 40,
    },
    text: {
      fontSize: 22,
      fontWeight: 'bold',
    },
  });

export default memo(TrashBtns);
