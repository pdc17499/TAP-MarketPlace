import React, {ReactElement} from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import Item from './ItemGesture';
import {COL, Positions, ITEM_SIZE} from './Config';
import {StyleSheet} from 'react-native';

interface ListProps {
  children: ReactElement<{id: string}>[];
  editing: boolean;
  onDragEnd: (diff: Positions) => void;
}

const List = ({children, editing, onDragEnd}: ListProps) => {
  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children?.map((child, index) => ({[child.props.id]: index})),
    ),
  );
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });
  return (
    <Animated.ScrollView
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={[
        styles.reOrder,
        {height: Math.ceil(children.length / COL) * ITEM_SIZE},
      ]}
      showsVerticalScrollIndicator={false}
      bounces={false}
      horizontal={false}
      scrollEventThrottle={16}>
      {children?.map(child => {
        return (
          <Item
            key={child.props.id}
            positions={positions}
            id={child.props.id}
            editing={editing}
            onDragEnd={onDragEnd}
            scrollView={scrollView}
            scrollY={scrollY}>
            {child}
          </Item>
        );
      })}
    </Animated.ScrollView>
  );
};

export default React.memo(List);

const styles = StyleSheet.create({
  reOrder: {
    marginHorizontal: -4,
    width: '100%',
  },
});
