import React, { FC, PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';
import BottomTabs from './BottomTabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../shared';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      {children}
      <BottomTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    backgroundColor: colors.dark,
  },
});

export default memo(Layout);
