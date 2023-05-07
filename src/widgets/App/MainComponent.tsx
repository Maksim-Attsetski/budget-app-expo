import React, { FC, memo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { screenList } from './types';
import { colors } from '../../shared';

const Stack = createNativeStackNavigator();

const MainComponent: FC = () => {
  return (
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
  );
};

export default memo(MainComponent);
