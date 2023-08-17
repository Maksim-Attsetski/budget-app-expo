import React, { FC, memo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

import { routes, screenList } from './types';
import { useFirestore } from '../../shared';

import BottomTabs from './BottomTabs';

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
  const fbVersion = useFirestore('zefirka-version');

  const onDownloadUpdate = async (url: string, version: number) => {
    await Linking.openURL(url);
    await fbVersion.update('WWn0gkmHeG3U2VKJyXEK', {
      userVersion: version,
      lastUpdateAt: Date.now(),
    });
  };

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
              onPress: () =>
                onDownloadUpdate(version.lastUpdate, version.version),
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
        <Stack.Navigator>
          <Stack.Screen
            name={routes.home}
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
          />
          {screenList.map(({ animation, component, name }) => (
            <Stack.Screen
              name={name}
              component={component}
              key={name}
              options={{
                headerShown: false,
                animation,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default memo(Navigation);
