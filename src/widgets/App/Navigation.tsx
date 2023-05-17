import React, { FC, memo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

import { screenList } from './types';
import { useTheme } from '../../shared';
import { useBudget } from '../Budget';

const prefix = Linking.createURL('/', { scheme: 'budgetapp' });

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const { color, backgroundColor, isDark } = useTheme(true);
  const { setBudget } = useBudget();

  const linking = {
    prefixes: [prefix],
  };

  useEffect(() => {
    (async () => {
      await Promise.all([setBudget()]);
    })();
  }, []);

  return (
    <>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            statusBarStyle: isDark ? 'light' : 'dark',
            statusBarColor: backgroundColor,
          }}
        >
          {screenList.map(({ component, name, title, animation }) => (
            <Stack.Screen
              name={name}
              component={component}
              key={name}
              options={{
                title,
                animation,
                headerStyle: { backgroundColor },
                headerTitleStyle: { color },
                headerShown: title.length > 0,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default memo(Navigation);
