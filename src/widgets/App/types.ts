import { StackAnimationTypes } from 'react-native-screens';
import { screens } from '../../screens';

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
  icon: any;
}
interface IScrenList extends IList {
  title: string;
  animation: StackAnimationTypes;
}

const animation = 'slide_from_left';

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
