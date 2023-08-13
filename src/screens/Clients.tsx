import React, { FC, Fragment, memo, useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Card, Gap, Input, RefreshInput } from '../UI';
import { Layout } from '../widgets/App';
import { AddClientModal, ClientItem, useClients } from '../widgets/Clients';
import { useOrders } from '../widgets/Orders';

const { width } = Dimensions.get('window');

const offsetY = width / 2;
const inputSize = 48;

const Clients: FC = () => {
  const { clients, onGetClients, setClientModalVisible, clientLoading } =
    useClients();
  const { onGetOrders, orderLoading } = useOrders();

  const scrollY = useSharedValue(0);
  const containerRef = useRef<Animated.ScrollView>();
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const searchUsers = clients.filter((item) =>
    (item.name + item.lastname).includes(query)
  );
  const isNeedInput = searchUsers.length > 2;

  const onInputFocus = (): void => {
    setIsFocused(true);
  };
  const onInputBlur = (): void => {
    setIsFocused(false);
  };

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
      },
    },
    [setIsFocused]
  );

  const onScrollEnd = (e: any) => {
    const newValue = e.nativeEvent.contentOffset.y;
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
      <>
        <>
          <Gap y={5} />
          <AddClientModal mKey='clients_page_modal' />
          <Gap y={5} />
          {isNeedInput && !isFocused ? (
            <RefreshInput
              placeHolder={
                query.length > 0 ? query : 'Введите имя пользователя'
              }
              scrollY={scrollY}
              inputSize={inputSize}
              offsetY={width}
              onFocus={onInputFocus}
            />
          ) : (
            <Input
              inversed
              placeholder='Введите имя пользователя'
              setValue={setQuery}
              value={query}
              onBlur={onInputBlur}
              autoFocus
            />
          )}
          <Gap y={5} />
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
              <View onTouchStart={onInputBlur}>
                {searchUsers.map((item, inx) => (
                  <Fragment key={inx}>
                    <Gap y={3} />
                    <ClientItem orderLoading={orderLoading} item={item} />
                    <Gap y={3} />
                  </Fragment>
                ))}
              </View>
            )}
          </Animated.ScrollView>
        </>
      </>
    </Layout>
  );
};

export default memo(Clients);
