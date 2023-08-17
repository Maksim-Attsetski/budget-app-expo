import React, { FC, PropsWithChildren, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Title } from '../../UI';
import { useTheme } from '../hooks';
import { Svg } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { IHeaderProps } from '../types';

const DisabledArrow = ({ visible = false }) => {
  return (
    <View style={visible ? {} : styles.disabled}>
      <Svg.arrowLeft />
    </View>
  );
};

const Header: FC<IHeaderProps> = ({ children, left = true, right }) => {
  const { backgroundColor } = useTheme();
  const { goBack, canGoBack } = useNavigation();

  return (
    <View style={[{ backgroundColor }, styles.header]}>
      {left ? (
        <TouchableOpacity onPress={() => canGoBack() && goBack()}>
          {left && <Svg.arrowLeft />}
        </TouchableOpacity>
      ) : (
        <DisabledArrow />
      )}
      <Title size='small'>{children}</Title>
      <DisabledArrow />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabled: {
    opacity: 0,
  },
});

export default memo(Header);
