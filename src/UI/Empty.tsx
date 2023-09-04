import React, { FC, PropsWithChildren, memo } from 'react';

import Text from './Text';
import Card from './Card';
import Title from './Title';
import Gap from './Gap';

const Empty: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card>
      <Title size='small'>Ничего не найдено</Title>
      {children && (
        <>
          <Gap y={7} />
          <Text style={{ textAlign: 'center' }}>{children}</Text>
        </>
      )}
    </Card>
  );
};

export default memo(Empty);
