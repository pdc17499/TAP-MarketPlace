import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CHOOSE_ROLE,
  HOMEOWNER_PROPERTY,
  RESETPASSWORD,
  WELCOME,
  SIGNIN,
  SIGNUP,
  SIGNUP_EMAIL,
  SIGNUP_PROPERTY,
  VERIFY_ACCOUNT,
  VERIFY_CODE
} from './routeName';
import { ChooseRole, RoomUnitHomeowner, Welcome, SignIn, ResetPassword, SignUp, SignUpEmail, SignUpProperty, VerifyAccount, VerifyCode } from '../screens';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

// unauthenticate stack screens
const UnAuthenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={WELCOME}>
      <Stack.Screen name={CHOOSE_ROLE} component={ChooseRole} />
      <Stack.Screen name={HOMEOWNER_PROPERTY} component={RoomUnitHomeowner} />
      <Stack.Screen name={WELCOME} component={Welcome} />
      <Stack.Screen name={SIGNIN} component={SignIn} />
      <Stack.Screen name={RESETPASSWORD} component={ResetPassword} />
      <Stack.Screen name={SIGNUP} component={SignUp} />
      <Stack.Screen name={SIGNUP_EMAIL} component={SignUpEmail} />
      <Stack.Screen name={SIGNUP_PROPERTY} component={SignUpProperty} />
      <Stack.Screen name={VERIFY_ACCOUNT} component={VerifyAccount} />
      <Stack.Screen name={VERIFY_CODE} component={VerifyCode} />

    </Stack.Navigator>
  );
};

//main stack app
const NavigationApp = React.forwardRef((props: any, ref: any) => {
  const screenOptions = {
    headerShown: false,
  };
  let showScreenIntro = useSelector(
    (state: any) => state?.auth?.showIntroScreen,
  );
  let token = useSelector((state: any) => state?.auth?.token);
  console.log({ token });

  const renderScreenSigned = () => {
    return <Stack.Screen name={SIGNIN} component={SignIn} />;
  };

  const renderStackApp = () => {
    if (!token) {
      return <UnAuthenStack />;
    } else {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          {renderScreenSigned()}
        </Stack.Navigator>
      );
    }
  };
  return (
    <NavigationContainer ref={ref}>{renderStackApp()}</NavigationContainer>
  );
});

export default NavigationApp;
