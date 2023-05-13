import React, { FC, Fragment, memo } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import { useBudget } from '../widgets/Budget';
import { colors, dateHelper } from '../shared';

const History: FC = () => {
  const { budget } = useBudget();

  return (
    <Layout>
      <View>
        <Text>History</Text>
      </View>
      <ScrollView>
        {budget.map((el) => (
          <Fragment key={el.id}>
            <Card>
              <Text
                style={{
                  color: el.type === 'inc' ? colors.green : colors.purple,
                  fontSize: 22,
                }}
              >
                {el.value}
              </Text>
              {el.description && (
                <>
                  <Gap y={7} />
                  <Text>{el.description}</Text>
                </>
              )}
              <Gap y={7} />
              <Text>{dateHelper.getBeautifulDate(el.date, '.')} </Text>
            </Card>
            <Gap y={7} />
          </Fragment>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default memo(History);
