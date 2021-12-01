import {IconCheckedBox, IconUncheckedBox} from '@assets';
import {AppModal, AppText} from '@component';
import {ModalCheckedBoxProps} from '@interfaces';
import {fontFamily, scaleHeight, scaleWidth} from '@util';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';

export const ModalCheckedBox = (props: ModalCheckedBoxProps) => {
  const {data, label, selected, onPressDone, name, viewContent, title, error} =
    props;
  const [selectedItem, setSelectedItem] = useState<Array<string>>([]);

  useEffect(() => {
    if (selected?.length > 0) setSelectedItem(selected);
  }, [selected]);

  const onCheck = (isSelected: boolean, item: any) => {
    if (isSelected) {
      const nSelectedItem = selectedItem.filter(
        (itm: string) => item.value !== itm,
      );
      setSelectedItem(nSelectedItem);
    } else {
      selectedItem.push(item.value);
      setSelectedItem([...selectedItem]);
    }
  };

  const onDone = () => {
    if (onPressDone) onPressDone(selectedItem, name);
  };

  return (
    <AppModal
      label={label}
      onPressDone={onDone}
      customTitle={viewContent}
      error={error}
      title={title}>
      <>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {data?.length > 0 &&
            data.map((item: any, index: number) => {
              const isSelected =
                selectedItem.findIndex((e: string) => e === item.value) !== -1;

              return (
                <View style={styles.item} key={item.value}>
                  <AppText style={styles.modalTxt}>{item.value}</AppText>
                  <Pressable onPress={() => onCheck(isSelected, item)}>
                    {isSelected ? <IconCheckedBox /> : <IconUncheckedBox />}
                  </Pressable>
                </View>
              );
            })}
        </ScrollView>
      </>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  modalTxt: {
    marginRight: scaleWidth(15),
    alignSelf: 'center',
    ...fontFamily.fontWeight500,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleWidth(15),
  },
  scrollView: {
    maxHeight: scaleHeight(350),
  },
});
