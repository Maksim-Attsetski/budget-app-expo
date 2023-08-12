import React, { FC, Fragment, memo, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { colors, dateHelper } from '../shared';
import { Card, Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import { useBudget } from '../widgets/Budget';

const History: FC = () => {
  const { budget, setBudget } = useBudget();

  useEffect(() => {
    setBudget();
  }, []);

  return (
    <Layout>
      <Gap y={10} />
      <ScrollView>
        {budget
          .filter((el) => el.uid)
          .map((el) => (
            <Fragment key={el.uid}>
              <Card>
                <Text
                  style={{
                    color: el.type === 'inc' ? colors.green : colors.purple,
                    fontSize: 22,
                  }}
                >
                  {el.type === 'inc' ? '+' : '-'} {el.value} р.
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
