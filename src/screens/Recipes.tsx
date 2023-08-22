import React, { FC, memo, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { IScreen, ListWithInput } from '../shared';
import { Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import {
  AddRecipeModal,
  IRecipe,
  RecipeItem,
  useRecipe,
} from '../widgets/Recipes';
import { routes } from '../widgets/App/types';

const Recipes: FC<IScreen> = ({ navigation }) => {
  const { recipes, onGetRecipes, recipeLoading } = useRecipe();

  const onRefresh = async () => {
    await onGetRecipes([]);
  };

  const itemCountInTrash = recipes.reduce((acc, cur) => acc + cur.inTrash, 0);

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
        limitForInput={2}
        emptyText='Вы не добавили ни одного рецепта'
        loading={recipeLoading}
        onRefresh={onRefresh}
        data={recipes}
        renderItem={(item) => <RecipeItem recipe={item} key={item?.uid} />}
      />
      <TouchableOpacity
        style={{
          marginLeft: 'auto',
          marginBottom: 20,
          marginRight: 20,
          backgroundColor: 'white',
          padding: 12,
          borderRadius: 12,
        }}
        // @ts-ignore
        onPress={() => navigation.navigate(routes.trash)}
      >
        <Text>Корзина {itemCountInTrash > 0 ? itemCountInTrash : ''}</Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default memo(Recipes);
