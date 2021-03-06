import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
  CHOOSE_ROLE,
  RESETPASSWORD,
  WELCOME,
  SIGNIN,
  SIGNUP,
  SIGNUP_EMAIL,
  USER_INFORMATION_NAME,
  VERIFY_ACCOUNT,
  VERIFY_CODE,
  USER_INFORMATION_GENDER,
  LIFE_STYLE,
  UPDATE_NEW_PASSWORD,
  ROOM_UNIT_ADDRESS,
  ROOM_UNIT_GALLERY,
  ROOM_UNIT_KIND_PLACE,
  ROOM_UNIT_PLACE_OFFER,
  ROOM_UNIT_PRICE,
  ROOM_UNIT_TYPE_ROOM,
  PREFERENCES,
  AGENCY_INFORMATION_NAME,
  AGENCY_BASIC_INFORMATION,
  INTRODUCE_HOMEOWNER,
} from '../routeName';

import {
  ChooseRole,
  RoomUnitGallery,
  RoomUnitAddress,
  RoomUnitKindPlace,
  RoomUnitPlaceOffer,
  RoomUnitPrice,
  RoomUnitTypeRoom,
  Welcome,
  SignIn,
  ResetPassword,
  SignUp,
  SignUpEmail,
  UserInformationName,
  VerifyAccount,
  VerifyCode,
  UserInformationGender,
  LifeStyle,
  UpdateNewPassword,
  Preferences,
  AgencyInformationName,
  AgencyBasicInformation,
  IntroduceHomeowner
} from '../../screens';

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const UnAuthenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={WELCOME}>
      <Stack.Screen name={WELCOME} component={Welcome} />
      <Stack.Screen name={SIGNIN} component={SignIn} />
      <Stack.Screen name={RESETPASSWORD} component={ResetPassword} />
      <Stack.Screen name={CHOOSE_ROLE} component={ChooseRole} />
      <Stack.Screen name={ROOM_UNIT_ADDRESS} component={RoomUnitAddress} />
      <Stack.Screen name={ROOM_UNIT_GALLERY} component={RoomUnitGallery} />
      <Stack.Screen name={ROOM_UNIT_KIND_PLACE} component={RoomUnitKindPlace} />
      <Stack.Screen
        name={ROOM_UNIT_PLACE_OFFER}
        component={RoomUnitPlaceOffer}
      />
      <Stack.Screen name={ROOM_UNIT_PRICE} component={RoomUnitPrice} />
      <Stack.Screen name={ROOM_UNIT_TYPE_ROOM} component={RoomUnitTypeRoom} />
      <Stack.Screen name={SIGNUP} component={SignUp} />
      <Stack.Screen name={SIGNUP_EMAIL} component={SignUpEmail} />
      <Stack.Screen
        name={USER_INFORMATION_NAME}
        component={UserInformationName}
      />
      <Stack.Screen name={UPDATE_NEW_PASSWORD} component={UpdateNewPassword} />
      <Stack.Screen
        name={USER_INFORMATION_GENDER}
        component={UserInformationGender}
      />
      <Stack.Screen name={LIFE_STYLE} component={LifeStyle} />
      <Stack.Screen name={PREFERENCES} component={Preferences} />
      <Stack.Screen
        name={AGENCY_INFORMATION_NAME}
        component={AgencyInformationName}
      />
      <Stack.Screen
        name={AGENCY_BASIC_INFORMATION}
        component={AgencyBasicInformation}
      />
      <Stack.Screen name={VERIFY_CODE} component={VerifyCode} />
      <Stack.Screen name={VERIFY_ACCOUNT} component={VerifyAccount} />

      <Stack.Screen name={INTRODUCE_HOMEOWNER} component={IntroduceHomeowner} />
    </Stack.Navigator>
  );
};

export default UnAuthenStack;
