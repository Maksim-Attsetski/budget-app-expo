import React, { FC, memo } from 'react';
import { FlatList, View } from 'react-native';

import { Gap, Text, Title } from '../UI';
import { IMenuItem, MenuItem } from '../shared';
import { Layout } from '../widgets/App';
import { routes } from '../widgets/App/types';
import ClientSvg from '../../assets/ClientSvg';
import ChartSvg from '../../assets/ChartSvg';
import HistorySvg from '../../assets/HistorySvg';
import OrderSvg from '../../assets/OrderSvg';

const Menu: FC = () => {
  const menuContent: IMenuItem[] = [
    { name: 'Клиенты', to: routes.clients, value: '', icon: <ClientSvg /> },
    { name: 'Заказы', to: routes.orders, value: '', icon: <OrderSvg /> },
    { name: 'История', to: routes.history, value: '', icon: <HistorySvg /> },
    { name: 'Статистика', to: routes.stats, value: '', icon: <ChartSvg /> },
  ];

  return (
    <Layout>
      <Title>Меню</Title>
      <Gap y={7} />
      <FlatList
        data={menuContent}
        renderItem={({ item, index }) => <MenuItem item={item} key={index} />}
        ItemSeparatorComponent={() => <Gap y={7} />}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default memo(Menu);
