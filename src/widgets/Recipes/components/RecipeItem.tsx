import React, { FC, memo } from 'react';
import { IRecipe } from '../types';
import { Card, Title, Gap, Flex, Text } from '../../../UI';
import TrashBtns from './TrashBtns';
import { useRecipe } from '../useRecipes';

interface IProps {
  recipe: IRecipe;
}

const RecipeItem: FC<IProps> = ({ recipe }) => {
  const { onDeleteFromTrash, onAddToTrash, trash } = useRecipe();

  const onPressMinus = (): void => {
    onDeleteFromTrash(recipe.uid);
  };
  const onPressPlus = (): void => {
    onAddToTrash(recipe);
  };

  return (
    <Card style={{ maxHeight: 120, height: 120 }}>
      <Title>{recipe?.name || 'Пустое название'}</Title>
      <Gap y={7} />
      <Flex justify='space-between' align='center'>
        <Text style={{ opacity: 0.85 }}>{recipe?.time} сек</Text>
        <Text style={{ opacity: 0.85 }}>{recipe?.cost_price} р.</Text>
        <TrashBtns
          count={trash.find((el) => el.recipe.uid === recipe?.uid)?.count ?? 0}
          onMinus={onPressMinus}
          onPlus={onPressPlus}
        />
      </Flex>
    </Card>
  );
};

export default memo(RecipeItem);
