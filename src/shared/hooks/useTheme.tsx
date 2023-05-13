import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { storage, storageKeys } from '../utils';

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

  return { isDark, onToggleTheme };
};
