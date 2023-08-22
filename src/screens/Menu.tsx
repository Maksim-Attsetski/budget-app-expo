import React, { FC, memo } from 'react';
import { FlatList } from 'react-native';

import { Gap, Title } from '../UI';
import { IMenuItem, MenuItem } from '../shared';
import { Svg } from '../../assets';
import { Layout } from '../widgets/App';
import { routes } from '../widgets/App/types';

const Menu: FC = () => {
  const menuContent: IMenuItem[] = [
    { name: 'Клиенты', to: routes.clients, value: '', icon: <Svg.client /> },
    { name: 'Заказы', to: routes.orders, value: '', icon: <Svg.order /> },
    { name: 'Рецепты', to: routes.recipes, value: '', icon: <Svg.recipe /> },
    { name: 'История', to: routes.history, value: '', icon: <Svg.history /> },
    { name: 'Статистика', to: routes.stats, value: '', icon: <Svg.chart /> },
    { name: 'Настройки', to: routes.setting, value: '', icon: <Svg.setting /> },
  ];

  return (
    <Layout header={false}>
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
