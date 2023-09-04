import React, { FC, memo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { IScreen, ListWithInput } from '../shared';
import { Flex, Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import {
  AddRecipeModal,
  IRecipe,
  RecipeItem,
  useRecipe,
} from '../widgets/Recipes';
import { routes } from '../widgets/App/types';

const Recipes: FC<IScreen> = ({ navigation }) => {
  const {
    recipes,
    onGetRecipes,
    recipeLoading,
    onUpdateRecipe,
    onSearchRecipes,
  } = useRecipe();
  const [activeRecipe, setActiveRecipe] = useState<IRecipe | null>(null);

  const onRefresh = async () => {
    await onGetRecipes([]);
  };

  const onClearTrash = async (): Promise<void> => {
    const promises = recipes
      .filter((el) => el.inTrash > 0)
      .map(
        async (el) =>
          await onUpdateRecipe({ uid: el.uid, inTrash: 0 } as IRecipe)
      );

    await Promise.all(promises);
  };

  const onSearch = async (query: string): Promise<void> => {
    await onSearchRecipes(query, true, 50);
  };

  const itemCountInTrash = recipes.reduce((acc, cur) => acc + cur.inTrash, 0);

  return (
    <Layout headerProps={{ children: 'Рецепты' }}>
      <Gap y={5} />
      <AddRecipeModal
        onClose={() => setActiveRecipe(null)}
        recipe={activeRecipe}
      />
      <Gap y={7} />
      <ListWithInput
        onSearch={onSearch}
        inputPlaceholder='Поиск по названию'
        limitForInput={4}
        emptyText='Вы не добавили ни одного рецепта'
        loading={recipeLoading}
        onRefresh={onRefresh}
        data={recipes}
        renderItem={(item) => (
          <RecipeItem
            setActiveRecipe={setActiveRecipe}
            recipe={item}
            key={item?.uid}
          />
        )}
      />
      <Flex>
        <TouchableOpacity style={styles.bottom_btn} onPress={onClearTrash}>
          <Text>Очистить корзину</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottom_btn}
          // @ts-ignore
          onPress={() => navigation.navigate(routes.trash)}
        >
          <Text>Корзина {itemCountInTrash > 0 ? itemCountInTrash : ''}</Text>
        </TouchableOpacity>
      </Flex>
    </Layout>
  );
};

const styles = StyleSheet.create({
  bottom_btn: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
});

export default memo(Recipes);
