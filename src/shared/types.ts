import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { PropsWithChildren, ReactNode } from 'react';

export interface IScreen {
  route: RouteProp<ParamListBase>;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export interface IResponse<T = any[]> {
  count: number;
  result: T[];
}

export interface IMenuItem {
  name: string;
  value: any;
  to: string;
  icon: any;
}

export interface IHeaderProps extends PropsWithChildren {
  left?: boolean;
  right?: ReactNode;
}
