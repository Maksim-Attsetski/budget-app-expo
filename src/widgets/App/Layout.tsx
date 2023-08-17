import React, { FC, PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomTabs from './BottomTabs';
import { colors, useTheme } from '../../shared';
import { Gap } from '../../UI';
import { StatusBar } from 'expo-status-bar';

interface IProps extends PropsWithChildren {
  tabs?: boolean;
}

const Layout: FC<IProps> = ({ children, tabs = true }) => {
  const { isDark } = useTheme();
  const styles = getStyles(isDark ? colors.dark : colors.white);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar animated backgroundColor={colors.white} />
        {children}
      </SafeAreaView>
    </>
  );
};

const getStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      flex: 1,
      backgroundColor,
    },
  });

export default memo(Layout);
