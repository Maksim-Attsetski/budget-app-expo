import { useCallback, useEffect, useRef, useState } from 'react';
import { useColorScheme } from 'react-native';

import { colors } from '../constants';
import { useTypedSelector } from './useRedux';
import { useActions } from './useActions';

export const useTheme = (isChecker: boolean = false) => {
  const colorScheme = useColorScheme();
  const { isDark } = useTypedSelector((s) => s.app);
  const { action } = useActions();

  const onToggleTheme = useCallback(async () => {
    action.setThemeAC(!isDark);
  }, []);

  useEffect(() => {
    if (isChecker) {
      action?.setThemeAC(colorScheme === 'dark');
    }
  }, [colorScheme, isChecker, action.setThemeAC]);

  const backgroundColor = isDark ? colors?.darkBlock : colors?.whiteBlock;
  const color = isDark ? colors?.white : colors.dark;

  return { isDark, onToggleTheme, backgroundColor, color };
};
