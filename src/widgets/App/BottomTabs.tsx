import React, { FC, memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../UI';
import { useTheme } from '../../shared';
import { routes } from './types';

import HomeSvg from '../../../assets/homeSvg';
import PlusSvg from '../../../assets/PlusSvg';
import ChartSvg from '../../../assets/ChartSvg';
import HistorySvg from '../../../assets/HistorySvg';
import ClientSvg from '../../../assets/ClientSvg';

interface ITabProps extends ViewProps {
  to: string;
}

const tabs = [
  { to: routes.home, name: <HomeSvg /> },
  { to: routes.clients, name: <ClientSvg /> },
  {
    to: routes.addBudget,
    name: <PlusSvg />,
  },
  { to: routes.stats, name: <ChartSvg /> },
  { to: routes.history, name: <HistorySvg /> },
];

const Tab: FC<ITabProps> = ({ to, children, ...props }) => {
  const { navigate } = useNavigation();

  return (
    <View {...props}>
      <Button
        // @ts-ignore
        onPress={() => navigate(to)}
      >
        {children}
      </Button>
    </View>
  );
};

const BottomTabs: FC = () => {
  const { backgroundColor } = useTheme();
  const styles = getStyles(backgroundColor);

  return (
    <View style={styles.container}>
      {tabs.map(({ name, to }, inx) => (
        <Tab style={styles.tab} key={inx} to={to}>
          {name}
        </Tab>
      ))}
    </View>
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
