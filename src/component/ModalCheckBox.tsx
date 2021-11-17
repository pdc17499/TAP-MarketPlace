import {IconCheckedBox, IconUncheckedBox} from '@assets';
import {AppModal, AppText} from '@component';
import {scaleWidth} from '@util';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';

interface ModalCheckedBoxProps {
  data: any;
  label?: string;
  selected: Array<string>;
  name: string;
  onPressDone?: (list: Array<string>, name: string) => void;
  viewContent?: any;
  title?: string;
}

export const ModalCheckedBox = (props: ModalCheckedBoxProps) => {
  const {data, label, selected, onPressDone, name, viewContent, title} = props;
  const [selectedItem, setSelectedItem] = useState<Array<string>>([]);

  useEffect(() => {
    setSelectedItem(selected);
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
      title={title}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Pressable>
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
        </Pressable>
      </ScrollView>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  modalTxt: {
    marginRight: scaleWidth(15),
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleWidth(15),
  },
  scrollView: {
    width: scaleWidth(250),
    maxHeight: scaleWidth(350),
  },
});
