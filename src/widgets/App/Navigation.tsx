import React, { FC, memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

import { screenList } from './types';
import { useTheme } from '../../shared';
import { StatusBar } from 'react-native';

const prefix = Linking.createURL('/', { scheme: 'budgetapp' });

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const { color, backgroundColor, isDark } = useTheme(true);

  const linking = {
    prefixes: [prefix],
  };

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
