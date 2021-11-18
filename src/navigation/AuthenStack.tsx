import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
  VERIFY_ACCOUNT,
  VERIFY_CODE,
  ROOM_UNIT_ADDRESS,
  ROOM_UNIT_FURNISHING,
  ROOM_UNIT_GALLERY,
  ROOM_UNIT_KIND_PLACE,
  ROOM_UNIT_LEASE_PERIOD,
  ROOM_UNIT_PLACE_OFFER,
  ROOM_UNIT_PRICE,
  ROOM_UNIT_TYPE_ROOM,
  YOUR_LISTING,
  ACCOUNT_SETTING,
  BASIC_INFORMATION,
  CHANGE_PASSWORD,
  HOME,
  PROFILE_LIFE_STYLE,
  PROFILE,
  ROOM_DETAIL,
  ROOM_DETAIL_LOCATION,
} from './routeName';

import {
  RoomUnitGallery,
  RoomUnitAddress,
  RoomUnitFurnishing,
  RoomUnitLeasePeriod,
  RoomUnitPlaceOffer,
  RoomUnitPrice,
  RoomUnitTypeRoom,
  VerifyAccount,
  VerifyCode,
  YourListing,
  AccountSetting,
  BasicInfomation,
  ChangePassword,
  Home,
  ProfileLifeStyle,
  Profile,
  RoomDetail,
  RoomDetailLocation,
} from '../screens';

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const AuthenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={PROFILE}>
      <Stack.Screen name={VERIFY_ACCOUNT} component={VerifyAccount} />
      <Stack.Screen name={VERIFY_CODE} component={VerifyCode} />
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={PROFILE} component={Profile} />
      <Stack.Screen name={BASIC_INFORMATION} component={BasicInfomation} />
      <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={ACCOUNT_SETTING} component={AccountSetting} />
      <Stack.Screen
        name={PROFILE_LIFE_STYLE}
        component={ProfileLifeStyle}
      />
      <Stack.Screen name={YOUR_LISTING} component={YourListing} />
      <Stack.Screen name={ROOM_DETAIL} component={RoomDetail} />
      <Stack.Screen
        name={ROOM_DETAIL_LOCATION}
        component={RoomDetailLocation}
      />

      {/* Room unit */}
      <Stack.Screen name={ROOM_UNIT_ADDRESS} component={RoomUnitAddress} />
      <Stack.Screen name={ROOM_UNIT_FURNISHING} component={RoomUnitFurnishing} />
      <Stack.Screen name={ROOM_UNIT_GALLERY} component={RoomUnitGallery} />
      <Stack.Screen name={ROOM_UNIT_KIND_PLACE} component={Profile} />
      <Stack.Screen name={ROOM_UNIT_LEASE_PERIOD} component={RoomUnitLeasePeriod} />
      <Stack.Screen name={ROOM_UNIT_PLACE_OFFER} component={RoomUnitPlaceOffer} />
      <Stack.Screen name={ROOM_UNIT_TYPE_ROOM} component={RoomUnitTypeRoom} />
      <Stack.Screen name={ROOM_UNIT_PRICE} component={RoomUnitPrice} />

    </Stack.Navigator>
  );
};

export default AuthenStack;
