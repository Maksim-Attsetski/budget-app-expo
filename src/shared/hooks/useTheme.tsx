import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { storage, storageKeys } from '../utils';
import { colors } from '../constants';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    (async () => {
      const response = await storage.get(storageKeys.theme);
      setIsDark(response);
    })();
  }, []);

  const onToggleTheme = async () => {
    await storage.set(storageKeys.theme, !isDark);
    setIsDark(!isDark);
  };

  const backgroundColor = isDark ? colors.darkBlock : colors.whiteBlock;
  const color = isDark ? colors.white : colors.dark;

  return { isDark, onToggleTheme, backgroundColor, color };
};
