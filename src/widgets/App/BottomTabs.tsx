import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, useTheme } from '../../shared';
import { routes } from './types';
import { screens } from '../../screens';
import { Svg } from '../../../assets';

const TabStack = createBottomTabNavigator();

const BottomTabs: FC = () => {
  const { backgroundColor } = useTheme();

  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen
        name={routes.home}
        component={screens.Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Svg.home stroke={focused ? colors?.purple : undefined} />
          ),
          title: '',
          tabBarLabelStyle: { height: 0 },
          tabBarStyle: { height: 60 },
        }}
      />
      <TabStack.Screen
        name={routes.addBudget}
        component={screens.AddBudget}
        options={{
          tabBarIcon: () => <Svg.plus />,
          title: '',
          tabBarLabelStyle: { height: 0 },
          tabBarStyle: { height: 60 },
        }}
      />
      <TabStack.Screen
        name={routes.menu}
        component={screens.Menu}
        key={routes.menu}
        options={{
          tabBarIcon: ({ focused }) => (
            <Svg.menu stroke={focused ? colors?.purple : undefined} />
          ),
          title: '',
          tabBarLabelStyle: { height: 0 },
          tabBarStyle: { height: 60 },
        }}
      />
    </TabStack.Navigator>
  );
};

const getStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      paddingVertical: 20,
      backgroundColor,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    tab: {
      marginHorizontal: 20,
    },
  });

export default memo(BottomTabs);
