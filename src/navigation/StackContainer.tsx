import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CHOOSE_ROLE,
  HOMEOWNER_PROPERTY,
  LOGIN,
  WELCOME,
  SIGNIN,
} from './routeName';
import {ChooseRole, RoomUnitHomeowner, Welcome, SignIn} from '../screens';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

// unauthenticate stack screens
const UnAuthenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={HOMEOWNER_PROPERTY}>
      <Stack.Screen name={CHOOSE_ROLE} component={ChooseRole} />
      <Stack.Screen name={HOMEOWNER_PROPERTY} component={RoomUnitHomeowner} />
      <Stack.Screen name={WELCOME} component={Welcome} />
      <Stack.Screen name={SIGNIN} component={SignIn} />
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
  console.log({token});

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
