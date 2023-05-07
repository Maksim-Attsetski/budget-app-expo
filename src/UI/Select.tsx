import React, { FC, memo, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';
import Button from './Button';
import { colors } from '../shared';
import Animated from 'react-native-reanimated';

interface IOption {
  name: string;
  value: string;
}

interface IProps {
  options: IOption[];
  value: string;
  onChange: (value: any) => void;
  title?: string;
}

const paddingHorizontal = 12;

const Select: FC<IProps> = ({ options, onChange, value, title }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const styles = getStyles(isOpen);

  const curOptions = options.filter((el) => el.name !== value);

  const onPressOption = () => {
    setIsOpen((prev) => !prev);
  };

  // const optionsContainer = useAnimatedStyle(() => {
  //   return {
  //     opacity: withTiming(isOpen ? 1 : 0),
  //   };
  // }, [isOpen]);

  return (
    <>
      {title && <Text style={{ marginVertical: 7 }}>{title}</Text>}
      <View style={styles.container}>
        <Button
          onPress={onPressOption}
          style={styles.title}
          textColor={colors.white}
        >
          {value}
        </Button>
        <Animated.View style={[styles.options, { opacity: isOpen ? 1 : 0 }]}>
          {curOptions.map((el, inx) => (
            <Button
              key={inx}
              onPress={() => {
                onPressOption();
                onChange(el);
              }}
              textColor={colors.white}
            >
              {el.name}
            </Button>
          ))}
        </Animated.View>
      </View>
    </>
  );
};

const getStyles = (isOpen: boolean) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      borderRadius: 12,
      paddingHorizontal,
      paddingVertical: 7,
      backgroundColor: colors.darkBlock,
    },
    title: {
      // color: colors.white,
    },
    options: {
      position: 'absolute',
      top: '110%',
      left: paddingHorizontal,
      opacity: isOpen ? 1 : 0,
    },
  });

export default memo(Select);
