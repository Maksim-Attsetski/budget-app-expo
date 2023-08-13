import React, { FC, memo } from 'react';
import { FlexStyle, View, ViewProps } from 'react-native';

interface IProps extends ViewProps {
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

const Flex: FC<IProps> = ({ justify = 'center', ...props }) => {
  return (
    <View
      {...props}
      style={
        props.style
          ? []
          : [
              {
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 20,
                justifyContent: justify,
              },
            ]
      }
    >
      {props.children}
    </View>
  );
};

export default memo(Flex);
