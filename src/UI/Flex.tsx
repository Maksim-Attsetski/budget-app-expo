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
}

const Flex: FC<IProps> = ({
  justify = 'center',
  align = 'baseline',
  ...props
}) => {
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
                alignItems: align,
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
