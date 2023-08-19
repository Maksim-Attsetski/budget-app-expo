import React, { FC, memo } from 'react';
import { FlexAlignType, FlexStyle, View, ViewProps } from 'react-native';

interface IProps extends ViewProps {
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: FlexAlignType;
  gap?: number;
}

const Flex: FC<IProps> = ({
  justify = 'center',
  align = 'baseline',
  gap = 20,
  ...props
}) => {
  return (
    <View
      {...props}
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap,
          alignItems: align,
          justifyContent: justify,
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};

export default memo(Flex);
