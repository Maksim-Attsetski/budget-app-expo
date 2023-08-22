import React, { FC, memo, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Flex, Text } from '../../../UI';
import { colors } from '../../../shared';
import { Svg } from '../../../../assets';
import { useRecipe } from '../useRecipes';
import { IRecipe } from '../types';

interface IProps {
  maxCount?: number;
  recipe: IRecipe;
}

const TrashBtns: FC<IProps> = ({ maxCount = 50, recipe }) => {
  const { onUpdateRecipe } = useRecipe();
  const styles = getStyles(colors);

  const onPressMinus = async (): Promise<void> => {
    if (recipe?.inTrash > 0) {
      await onUpdateRecipe({
        inTrash: recipe.inTrash - 1,
        uid: recipe.uid,
      } as IRecipe);
    }
  };

  const onPressPlus = async (): Promise<void> => {
    if (recipe?.inTrash < maxCount) {
      await onUpdateRecipe({
        inTrash: recipe.inTrash + 1,
        uid: recipe.uid,
      } as IRecipe);
    }
  };

  return (
    <Flex>
      <Flex style={styles.view} align='center'>
        <TouchableOpacity onPress={onPressMinus}>
          <Svg.minus />
        </TouchableOpacity>
        {recipe?.inTrash > 0 && <Text>{recipe?.inTrash}</Text>}
        <TouchableOpacity onPress={onPressPlus}>
          <Svg.minus isPlus />
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
};

const getStyles = (_colors: typeof colors) =>
  StyleSheet.create({
    view: {
      backgroundColor: _colors?.white,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 20,
      height: 40,
    },
    text: {
      fontSize: 22,
      fontWeight: 'bold',
    },
  });

export default memo(TrashBtns);
