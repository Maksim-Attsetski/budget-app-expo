import { StackAnimationTypes } from 'react-native-screens';
import { screens } from '../../screens';

export enum routes {
  home = 'Home',
  orders = 'Orders',
  setting = 'Setting',
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
  animation: StackAnimationTypes;
}

const animation = 'slide_from_left';

export const screenList: IScrenList[] = [
  {
    name: routes.orders,
    component: screens.Orders,
    animation,
  },
  {
    name: routes.setting,
    component: screens.Setting,
    animation,
  },
  {
    name: routes.stats,
    component: screens.Stats,
    animation,
  },
  {
    name: routes.clients,
    component: screens.Clients,
    animation,
  },
  {
    name: routes.client,
    component: screens.Client,
    animation,
  },
  {
    name: routes.history,
    component: screens.History,
    animation,
  },
  {
    name: routes.successDeal,
    component: screens.SuccessDeal,
    animation: 'slide_from_bottom',
  },
];
