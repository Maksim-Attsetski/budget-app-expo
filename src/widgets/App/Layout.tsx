import React, { FC, PropsWithChildren, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomTabs from './BottomTabs';
import {
  AppLoading,
  Header,
  IHeaderProps,
  colors,
  useTheme,
  useTypedSelector,
} from '../../shared';
import { Gap } from '../../UI';
import { StatusBar } from 'expo-status-bar';

interface IProps extends PropsWithChildren {
  header?: boolean;
  headerProps?: IHeaderProps;
}

const Layout: FC<IProps> = ({ children, header = true, headerProps = {} }) => {
  const { isDark } = useTheme();
  const { appLoading } = useTypedSelector((s) => s.app);

  const styles = getStyles(isDark ? colors.dark : colors?.white);

  return (
    <>
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <StatusBar animated backgroundColor={colors?.white} />
        {header && <Header {...headerProps} />}
        <View style={styles.container}>
          {appLoading ? <AppLoading /> : children}
        </View>
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
