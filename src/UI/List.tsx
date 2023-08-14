import React, { FC, memo } from 'react';
import { FlatList, FlatListProps } from 'react-native';

import Gap from './Gap';
import Card from './Card';
import Empty from './Empty';

interface IProps extends FlatListProps<any> {
  emptyText: string;
  loading?: boolean;
  loadingText?: string;
  rows?: number;
  rowHeight?: number;
  maxHeight?: number;
}

const List: FC<IProps> = ({
  loadingText,
  emptyText,
  loading = false,
  rows = 5,
  rowHeight = 50,
  maxHeight = 370,
  ...props
}) => {
  return (
    <>
      {loading ? (
        <Card
          loading
          style={{ maxHeight }}
          rows={rows}
          rowHeight={rowHeight}
          loadingText={loadingText}
        />
      ) : (
        <FlatList
          {...props}
          ItemSeparatorComponent={() => <Gap y={7} />}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          ListEmptyComponent={<Empty>{emptyText}</Empty>}
        />
      )}
    </>
  );
};

export default memo(List);
