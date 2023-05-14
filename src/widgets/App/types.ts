import { StackAnimationTypes } from 'react-native-screens';

import { screens } from '../../screens';
import { getGreeting } from '../../shared';

export enum routes {
  home = 'Home',
  stats = 'Stats',
  addBudget = 'Add_Budget',
  history = 'History',
  clients = 'Clients',
  successDeal = 'Success_Deal',
}

interface IScrenList {
  name: routes;
  component: any;
  title: string;
  animation: StackAnimationTypes;
}

const animation = 'slide_from_left';
export const screenList: IScrenList[] = [
  {
    name: routes.home,
    component: screens.Home,
    title: getGreeting(),
    animation,
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
    animation,
  },
  {
    name: routes.clients,
    component: screens.Clients,
    title: 'Клиенты',
    animation,
  },
  {
    name: routes.history,
    component: screens.History,
    title: 'История',
    animation,
  },
  {
    name: routes.successDeal,
    component: screens.SuccessDeal,
    title: '',
    animation: 'slide_from_bottom',
  },
];
