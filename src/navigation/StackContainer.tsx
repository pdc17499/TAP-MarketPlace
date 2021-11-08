import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LOGIN, WELCOME, SIGNIN } from './routeName';
import { Login, Welcome, SignIn } from '../screens';

import { useSelector } from 'react-redux';


const Stack = createStackNavigator();

const NavigationApp = React.forwardRef((props: any, ref: any) => {
  const screenOptions = {
    headerShown: false,
  };
  let showScreenIntro = useSelector(
    (state: any) => state?.auth?.showIntroScreen,
  );
  let token = useSelector((state: any) => state?.auth?.token);
  // let typeUser = useSelector((state: any) => state?.auth?.user?.type_account);
  // let vertifi_Email = useSelector(
  //   (state: any) => state?.auth?.user?.email_verified_at,
  // );
  // let vertifi_infoScreen = useSelector(
  //   (state: any) => state?.auth?.user?.complete_info,
  // );

  const renderScreenSigned = () => {
    return <Stack.Screen name={LOGIN} component={Login} />;
  };

  const renderScreenWelcome = () => {
    return <Stack.Screen name={WELCOME} component={Welcome} />;
  };

  const renderScreenSignIn = () => {
    return <Stack.Screen name={SIGNIN} component={SignIn} />;
  };


  const renderStackApp = () => {
    if (!token) {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={WELCOME} component={Welcome} />
          <Stack.Screen name={LOGIN} component={Login} />
          <Stack.Screen name={SIGNIN} component={SignIn} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          {renderScreenWelcome()}
          {renderScreenSignIn()}
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
