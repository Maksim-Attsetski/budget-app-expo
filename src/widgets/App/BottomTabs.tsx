import React, { FC, PropsWithChildren, memo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Button, Text } from '../../UI';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../shared';
import HomeSvg from '../../../assets/homeSvg';
import PlusSvg from '../../../assets/PlusSvg';
import { routes } from './types';
import ChartSvg from '../../../assets/ChartSvg';

interface ITabProps extends ViewProps {
  to: string;
}

const tabs = [
  { to: routes.home, name: <HomeSvg /> },
  {
    to: routes.addBudget,
    name: <PlusSvg />,
  },
  { to: routes.stats, name: <ChartSvg /> },
];

const Tab: FC<ITabProps> = ({ to, children, ...props }) => {
  const { navigate } = useNavigation();

  return (
    <View {...props}>
      <Button
        textColor={colors.white}
        // @ts-ignore
        onPress={() => navigate(to)}
      >
        {children}
      </Button>
    </View>
  );
};

const BottomTabs: FC = () => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    backgroundColor: colors.darkBlock,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    marginHorizontal: 20,
  },
});

export default memo(BottomTabs);
