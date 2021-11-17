import { IconCheckedBox, IconUncheckedBox } from "@assets";
import { isTaggedTemplateExpression } from "@babel/types";
import { AppText } from "@component";
import { scaleWidth } from "@util";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

interface ModalCheckedBoxProps {
  data: any
}

export const ModalCheckedBox = (props: ModalCheckedBoxProps) => {
  const {
    data
  } = props;

  const [selectedItem, setSelectedItem] = useState([])

  const checkBox = (item: any) => {
    const num = selectedItem.push(item)
    console.log('select', selectedItem)
    setSelectedItem([...selectedItem])
  }

  const unCheckBox = (index: number) => {
    selectedItem.splice(index, 1)
    setSelectedItem([...selectedItem])
  }

  return (
    <View style={{ width: scaleWidth(250) }}>
      {data.map((item: any) => {
        const index = selectedItem.findIndex((e: any) => e.value === item.value)
        console.log('index', index);

        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: scaleWidth(15), }}>
            <AppText style={styles.modalTxt}>{item.value}</AppText>
            {
              index !== -1
                ? <Pressable onPress={() => unCheckBox(index)}>
                  <IconCheckedBox />
                </Pressable>
                : <Pressable onPress={() => checkBox(item)}>
                  <IconUncheckedBox />
                </Pressable>
            }
          </View>
        )
      }
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  modalTxt: {
    marginRight: scaleWidth(15),
    alignSelf: 'center'
  }
})

