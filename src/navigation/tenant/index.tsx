import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {
  VERIFY_ACCOUNT,
  VERIFY_CODE,
  ROOM_UNIT_ADDRESS,
  ROOM_UNIT_GALLERY,
  ROOM_UNIT_KIND_PLACE,
  ROOM_UNIT_PLACE_OFFER,
  ROOM_UNIT_PRICE,
  ROOM_UNIT_TYPE_ROOM,
  YOUR_LISTING,
  ACCOUNT_SETTING,
  BASIC_INFORMATION,
  CHANGE_PASSWORD,
  PROFILE_LIFE_STYLE,
  PROFILE,
  ROOM_DETAIL,
  ROOM_DETAIL_LOCATION,
  ROOM_DETAIL_GELLERY,
  ADD_SUCCESS,
  TABBAR,
} from '../routeName';

import {
  RoomUnitGallery,
  RoomUnitAddress,
  RoomUnitPlaceOffer,
  RoomUnitPrice,
  RoomUnitTypeRoom,
  VerifyAccount,
  VerifyCode,
  YourListing,
  AccountSetting,
  BasicInfomation,
  ChangePassword,
  ProfileLifeStyle,
  Profile,
  RoomDetail,
  RoomDetailLocation,
  RoomDetailGallery,
  RoomUnitKindPlace,
  AddSuccess,
} from '../../screens';
import {TenantBottomTabs} from './TenantBottomTabs';

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const TenantStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={TABBAR} component={TenantBottomTabs} />
      <Stack.Screen name={PROFILE} component={Profile} />
      <Stack.Screen name={VERIFY_ACCOUNT} component={VerifyAccount} />
      <Stack.Screen name={VERIFY_CODE} component={VerifyCode} />
      <Stack.Screen name={BASIC_INFORMATION} component={BasicInfomation} />
      <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={ACCOUNT_SETTING} component={AccountSetting} />
      <Stack.Screen name={PROFILE_LIFE_STYLE} component={ProfileLifeStyle} />
    </Stack.Navigator>
  );
};

export default TenantStack;
