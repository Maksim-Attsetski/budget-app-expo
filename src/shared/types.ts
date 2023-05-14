import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

export interface IScreen {
  route: RouteProp<ParamListBase>;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}
