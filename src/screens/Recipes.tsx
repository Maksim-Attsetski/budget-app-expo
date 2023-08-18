import React, { FC, memo } from 'react';

import { colors, dateHelper } from '../shared';
import { Card, Flex, Gap, List, Text, Title } from '../UI';
import { Layout } from '../widgets/App';
import { IRecipe, useRecipe } from '../widgets/Recipes';

const Recipes: FC = () => {
  const { recipes, onGetRecipes, recipeLoading } = useRecipe();

  const onRefresh = async () => {
    await onGetRecipes([]);
  };

  return (
    <Layout headerProps={{ children: 'Рецепты' }}>
      <Gap y={10} />
      <List
        emptyText='Вы не добавили ни одного рецепта'
        loadingText='Подгружаем рецепты'
        loading={recipeLoading}
        refreshing={recipeLoading}
        onRefresh={onRefresh}
        data={recipes}
        renderItem={({ item }: { item: IRecipe }) => (
          <Card key={item.uid}>
            <Title>{item.name}</Title>
            <Gap y={7} />
            <Flex justify='space-between'>
              <Text>{item.time}</Text>
              <Text>{item.cost_price}</Text>
            </Flex>
          </Card>
        )}
      />
    </Layout>
  );
};

export default memo(Recipes);
