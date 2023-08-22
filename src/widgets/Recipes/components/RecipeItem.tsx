import React, { FC, memo } from 'react';
import { IRecipe } from '../types';
import { Card, Title, Gap, Flex, Text } from '../../../UI';
import TrashBtns from './TrashBtns';
import { useRecipe } from '../useRecipes';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Svg } from '../../../../assets';

interface IProps {
  recipe: IRecipe;
}

const RecipeItem: FC<IProps> = ({ recipe }) => {
  const { onDeleteRecipe } = useRecipe();

  return (
    <Card style={styles.container}>
      <View style={styles.delete_btn}>
        <TouchableOpacity onPress={() => onDeleteRecipe(recipe.uid)}>
          <Svg.remove size={20} />
        </TouchableOpacity>
      </View>
      <Title size='small'>{recipe?.name || 'Пустое название'}</Title>
      <Gap y={7} />
      <Flex justify='space-between' align='center'>
        <Text style={{ opacity: 0.85 }}>{recipe?.time} сек</Text>
        <Text style={{ opacity: 0.85 }}>{recipe?.cost_price} р.</Text>
        <TrashBtns recipe={recipe} />
      </Flex>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    minHeight: 120,
  },
  delete_btn: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
  },
});

export default memo(RecipeItem);
