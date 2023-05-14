import React, { FC, memo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { BottomSheet, Button, Gap, Text } from '../UI';
import { Layout } from '../widgets/App';
import { ClientItem, useClients } from '../widgets/Clients';

const Clients: FC = () => {
  const { clients } = useClients();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Layout>
      <Gap y={5} />
      <Button onPress={() => setIsOpen((p) => !p)}>Open</Button>
      <Gap y={5} />
      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <View>
          <Text>Content</Text>
        </View>
      </BottomSheet>
      <Gap y={5} />
      <FlatList
        data={clients}
        ItemSeparatorComponent={() => <Gap y={7} />}
        renderItem={({ item }) => <ClientItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
      <Gap y={45} />
    </Layout>
  );
};

export default memo(Clients);
