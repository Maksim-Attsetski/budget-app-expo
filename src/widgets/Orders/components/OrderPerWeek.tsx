import React, { FC, memo, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { where } from 'firebase/firestore';

import { Gap, Text } from '../../../UI';
import { colors, useFirestore, useTypedSelector } from '../../../shared';
import { IOrder } from '../types';

const screenWidth = Dimensions.get('screen').width;

const padding = 5;
const dayCount = 5;
const width = (screenWidth - padding * (2 * dayCount) - 24) / dayCount;
const height = width * 1.4;

const daysData = [
  { name: 'Пн', ids: [], day: 1 },
  { name: 'Вт', ids: [], day: 2 },
  { name: 'Ср', ids: [], day: 3 },
  { name: 'Чт', ids: [], day: 4 },
  { name: 'Пт', ids: [], day: 5 },
  { name: 'Сб', ids: [], day: 6 },
  { name: 'Вс', ids: [], day: 7 },
];

const OrderPerWeek: FC = () => {
  const fbOrders = useFirestore('zefirka-orders');
  const [days, setDays] = useState(daysData);
  const [loading, setLoading] = useState<boolean>(true);
  const { orders: ordersData } = useTypedSelector((s) => s.orders);

  const onCheckOrdersForWeek = async () => {
    setLoading(true);
    const now = new Date();
    now.setHours(0, 0, 0);
    const date = new Date(now.getTime());
    date.setDate(date.getDate() - date.getDay() - 1);
    const minDay = date.getTime();
    date.setDate(date.getDate() + 7);
    const maxDay = date.getTime();

    try {
      const response = await fbOrders.getAll([
        where('dealAt', '>=', minDay),
        where('dealAt', '<=', maxDay),
      ]);
      setDays(
        daysData.map((item) => ({
          ...item,
          ids: (response.result as IOrder[]).filter(
            (order) => new Date(order.dealAt).getDay() === item.day
          ),
        }))
      );
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onCheckOrdersForWeek();
  }, [ordersData]);

  return (
    <View style={{ height }}>
      <FlatList
        horizontal
        data={days}
        refreshing={loading}
        onRefresh={onCheckOrdersForWeek}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Gap x={padding} />}
        renderItem={({ item }) => (
          <View style={styles.day}>
            <Text style={styles.dayText}>{item.name}</Text>
            <Text style={styles.dayText}>{item.ids.length}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  day: {
    width,
    height,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  dayText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default memo(OrderPerWeek);
