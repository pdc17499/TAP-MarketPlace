import {AppButton, AppText} from '@component';
import {AppQAProps, mockProps} from '@interfaces';
import {fontFamily, scaleWidth, SIZE} from '@util';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const AppQA = React.memo((props: AppQAProps) => {
  const {
    data,
    title,
    selected,
    typeList,
    children,
    isMultiChoice,
    customStyleTitle,
    onSelect,
  } = props;
  const listStyle = typeList === 'row' ? styles.listRow : {};
  const itemStyle = typeList === 'row' ? styles.itemRow : styles.itemColumn;

  return (
    <>
      <AppText style={[styles.title, customStyleTitle]}>{title}</AppText>
      <View style={listStyle}>
        {data.map((item: mockProps) => {
          const isActive =
            isMultiChoice && selected?.length > 0
              ? selected.findIndex(
                  (itm: mockProps) => item.value == itm?.value,
                ) > -1
              : item.value == selected?.value;
          return (
            <View key={item.id}>
              <AppButton
                onPress={() => onSelect(item)}
                isActive={isActive}
                typeButton={'linear'}
                title={item.value}
                customStyleButton={itemStyle}
              />
              {children}
            </View>
          );
        })}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  listRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: -SIZE.base_space,
  },
  itemRow: {
    paddingHorizontal: SIZE.padding,
    marginRight: SIZE.base_space,
    marginBottom: SIZE.base_space,
  },
  itemColumn: {
    marginBottom: SIZE.base_space,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding,
    marginTop: SIZE.padding,
    maxWidth: scaleWidth(240),
  },
});

export {AppQA};
