import React, { FC, memo } from 'react';

import { ListWithInput } from '../shared';
import { Card, Flex, Gap, Text, Title } from '../UI';
import { Layout } from '../widgets/App';
import { AddRecipeModal, IRecipe, useRecipe } from '../widgets/Recipes';

const Recipes: FC = () => {
  const { recipes, onGetRecipes, recipeLoading } = useRecipe();

  const onRefresh = async () => {
    await onGetRecipes([]);
  };

  return (
    <Layout headerProps={{ children: 'Рецепты' }}>
      <Gap y={5} />
      <AddRecipeModal />
      <Gap y={7} />
      <ListWithInput
        search={(arr, query) =>
          arr.length > 0
            ? (arr as IRecipe[]).filter((el) => el?.name?.includes(query))
            : []
        }
        inputPlaceholder='Поиск по названию'
        limitForInput={4}
        emptyText='Вы не добавили ни одного рецепта'
        loading={recipeLoading}
        onRefresh={onRefresh}
        data={recipes}
        renderItem={(item) => (
          <Card key={item?.uid}>
            <Title>{item?.name || 'Пустое название'}</Title>
            <Gap y={7} />
            <Flex justify='space-between'>
              <Text>{item?.time} сек</Text>
              <Text>{item?.cost_price} р.</Text>
            </Flex>
          </Card>
        )}
      />
    </Layout>
  );
};

export default memo(Recipes);
