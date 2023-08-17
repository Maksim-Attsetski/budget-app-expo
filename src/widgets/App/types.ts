import { StackAnimationTypes } from 'react-native-screens';

import { screens } from '../../screens';
import { getGreeting } from '../../shared';
import { ReactNode } from 'react';
import HomeSvg from '../../../assets/HomeSvg';
import PlusSvg from '../../../assets/PlusSvg';
import { View } from 'react-native';

export enum routes {
  home = 'Home',
  orders = 'Orders',
  menu = 'Menu',
  stats = 'Stats',
  addBudget = 'Add_Budget',
  history = 'History',
  clients = 'Clients',
  client = 'Client',
  successDeal = 'Success_Deal',
}

interface IList {
  name: routes;
  component: any;
}
interface ITabList extends IList {
  // icon: (props: { focused: boolean; color: string; size: number }) => ReactNode;
  icon: any;
}
interface IScrenList extends IList {
  title: string;
  animation: StackAnimationTypes;
}

// { to: routes.home, name: <HomeSvg /> },
// { to: routes.clients, name: <ClientSvg /> },
// {
//   to: routes.addBudget,
//   name: <PlusSvg />,
// },
// { to: routes.stats, name: <ChartSvg /> },
// { to: routes.history, name: <HistorySvg /> },

const animation = 'slide_from_left';
export const tabList: ITabList[] = [
  {
    name: routes.home,
    component: screens.Home,
    icon: HomeSvg,
  },
  {
    name: routes.addBudget,
    component: screens.AddBudget,
    icon: PlusSvg,
  },
  {
    name: routes.menu,
    component: screens.Menu,
    icon: HomeSvg,
  },
];

export const screenList: IScrenList[] = [
  {
    name: routes.orders,
    component: screens.Orders,
    title: 'Все заказы',
    animation,
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
    name: routes.client,
    component: screens.Client,
    title: 'Клиент',
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
