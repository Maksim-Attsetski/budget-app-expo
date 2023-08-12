import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AccentButton, Button, Text } from '../UI';
import { IScreen, colors, useTheme } from '../shared';
import { IClient, useClients } from '../widgets/Clients';
import { routes } from '../widgets/App/types';
import { IBudget, useBudget } from '../widgets/Budget';
import { IOrder, useOrders } from '../widgets/Orders';

interface IProps extends IScreen {}

const SuccessDeal: FC<IProps> = ({ route, navigation }) => {
  const { isDark } = useTheme();
  const { orders, onUpdateOrder } = useOrders();
  const { onCreate: onCreateDeal } = useBudget();

  const styles = getStyles(isDark ? colors.dark : colors.white);
  // @ts-ignore
  const client = route.params?.client as IClient | undefined;
  // @ts-ignore
  const orderId = route.params?.orderId as string | undefined;

  const toHome = () => {
    // @ts-ignore
    navigation.navigate(routes.home);
  };

  const onCancel = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const changeClientStatus = async () => {
    if (client?.uid && orderId) {
      const curOrder = orders.find((el) => el.uid === orderId);
      if (curOrder) {
        await onUpdateOrder({ isDone: true, uid: curOrder?.uid } as IOrder);
        await onCreateDeal({
          type: 'inc',
          value: curOrder.price,
          description: 'Успешная сделка!',
        } as IBudget);
      }
    }
  };

  const onCompleteDeal = () => {
    changeClientStatus();
    onCancel();
  };
  const onPressToHome = () => {
    changeClientStatus();
    toHome();
  };

  return (
    <View style={styles.container}>
      {client ? (
        <>
          <Text style={styles.title}>Успешная сделка!</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonFlex}>
              <Button
                style={[styles.button, styles.cancel]}
                textColor={colors.whiteBlock}
                onPress={onCancel}
              >
                Отмена
              </Button>
              <Button
                style={[styles.button, styles.home]}
                textColor={colors.dark}
                onPress={onPressToHome}
              >
                На главную
              </Button>
            </View>
            <AccentButton onPress={onCompleteDeal}>Продолжить</AccentButton>
          </View>
        </>
      ) : (
        <Text>
          <Button onPress={onCancel}>Ошибка</Button>
        </Text>
      )}
    </View>
  );
};

const getStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor,
    },
    title: {
      fontSize: 32,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
    },
    buttonFlex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 12,
      gap: 20,
    },
    button: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 12,
      flex: 1,
      alignItems: 'center',
    },
    cancel: {
      backgroundColor: colors.red,
    },
    home: {
      backgroundColor: colors.whiteBlock,
    },
  });

export default memo(SuccessDeal);
