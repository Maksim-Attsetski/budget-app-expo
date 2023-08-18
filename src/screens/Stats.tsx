import React, { FC, memo, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Card, Gap, LineChart, Title } from '../UI';
import { colors, screen, useFirestore } from '../shared';
import { Layout } from '../widgets/App';
import { IBudget } from '../widgets/Budget';
import { IClient } from '../widgets/Clients';

const defaultData = { lines: [], labels: [] };
const Stats: FC = () => {
  const fbClients = useFirestore('zefirka-clients');
  const fbBudget = useFirestore('zefirka-budget');
  const [clientsData, setClientsData] = useState(defaultData);
  const [budgetData, setBudgetData] = useState(defaultData);
  const [clientCount, setClientCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const getClientsData = async () => {
    const response = await fbClients.getAll([], 999);
    const clients = response.result as IClient[];

    const getMonthLabels = (_clients: IClient[]) => {
      const resultObj = { 1: 0 };
      const year = new Date().getFullYear();
      _clients.forEach((item) => {
        const date = new Date(item.createdAt);
        const month = date.getMonth() + 1;

        if (date.getFullYear() === year) {
          resultObj[month] = resultObj[month] ? resultObj[month] + 1 : 1;
        }
      });

      return {
        obj: resultObj,
        data: Object.keys(resultObj).map((key) => ({
          name: key,
          count: resultObj[key],
        })),
      };
    };

    const { data: monthData, obj } = getMonthLabels(clients);
    if (monthData.length === 0) return;

    const data =
      monthData.length === 1
        ? [
            { name: 'Начало', count: 0 },
            monthData[0],
            { name: 'Конец', count: monthData[0].count },
          ]
        : monthData;

    const lines = [
      {
        color: colors?.green,
        data: data.map((el) => el.count),
        label: 'В этом месяце',
      },
    ];

    setClientsData({
      labels: data.map((el) => el.name),
      lines,
    });
    setClientCount(obj[new Date().getMonth() + 1]);
  };

  const getBudgetData = async () => {
    const response = await fbBudget.getAll([], 999);
    const budget = response.result as IBudget[];

    const getMonthData = () => {
      const months = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      };
      const resultObj = {
        dec: { ...months },
        inc: { ...months },
      };
      const year = new Date().getFullYear();
      budget.forEach((item) => {
        const date = new Date(item.createdAt);
        const month = date.getMonth() + 1;

        if (date.getFullYear() === year) {
          resultObj[item.type][month] = resultObj?.[item.type]?.[month]
            ? resultObj?.[item.type]?.[month] + item.value
            : item.value;
        }
      });

      return {
        dec: Object.keys(resultObj.dec).map((key) => ({
          name: key,
          count: resultObj.dec[key],
        })),
        inc: Object.keys(resultObj.inc).map((key) => ({
          name: key,
          count: resultObj.inc[key],
        })),
      };
    };

    const { dec, inc } = getMonthData();
    const lines = [
      {
        color: colors?.green,
        data: inc.sort((a, b) => +a.name - +b.name).map((el) => el.count),
        label: 'Доходы',
      },
      {
        color: colors?.purple,
        data: dec.sort((a, b) => +a.name - +b.name).map((el) => el.count),
        label: 'Расходы',
      },
    ];

    setBudgetData({
      lines,
      labels: [...new Set([...inc, ...dec].map((el) => el.name))].sort(
        (a, b) => +a - +b
      ),
    });
  };

  const getAllData = async (): Promise<void> => {
    try {
      setLoading(true);
      await getClientsData();
      await getBudgetData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Layout headerProps={{ children: 'Статистика' }}>
      <FlatList
        data={[]}
        renderItem={() => <></>}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={getAllData}
        ListHeaderComponent={
          <>
            <Gap y={5} />
            <Card loading={loading} style={{ maxHeight: 95 }} rows={2}>
              <Title size='small'>Клиентов в этом месяце </Title>
              <Gap y={5} />
              <Title>{clientCount}</Title>
            </Card>
            <Gap y={5} />
            {loading ? (
              <Card loading rowHeight={40} style={{ maxHeight: 180 }} />
            ) : (
              <Card style={{ paddingHorizontal: 4 }}>
                <LineChart
                  filled
                  lines={clientsData.lines}
                  labels={clientsData.labels}
                  width={screen.width - 20}
                  title='Рост кол-ва клиентов'
                />
              </Card>
            )}
            <Gap y={10} />
            {loading ? (
              <Card loading rowHeight={40} style={{ maxHeight: 180 }} />
            ) : (
              <Card style={{ paddingHorizontal: 4 }}>
                <LineChart
                  lines={budgetData.lines}
                  labels={budgetData.labels}
                  width={screen.width - 20}
                  title='Доходы и рассходы'
                />
              </Card>
            )}
          </>
        }
      />
    </Layout>
  );
};

export default memo(Stats);
