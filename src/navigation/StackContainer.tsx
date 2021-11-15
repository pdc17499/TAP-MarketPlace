import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BASIC_INFORMATION, HOME, PROFILE } from './routeName';
import { Home, Profile, BasicInfomation } from '../screens';
import { useSelector } from 'react-redux';
import UnAuthenStack from './UnAuthenStack';


const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const AuthenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={BASIC_INFORMATION}>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={PROFILE} component={Profile} />
      <Stack.Screen name={BASIC_INFORMATION} component={BasicInfomation} />
    </Stack.Navigator>
  );
};

//main stack app
const NavigationApp = React.forwardRef((props: any, ref: any) => {
  let token = useSelector((state: any) => state?.auth?.token);
  console.log({ token });

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
