import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {
  VERIFY_ACCOUNT,
  VERIFY_CODE,
  ACCOUNT_SETTING,
  BASIC_INFORMATION,
  CHANGE_PASSWORD,
  PROFILE_LIFE_STYLE,
  PROFILE,
  TABBAR,
  SEARCHING_FILTER,
  ROOM_DETAIL_LOCATION,
} from '../routeName';

import {
  VerifyAccount,
  VerifyCode,
  AccountSetting,
  BasicInfomation,
  ChangePassword,
  ProfileLifeStyle,
  Profile,
  SearchingFilter,
  RoomDetailLocation,
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
      <Stack.Screen name={SEARCHING_FILTER} component={SearchingFilter} />
      <Stack.Screen
        name={ROOM_DETAIL_LOCATION}
        component={RoomDetailLocation}
      />
    </Stack.Navigator>
  );
};

export default TenantStack;
