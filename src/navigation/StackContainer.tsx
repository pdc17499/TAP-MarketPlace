import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  BASIC_INFORMATION,
  CHANGE_PASSWORD,
  HOME,
  PROFILE,
  ROOM_DETAIL,
  YOUR_LISTING,
} from './routeName';
import {
  Home,
  Profile,
  BasicInfomation,
  ChangePassword,
  YourListing,
  RoomDetail,
} from '../screens';
import {useSelector} from 'react-redux';
import UnAuthenStack from './UnAuthenStack';

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const AuthenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={PROFILE}>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={PROFILE} component={Profile} />
      <Stack.Screen name={BASIC_INFORMATION} component={BasicInfomation} />
      <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={YOUR_LISTING} component={YourListing} />
      <Stack.Screen name={ROOM_DETAIL} component={RoomDetail} />
    </Stack.Navigator>
  );
};

//main stack app
const NavigationApp = React.forwardRef((props: any, ref: any) => {
  let token = useSelector((state: any) => state?.auth?.token);
  console.log({token});

  const renderStackApp = () => {
    if (!token) {
      return <UnAuthenStack />;
    } else {
      return <AuthenStack />;
    }
  };
  return (
    <NavigationContainer ref={ref}>{renderStackApp()}</NavigationContainer>
  );
});

export default NavigationApp;
