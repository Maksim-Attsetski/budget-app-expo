import React, {
  FC,
  Fragment,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Card, Empty, Gap, Input } from '../../UI';
import RefreshInput from './RefreshInput';
import { Svg } from '../../../assets';
import { useDebounce } from '../hooks';

const { width } = Dimensions.get('window');

const offsetY = width / 2;
const inputSize = 48;

interface IProps {
  onSearch: (query: string) => Promise<any>;
  data: any[];
  renderItem: (item: any, index: number) => ReactNode;
  limitForInput?: number;
  inputPlaceholder?: string;
  loading?: boolean;
  onRefresh?: any;
  emptyText?: string;
}

const ListWithInput: FC<IProps> = ({
  onSearch,
  data,
  renderItem,
  limitForInput = 3,
  inputPlaceholder = '',
  onRefresh = () => {},
  loading = false,
  emptyText = '',
}) => {
  const scrollY = useSharedValue(0);
  const containerRef = useRef<Animated.ScrollView>();
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 500);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isNeedInput = data.length > limitForInput;

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
    if (containerRef?.current && newValue < offsetY) {
      if (newValue < inputSize * 1.3) {
        onRefresh();
      }

      setTimeout(() => {
        // @ts-ignore
        containerRef?.current?.scrollTo?.({ animated: true, x: 0, y: offsetY });
      }, 200);
    }
  };

  useEffect(() => {
    isNeedInput &&
      containerRef?.current?.scrollTo?.({ animated: true, x: 0, y: offsetY });
  }, [isNeedInput]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <>
      {isNeedInput && !isFocused ? (
        <RefreshInput
          placeHolder={query.length > 0 ? query : inputPlaceholder}
          scrollY={scrollY}
          inputSize={inputSize}
          offsetY={width}
          onFocus={onInputFocus}
        />
      ) : (
        <View style={{ position: 'relative' }}>
          <Input
            inversed
            placeholder={inputPlaceholder}
            setValue={setQuery}
            value={query}
            onBlur={onInputBlur}
            autoFocus={isFocused}
          />
          <TouchableOpacity
            style={{ position: 'absolute', top: '25%', right: 15 }}
            onPress={onRefresh}
          >
            <Svg.search />
          </TouchableOpacity>
        </View>
      )}
      <Gap y={5} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        onScrollEndDrag={onScrollEnd}
        ref={containerRef}
      >
        {isNeedInput && !loading && (
          <View style={{ width: '100%', height: offsetY }} />
        )}
        {loading ? (
          <>
            <Card style={{ maxHeight: 130 }} loading />
            <Gap y={5} />
            <Card style={{ maxHeight: 130 }} loading />
          </>
        ) : (
          <View onTouchStart={onInputBlur}>
            {data.length > 0 ? (
              data.map((item, inx) => (
                <Fragment key={inx}>
                  <Gap y={3} />
                  {renderItem(item, inx)}
                  <Gap y={3} />
                </Fragment>
              ))
            ) : (
              <Empty>{emptyText}</Empty>
            )}
          </View>
        )}
      </Animated.ScrollView>
    </>
  );
};

export default memo(ListWithInput);
