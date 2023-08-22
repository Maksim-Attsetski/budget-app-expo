import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Card, Flex, Gap, List, Text, Title } from '../UI';
import { IScreen } from '../shared';
import { Layout, routes } from '../widgets/App';
import { IRecipe, TrashBtns, useRecipe } from '../widgets/Recipes';
import { useSetting } from '../widgets/Setting';

const Trash: FC<IScreen> = ({ navigation }) => {
  const { recipes, onGetRecipes, recipeLoading } = useRecipe();
  const { margin, ratePerHour } = useSetting();
  const recipesInTrash = recipes.filter((el) => el.inTrash > 0);

  const totalPrice = recipesInTrash.reduce(
    (prev, cur) => prev + cur.cost_price * cur.inTrash,
    0
  );

  const totalWeight = recipesInTrash.reduce(
    (prev, cur) => prev + cur.weight * cur.inTrash,
    0
  );

  const totalTime = recipesInTrash.reduce(
    (prev, cur) => prev + cur.time * cur.inTrash,
    0
  );

  const laborCost = totalTime * (ratePerHour / 3600);

  const totalProductCost =
    laborCost + totalPrice + (laborCost + totalPrice) * margin;

  return (
    <Layout
      headerProps={{
        children: 'Корзина',
        right: totalProductCost > 0 && (
          // @ts-ignore
          <Button onPress={() => navigation.navigate(routes.clients)}>
            Далее
          </Button>
        ),
      }}
    >
      <>
        <List
          data={recipesInTrash}
          emptyText='Пустая корзина'
          loading={recipeLoading}
          onRefresh={onGetRecipes}
          ListHeaderComponent={
            totalProductCost > 0 && (
              <>
                <Card style={styles.result}>
                  <Title>Итого</Title>
                  <Gap y={5} />
                  <Text>Себестоимость: {totalPrice} р.</Text>
                  <Text>Общий вес: {totalWeight} гр.</Text>
                  <Text>
                    Готовить: {Math.floor(totalTime / 60)} мин.{' '}
                    {(totalTime % 60).toFixed(0)} сек.
                  </Text>
                  <Text>Готовить: {totalTime} сек.</Text>
                  <Text>Трудозатраты: {laborCost} р.</Text>
                  <Gap y={5} />
                  <Title size='small' textAlign='left'>
                    Итоговая стоимость: {Math.ceil(totalProductCost)} р.
                  </Title>
                </Card>
                <Gap y={10} />
              </>
            )
          }
          ListFooterComponent={
            <>
              <Gap y={7} />
            </>
          }
          renderItem={({ item }: { item: IRecipe }) => {
            return (
              <Card style={styles.card}>
                <Text>{item.name}</Text>
                <Gap y={5} />
                <TrashBtns recipe={item} />
                <Gap y={5} />
                <Flex>
                  <Text>{item?.cost_price * item?.inTrash} р.</Text>
                  <Text>{item?.time * item?.inTrash} сек.</Text>
                  <Text>{item?.weight * item?.inTrash} гр.</Text>
                </Flex>
              </Card>
            );
          }}
        />
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {},
  flex: {
    width: '100%',
  },
  result: {},
});

export default memo(Trash);
