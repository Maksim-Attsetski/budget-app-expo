import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { AccentButton, Button, Flex, Gap, Input, Title } from '../../../UI';
import { colors, useTheme } from '../../../shared';
import { useRecipe } from '../useRecipes';
import { where } from 'firebase/firestore';
import { IRecipe } from '../types';

interface IProps {
  recipe?: IRecipe;
  onClose?: () => void;
}

const AddRecipeModal: FC<IProps> = ({ recipe, onClose = () => {} }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { backgroundColor } = useTheme();

  const { onGetRecipes, onAddRecipe, onUpdateRecipe } = useRecipe();

  const [name, setName] = useState<string>(recipe?.name ?? '');
  const [description, setDescription] = useState<string>('');
  const [costPrice, setCostPrice] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const getError = (msg: string) => Alert.alert('Возникла ошибка!', msg);

  const changeModalState = (data?: IRecipe): void => {
    setName(data?.name ?? '');
    setDescription(data?.description ?? '');
    setCostPrice('' + data?.cost_price ?? '');
    setTime('' + data?.time ?? '');
    setWeight('' + data?.weight ?? '');
  };

  const onConfirmModal = async (): Promise<void> => {
    if (name.length < 2) {
      return getError('Название рецепта должно быть длиннее (2-40 символов)');
    }
    if (isNaN(+costPrice)) {
      return getError('Себестоимость должна быть числом');
    }
    if (isNaN(+time)) {
      return getError('Время приготовления должно быть числом');
    }
    if (isNaN(+weight)) {
      return getError('Вес должен быть числом');
    }
    if (+costPrice === 0) {
      return getError('Заполните поле себестоимость');
    }

    const result = await onGetRecipes([where('name', '==', name)], 10, false);
    if (
      recipe &&
      (result.result.length === 0 || result.result[0].name === recipe?.name)
    ) {
      await onUpdateRecipe({
        ...recipe,
        description,
        name,
        cost_price: +costPrice.replaceAll(' ', ''),
        time: +time.replaceAll(' ', '') || 0,
        weight: +weight.replaceAll(' ', '') || 0,
      } as IRecipe);
      changeModalState();
      bottomSheetRef?.current?.close();
      return;
    }

    if (result.result.length === 0) {
      await onAddRecipe({
        description,
        name,
        cost_price: +costPrice.replaceAll(' ', ''),
        time: +time.replaceAll(' ', '') || 0,
        weight: +weight.replaceAll(' ', '') || 0,
      } as IRecipe);
      changeModalState();
    } else {
      return getError('Рецепт с таким именем уже есть');
    }

    bottomSheetRef?.current?.close();
  };

  useEffect(() => {
    if (recipe) {
      changeModalState(recipe);
      bottomSheetRef?.current?.snapToIndex(0);
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [recipe]);

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
        snapPoints={['50%', '100%']}
        containerStyle={{ zIndex: 2 }}
        enablePanDownToClose
        style={{ paddingHorizontal: 12 }}
        backgroundStyle={{ backgroundColor }}
        onClose={onClose}
      >
        <>
          <Input
            value={name}
            maxLength={40}
            setValue={setName}
            placeholder='Название'
          />
          <Gap y={5} />
          <Input
            value={description}
            setValue={setDescription}
            placeholder='Описание'
            multiline
            numberOfLines={2}
            maxLength={400}
          />
          <Gap y={5} />
          <Input
            value={costPrice}
            setValue={setCostPrice}
            placeholder='Себестоимость'
            keyboardType='number-pad'
            maxLength={8}
          />
          <Gap y={5} />
          <Flex justify='space-between'>
            <Input
              value={time}
              setValue={setTime}
              placeholder='Время изг. (сек)'
              keyboardType='number-pad'
              maxLength={5}
            />
            <Input
              value={weight}
              setValue={setWeight}
              placeholder='Кол-во грамм'
              keyboardType='number-pad'
              maxLength={5}
            />
          </Flex>
          <Gap y={5} />
          <AccentButton style={styles.accent_button} onPress={onConfirmModal}>
            Подтвердить
          </AccentButton>
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
  accent_button: {},
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
