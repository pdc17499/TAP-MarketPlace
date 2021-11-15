import { CaretRight, IconHouseLine, IconSetting, IconShieldCheck, IconThumbsUp, IconUser } from '@assets';
import { AppText } from '@component';
import { colors, fontFamily, scaleSize, scaleWidth, SIZE } from '@util';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface ListProfileProps {

}

const ListProfile = React.memo((props: ListProfileProps) => {

  const DATA = [
    {
      id: 1,
      title: 'Your Listing',
      icon: <IconHouseLine />
    },
    {
      id: 2,
      title: 'Basic Infomation',
      icon: <IconUser />
    },
    {
      id: 3,
      title: 'Lifestyle & Preferences',
      icon: <IconThumbsUp />
    },
    {
      id: 4,
      title: 'Account Setting',
      icon: <IconSetting />
    },

  ]

  const renderItem = ({ item }: any) => (
    <View style={{ height: 70 }}>
      <View style={styles.item}>
        {item.icon}
        <AppText style={styles.title}>{item.title}</AppText>
        <CaretRight />
      </View>
    </View>
  )

  return (
    <>
      <FlatList
        style={styles.flatList}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      />
      <View style={{ height: 80 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <IconShieldCheck />
          <AppText style={styles.verify}>{'Verify my account'}</AppText>
        </View>
        <View style={styles.borderBottom} />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  txtStyle: {
    ...fontFamily.fontWeight400,
    fontSize: SIZE.base_size,
    color: colors.textPrimary,
  },
  title: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.textFouthPrimary,
    marginLeft: scaleWidth(20),
    width: '82%'
  },
  borderBottom: {
    height: 1,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
    marginTop: scaleWidth(25)

  },
  verify: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.textPrimary,
    marginLeft: scaleWidth(20),
    width: '86%'
  },
  flatList: {
    borderTopWidth: 1, borderTopColor: colors.borderProfileList, paddingTop: scaleWidth(20)
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderProfileList,
    paddingBottom: scaleWidth(20)
  }
});

export { ListProfile };
