import React, { FC, memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Button, Card, Flex, Gap, Text } from '../UI';
import { IScreen, colors, dateHelper } from '../shared';
import { Layout } from '../widgets/App';
import { AddClientModal, useClients } from '../widgets/Clients';

const Client: FC<IScreen> = ({ route }) => {
  // @ts-ignore
  const clientId: string | undefined = route.params?.id;

  const { clients, setClientModalVisible } = useClients();
  const client = clients.find((el) => el.id === clientId);

  return (
    <>
      <AddClientModal />
      <Layout>
        {client && (
          <View>
            <Text style={styles.title}>
              {client.name} {client.lastname}
            </Text>
            <Text style={styles.contacts}>{client.contacts}</Text>
            <Gap y={7} />
            <Flex justify='space-around'>
              <Button
                textProps={{ style: { fontSize: 20 } }}
                onPress={() => setClientModalVisible(client)}
              >
                Добавить заказ
              </Button>
              <Text style={{ fontSize: 20 }}>Заказы</Text>
            </Flex>
            <Gap y={7} />
            <FlatList
              scrollEnabled
              style={{ marginBottom: 100 }}
              data={client.orders}
              ItemSeparatorComponent={() => <Gap y={7} />}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Card key={item.id}>
                  <View style={styles.summaContainer}>
                    <Text>Сумма:</Text>
                    <Text
                      style={{
                        color:
                          item.status === 'success'
                            ? colors.green
                            : item.status === 'wait'
                            ? colors.purple
                            : colors.red,
                      }}
                    >
                      {item.price}
                    </Text>
                  </View>
                  {item.description && (
                    <>
                      <Text>Описание:</Text>
                      <Text> {item.description}</Text>
                    </>
                  )}
                  <Gap y={7} />
                  <Text>{dateHelper.getBeautifulDate(item.dealAt)}</Text>
                </Card>
              )}
            />
          </View>
        )}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 12,
  },
  contacts: {
    fontSize: 20,
    marginVertical: 12,
  },
  summaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default memo(Client);
