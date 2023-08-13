import React, { FC, memo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

import { screenList } from './types';
import { useFirestore, useTheme } from '../../shared';
import { useBudget } from '../Budget';
import { useClients } from '../Clients';

const prefix = Linking.createURL('/', { scheme: 'budgetapp' });
const linking = { prefixes: [prefix] };

const Stack = createNativeStackNavigator();

interface IVersion {
  features: string[];
  lastUpdate: string;
  lastUpdateAt: number;
  userVersion: number;
  version: number;
}

const Navigation: FC = () => {
  const { color, backgroundColor, isDark } = useTheme(true);
  const fbVersion = useFirestore('zefirka-version');

  const checkVersion = async (): Promise<void> => {
    const response = await fbVersion.getAll([]);
    const version = response.result[0] as IVersion;

    if (version && version?.userVersion !== version?.version) {
      const isSupported = await Linking.canOpenURL(version.lastUpdate);

      if (isSupported) {
        Alert.alert(
          'Вышло новое обновление!',
          `Новости обновления ${version?.version}:\n${version?.features.map(
            (el) => '\n• ' + el
          )}`,
          [
            {
              text: 'Скачать',
              onPress: () => Linking.openURL(version.lastUpdate),
            },
            { text: 'Напомнить в следующий раз', onPress: () => {} },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('is not supported');
      }
    }
  };

  useEffect(() => {
    checkVersion();
  }, []);

  return (
    <>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            statusBarStyle: isDark ? 'light' : 'dark',
            statusBarColor: backgroundColor,
            headerTintColor: color,
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
