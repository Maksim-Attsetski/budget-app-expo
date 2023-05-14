import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  memo,
  useEffect,
  useRef,
} from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, getTiming, screen, useTheme } from '../shared';
import Gap from './Gap';

interface IProps extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const BottomSheet: FC<IProps> = ({ children, isOpen, setIsOpen }) => {
  const { backgroundColor } = useTheme();
  const styles = getStyles(backgroundColor, isOpen);

  const top = useRef(new Animated.Value(screen.height)).current;
  const topContainer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getTiming(top, screen.height / (isOpen ? 2 : 1), 500, false);
    getTiming(topContainer, screen.height * (isOpen ? 0 : 1), 300, false);
  }, [isOpen]);

  return (
    <Animated.View style={[styles.container, { top: topContainer }]}>
      {isOpen && (
        <TouchableOpacity
          onPress={() => setIsOpen(false)}
          style={styles.shadow}
        />
      )}
      <Animated.View style={[styles.content, { top }]}>
        <View style={styles.line} />
        <Gap y={5} />
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const getStyles = (backgroundColor: string, isOpen: boolean) =>
  StyleSheet.create({
    container: {
      height: screen.height,
      width: screen.width,
      position: 'absolute',
      zIndex: 999,
    },
    shadow: {
      backgroundColor: '#33333330',
      flex: 2,
    },
    content: {
      position: 'absolute',
      height: '100%',
      top: screen.height,
      width: '100%',
      padding: 20,
      backgroundColor,
      borderRadius: 25,
    },
    line: {
      backgroundColor: colors.dark,
      width: 70,
      height: 4,
      borderRadius: 25,
      alignSelf: 'center',
      opacity: 0.8,
    },
  });

export default memo(BottomSheet);
