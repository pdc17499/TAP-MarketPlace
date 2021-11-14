import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HOME} from './routeName';
import {Home} from '../screens';
import {useSelector} from 'react-redux';
import UnAuthenStack from './UnAuthenStack';

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};

const AuthenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={HOME}>
      <Stack.Screen name={HOME} component={Home} />
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
