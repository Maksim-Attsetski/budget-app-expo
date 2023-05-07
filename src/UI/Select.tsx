import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import Text from './Text';
import Button from './Button';
import { colors, getTiming } from '../shared';

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

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  const curOptions = options.filter((el) => el.name !== value);

  useEffect(() => {
    getTiming(opacity, isOpen ? 1 : 0);
    getTiming(translateY, isOpen ? 20 : -20, 200);
  }, [isOpen]);

  const onPressOption = () => {
    setIsOpen((prev) => !prev);
  };

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
        <Animated.View
          style={[styles.options, { opacity, transform: [{ translateY }] }]}
        >
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
      zIndex: 3,
      // color: colors.white,
    },
    options: {
      position: 'absolute',
      top: '100%',
      left: 0,
      zIndex: 2,
      borderRadius: 12,
      paddingHorizontal,
      paddingVertical: 7,
      backgroundColor: colors.darkBlock,
    },
  });

export default memo(Select);
