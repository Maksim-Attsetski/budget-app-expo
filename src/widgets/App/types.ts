import { StackAnimationTypes } from 'react-native-screens';
import ChartSvg from '../../../assets/ChartSvg';
import PlusSvg from '../../../assets/PlusSvg';
import HomeSvg from '../../../assets/homeSvg';
import { screens } from '../../screens';
import { getGreeting } from '../../shared';

export enum routes {
  home = 'Home',
  stats = 'Stats',
  addBudget = 'Add_Budget',
}

interface IScrenList {
  name: routes;
  component: any;
  title: string;
  animation: StackAnimationTypes;
}

export const screenList: IScrenList[] = [
  {
    name: routes.home,
    component: screens.Home,
    title: getGreeting(),
    animation: 'slide_from_left',
  },
  {
    name: routes.addBudget,
    component: screens.AddBudget,
    title: 'Новые данные о бюджете',
    animation: 'slide_from_bottom',
  },
  {
    name: routes.stats,
    component: screens.Stats,
    title: 'Статистика',
    animation: 'slide_from_left',
  },
];
