import { AppButton, AppInput, AppPhoneNumber, AppText, Header } from '@component';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import * as yup from 'yup';
import { Formik } from 'formik';
import { UserInfo } from '@interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CaretRight, IconChangePassword, IconCheckCircle, IconDeleteUser, IconPickLocation, IconPlus } from '@assets';
import { CHANGE_PASSWORD, ROOM_UNIT_ADDRESS, YOUR_LISTING } from '@routeName';
import { useNavigation } from '@react-navigation/native';

interface AddSuccessProp { }

interface screenNavigationProp {
  navigate: any;
}

const AddSuccess = (props: AddSuccessProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const roomData: any = useSelector((state: any) => state?.auth?.dataSignup);

  const index = roomData.location.title.lastIndexOf(" ");

  const photo = roomData.list_photo[0].path
  console.log('dataa', roomData);
  const moveToYourListing = () => {
    navigation.navigate(YOUR_LISTING)
  }

  const moveToRoomUnit = () => {
    navigation.navigate(ROOM_UNIT_ADDRESS)
  }

  return (
    <View style={styles.container}>
      <IconCheckCircle style={{ marginTop: scaleHeight(140) }} />
      <AppText style={styles.titile}>{'A New Place Added!'}</AppText>
      <Image style={styles.image} source={{ uri: photo }}></Image>

      <View style={styles.block}>
        <AppText style={styles.bigtext}>{roomData.kind_place.value}</AppText>
        <View style={styles.dot}></View>
        <AppText style={styles.bigtext}>{roomData.room_type.value}</AppText>
      </View>

      <View style={styles.block}>
        <IconPickLocation iconFillColor={colors.textPrimary} />
        <AppText style={styles.placeTxt}>{roomData.location.title.slice(index)}</AppText>
      </View>

      <Pressable style={styles.place} onPress={() => moveToRoomUnit()}>
        <AppText style={styles.addTxt} >{'Add another place'}</AppText>
        <IconPlus />
      </Pressable>

      <AppButton
        title={'Go to Your Listing'}
        size={'small'}
        containerStyle={styles.button}
        iconRight={'arNext'}
        onPress={() => moveToYourListing()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: SIZE.padding,
    alignItems: 'center'
  },
  titile: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    color: colors.primary,
    marginTop: scaleHeight(21),
    marginBottom: scaleHeight(72)

  },
  image: {
    height: scaleHeight(150),
    width: '100%',
    borderRadius: scaleHeight(8),
    marginBottom: scaleHeight(24)
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textSecondPrimary,
    marginHorizontal: scaleHeight(10)
  },
  bigtext: {
    fontSize: scaleSize(18),
    color: colors.textPrimary,
    ...fontFamily.fontCampWeight500,
  },
  placeTxt: {
    fontSize: scaleSize(18),
    color: colors.textPlace,
    ...fontFamily.fontWeight500,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(8)
  },
  addTxt: {
    fontSize: scaleSize(16),
    color: colors.primary,
    ...fontFamily.fontWeight600,
    marginRight: scaleHeight(8)
  },
  button: {
    position: 'absolute',
    left: SIZE.padding,
    right: SIZE.padding,
    bottom: SIZE.medium_space,
  },
  place: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SIZE.medium_space * 3,
    flexDirection: 'row'
  }
}

);

export { AddSuccess };
