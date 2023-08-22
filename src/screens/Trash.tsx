import React, { FC, memo, useEffect, useState } from 'react';
import { Layout } from '../widgets/App';
import { Card, Flex, List, Text } from '../UI';
import { IRecipe, TrashBtns, useRecipe } from '../widgets/Recipes';

const Trash: FC = () => {
  const { recipes, onGetRecipes, recipeLoading } = useRecipe();
  const recipesInTrash = recipes.filter((el) => el.inTrash > 0);

  return (
    <Layout headerProps={{ children: 'Корзина' }}>
      <List
        data={recipesInTrash}
        emptyText='Пустая корзина'
        loading={recipeLoading}
        onRefresh={onGetRecipes}
        renderItem={({ item }: { item: IRecipe }) => (
          <Card style={{ minHeight: 70 }}>
            <Flex justify='space-between' align='center'>
              <Text>{item?.name}</Text>
              <TrashBtns recipe={item} />
            </Flex>
          </Card>
        )}
      />
    </Layout>
  );
};

export default memo(Trash);
