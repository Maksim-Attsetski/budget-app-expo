import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  memo,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors, getTiming, screen, useTheme } from '../shared';
import Gap from './Gap';

interface IProps extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openTo?: number;
}

const BottomSheet: FC<IProps> = ({
  children,
  isOpen,
  setIsOpen,
  openTo = 2,
}) => {
  const { isDark } = useTheme();
  const styles = getStyles(isDark ? colors.dark : colors?.white);

  const top = useRef(new Animated.Value(screen.height)).current;
  const topContainer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    !isOpen && Keyboard.dismiss();

    getTiming(top, screen.height / (isOpen ? openTo : 1), 500, false);
    getTiming(topContainer, screen.height * (isOpen ? 0 : 1), 300, false);
  }, [isOpen]);

  return (
    <Animated.View style={[styles.container, { top: topContainer }]}>
      <KeyboardAvoidingView behavior={'position'} style={{ flex: 1 }}>
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
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const getStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      height: screen.height,
      width: screen.width,
      position: 'absolute',
      zIndex: 999,
    },
    shadow: {
      backgroundColor: '#33333330',
      position: 'absolute',
      top: 0,
      left: 0,
      height: screen.height,
      width: screen.width,
    },
    content: {
      position: 'absolute',
      height: screen.height / 2,
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
