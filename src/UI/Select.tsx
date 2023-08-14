import React, { FC, Fragment, memo, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

import Text from './Text';
import { Button } from './Button';
import { getTiming, useTheme } from '../shared';

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

const paddingHorizontal = 16;
const optionWidth = Dimensions.get('screen').width - paddingHorizontal * 2;
const textProps = { style: { fontSize: 20 } };

const Select: FC<IProps> = ({ options, onChange, value, title }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { backgroundColor } = useTheme();
  const styles = getStyles(backgroundColor);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  const curOptions = options.filter((el) => el.name !== value);

  useEffect(() => {
    getTiming(opacity, isOpen ? 1 : 0);
    getTiming(translateY, isOpen ? 30 : -20, 200);
  }, [isOpen]);

  const onPressOption = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.container, styles.option]}>
        <Button textProps={textProps} onPress={onPressOption}>
          {value}
        </Button>
        <Animated.View
          style={[
            styles.options,
            styles.option,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          {curOptions.map((el, inx) => (
            <Fragment key={inx}>
              {inx !== 0 && <View style={styles.divider} />}
              <Button
                textProps={textProps}
                onPress={() => {
                  if (value !== el.value) {
                    onPressOption();
                    isOpen && onChange(el);
                  }
                }}
              >
                {el.name}
              </Button>
            </Fragment>
          ))}
        </Animated.View>
      </View>
    </>
  );
};

const getStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: 1,
    },
    title: {
      zIndex: 3,
      fontSize: 22,
      fontWeight: '600',
      letterSpacing: 0.5,
      marginVertical: 7,
    },
    options: {
      position: 'absolute',
      top: '100%',
      left: 0,
      zIndex: 2,
    },
    option: {
      width: optionWidth,
      borderRadius: 12,
      paddingHorizontal,
      paddingVertical: 12,
      backgroundColor,
    },
    divider: {
      width: '100%',
      height: 2,
      backgroundColor: '#c1c1c1',
      opacity: 0.4,
      marginVertical: 10,
      borderRadius: 12,
    },
  });

export default memo(Select);
