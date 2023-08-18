import React, { FC, memo } from 'react';

import { colors, dateHelper } from '../shared';
import { Card, Gap, List, Text } from '../UI';
import { Layout } from '../widgets/App';
import { useBudget } from '../widgets/Budget';

const History: FC = () => {
  const { budget, setBudget, budgetLoading } = useBudget();

  return (
    <Layout headerProps={{ children: 'История' }}>
      <Gap y={10} />
      <List
        emptyText='Пустая история'
        loadingText='Подгружаем историю'
        loading={budgetLoading}
        refreshing={budgetLoading}
        onRefresh={setBudget}
        data={budget}
        renderItem={({ item }) => (
          <Card key={item.uid}>
            <Text
              style={{
                color: item.type === 'inc' ? colors?.green : colors?.purple,
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
            <Text>{dateHelper.getBeautifulDate(item.createdAt, '.')} </Text>
          </Card>
        )}
      />
    </Layout>
  );
};

export default memo(History);
