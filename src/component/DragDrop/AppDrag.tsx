import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MARGIN} from './Config';
import SortableList from './SortableList';

const AppDrag = ({children, onDragFinish, isEdit = true}: any) => {
  return (
    <SortableList
      editing={isEdit}
      onDragEnd={positions => onDragFinish && onDragFinish(positions)}>
      {children}
    </SortableList>
  );
};

export default React.memo(AppDrag);
