import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { PropsWithChildren } from 'react';

export interface IScreen {
  route: RouteProp<ParamListBase>;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export interface IMenuItem {
  name: string;
  value: any;
  to: string;
  icon: any;
}

export interface IHeaderProps extends PropsWithChildren {
  left?: boolean;
  right?: boolean;
}
