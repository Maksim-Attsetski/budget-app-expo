import React, {
  FC,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { Card, Gap, RefreshInput, Text } from '../UI';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const offsetY = width / 2;
const inputSize = 48;

const Clients: FC = () => {
  const { clients, onGetClients, setClientModalVisible, clientLoading } =
    useClients();
  const { onGetOrders, orderLoading } = useOrders();

  const [query, setQuery] = useState<string>('');
  const scrollY = useSharedValue(0);
  const containerRef = useRef<Animated.ScrollView>();

  const searchUsers = clients.filter((item) =>
    (item.name + item.lastname).includes(query)
  );
  const isNeedInput = searchUsers.length > 2;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const onScrollEnd = (e: any) => {
    const newValue = e.nativeEvent.contentOffset.y;
    console.log(newValue, offsetY);

    if (containerRef.current && newValue < offsetY) {
      if (newValue < inputSize * 1.3) {
        onGetClients();
      }

      setTimeout(() => {
        // @ts-ignore
        containerRef.current.scrollTo({ animated: true, x: 0, y: offsetY });
      }, 200);
    }
  };

  useEffect(() => {
    setClientModalVisible('');
    onGetClients();
  }, []);

  useEffect(() => {
    if (clients && clients?.length > 0) {
      onGetOrders(clients.map((el) => el.uid));
    }
  }, [clients]);

  useEffect(() => {
    isNeedInput &&
      containerRef.current.scrollTo({ animated: true, x: 0, y: offsetY });
  }, [clients, isNeedInput]);

  return (
    <Layout>
      <Gap y={5} />
      <AddClientModal mKey='clients_page_modal' />
      <Gap y={5} />
      {isNeedInput && (
        <>
          <RefreshInput
            placeHolder='Введите имя пользователя'
            setValue={setQuery}
            value={query}
            scrollY={scrollY}
            inputSize={inputSize}
            offsetY={width}
          />
          <Gap y={5} />
        </>
      )}
      <Animated.ScrollView
        onScroll={scrollHandler}
        onScrollEndDrag={onScrollEnd}
        // @ts-ignore
        ref={containerRef}
      >
        {isNeedInput && !clientLoading && (
          <View style={{ width: '100%', height: offsetY }} />
        )}
        {clientLoading ? (
          <>
            <Card style={{ maxHeight: 130 }} loading />
            <Gap y={5} />
            <Card style={{ maxHeight: 130 }} loading />
          </>
        ) : (
          searchUsers.map((item, inx) => (
            <Fragment key={inx}>
              <Gap y={3} />
              <ClientItem orderLoading={orderLoading} item={item} />
              <Gap y={3} />
            </Fragment>
          ))
        )}
      </Animated.ScrollView>
    </Layout>
  );
};

export default memo(Clients);
