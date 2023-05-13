import React, { FC, memo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { screenList } from './types';
import { colors, useTheme } from '../../shared';
import { reduxStore } from './state';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const { isDark } = useTheme();
  const color = isDark ? colors.white : colors.dark;
  const backgroundColor = isDark ? colors.darkBlock : colors.whiteBlock;

  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
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
