import React, { FC, Fragment, memo, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';

import { colors, dateHelper } from '../shared';
import { Card, Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import { useBudget } from '../widgets/Budget';

const History: FC = () => {
  const { budget, setBudget, budgetLoading } = useBudget();

  useEffect(() => {
    setBudget();
  }, []);

  return (
    <Layout>
      <Gap y={10} />
      {budgetLoading ? (
        <FlatList
          ListHeaderComponent={
            <>
              <Text
                style={{ fontSize: 24, textAlign: 'center', fontWeight: '700' }}
              >
                Грузим историю...
              </Text>
              <Gap y={10} />
            </>
          }
          scrollEnabled
          ItemSeparatorComponent={() => <Gap y={7} />}
          showsVerticalScrollIndicator={false}
          refreshing
          onRefresh={() => {}}
          data={[1, 2, 3]}
          renderItem={({ item }) => (
            <Card style={{ maxHeight: 130 }} key={item} loading />
          )}
        />
      ) : (
        <FlatList
          scrollEnabled
          ItemSeparatorComponent={() => <Gap y={7} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>История пуста</Text>}
          refreshing={budgetLoading}
          onRefresh={setBudget}
          data={budget}
          renderItem={({ item }) => (
            <Card key={item.uid}>
              <Text
                style={{
                  color: item.type === 'inc' ? colors.green : colors.purple,
                  fontSize: 22,
                }}
              >
                {item.type === 'inc' ? '+' : '-'} {item.value} р.
              </Text>
              {item.description && (
                <>
                  <Gap y={7} />
                  <Text>{item.description}</Text>
                </>
              )}
              <Gap y={7} />
              <Text>{dateHelper.getBeautifulDate(item.date, '.')} </Text>
            </Card>
          )}
        />
      )}
    </Layout>
  );
};

export default memo(History);
