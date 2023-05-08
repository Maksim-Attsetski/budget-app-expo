import React, { FC, memo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { screenList } from './types';
import { colors } from '../../shared';
import { reduxStore } from './state';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ statusBarColor: colors.darkBlock }}>
          {screenList.map(({ component, name, title, animation }) => (
            <Stack.Screen
              name={name}
              component={component}
              key={name}
              options={{
                title,
                animation,
                headerStyle: { backgroundColor: colors.darkBlock },
                headerTitleStyle: { color: colors.white },
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default memo(Navigation);
