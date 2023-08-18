import React, { FC, memo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { AccentButton, Button, Gap, Input, Title } from '../../../UI';
import { useTheme } from '../../../shared';
import { useRecipe } from '../useRecipes';
import { where } from 'firebase/firestore';
import { IRecipe } from '../types';

const AddRecipeModal: FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { backgroundColor } = useTheme();

  const { onGetRecipes, onAddRecipe } = useRecipe();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [time, setTime] = useState('');
  const [weight, setWeight] = useState('');

  const onConfirmModal = async (): Promise<void> => {
    const result = await onGetRecipes([where('name', '==', name)], 10, false);
    if (result.result.length === 0) {
      await onAddRecipe({
        description,
        name,
        cost_price: +costPrice,
        time: +time,
        weight: +weight,
      } as IRecipe);
    }
    bottomSheetRef?.current?.close();
  };

  return (
    <>
      <Button
        style={styles.button}
        onPress={() => bottomSheetRef?.current?.snapToIndex(0)}
      >
        <Title textColor='dark' size='small'>
          Добавить рецепт
        </Title>
      </Button>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['75%', '100%']}
        containerStyle={{ zIndex: 2 }}
        enablePanDownToClose
        style={{ paddingHorizontal: 12 }}
        backgroundStyle={{ backgroundColor }}
      >
        <>
          <Input value={name} setValue={setName} placeholder='Название' />
          <Gap y={5} />
          <Input
            value={description}
            setValue={setDescription}
            placeholder='Описание'
          />
          <Gap y={5} />
          <Input
            value={costPrice}
            setValue={setCostPrice}
            placeholder='Себестоимость'
          />
          <Gap y={5} />
          <Input
            value={time}
            setValue={setTime}
            placeholder='Время приготовления'
          />
          <Gap y={5} />
          <Input
            value={weight}
            setValue={setWeight}
            placeholder='Кол-во грамм'
          />
          <Gap y={5} />
          <AccentButton onPress={onConfirmModal}>Подтвердить</AccentButton>
        </>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  namesContainer: {
    marginVertical: 14,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default memo(AddRecipeModal);
