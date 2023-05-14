import React, { FC, memo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { screenList } from './types';
import { useTheme } from '../../shared';
import { reduxStore } from './state';

import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/', { scheme: 'budgetapp' });

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const { color, backgroundColor } = useTheme();

  const linking = {
    prefixes: [prefix],
  };

  return (
    <Provider store={reduxStore}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{ statusBarColor: backgroundColor }}>
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
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default memo(Navigation);
