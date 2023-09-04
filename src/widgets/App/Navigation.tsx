import React, { FC, memo, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

import { routes, screenList } from './types';
import { useActions, useFirestore } from '../../shared';
import { useClients } from '../Clients';
import { useBudget } from '../Budget';
import BottomTabs from './BottomTabs';
import { useOrders } from '../Orders';
import { useRecipe } from '../Recipes';
import { useSetting } from '../Setting';

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
  const { onGetClients } = useClients();
  const { onGetSetting } = useSetting();
  const { onGetOrders } = useOrders();
  const { setBudget } = useBudget();
  const { onGetRecipes } = useRecipe();
  const { action } = useActions();

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

  const onGetAll = async (): Promise<void> => {
    try {
      action.setAppLoadingAC(true);

      const [clients] = await Promise.all([
        onGetClients(),
        checkVersion(),
        setBudget(),
        onGetRecipes(),
        onGetSetting(),
      ]);
      await checkVersion();
      clients.result?.length > 0 &&
        (await onGetOrders(clients.result?.map((el) => el.uid)));
      console.log('get all');
    } catch (error) {
      console.log(error);
    } finally {
      action.setAppLoadingAC(false);
    }
  };

  useEffect(() => {
    onGetAll();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name={routes.home}
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        {screenList.map(({ animation, component, name }) => (
          <Stack.Screen
            name={name}
            component={component}
            key={name}
            options={{ headerShown: false, animation }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Navigation);
