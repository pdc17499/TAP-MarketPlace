import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import UnAuthenStack from './UnAuthenStack';
import AuthenStack from './AuthenStack';


//main stack app
const NavigationApp = React.forwardRef((props: any, ref: any) => {
  let token = useSelector((state: any) => state?.auth?.token);
  console.log({ token });

  const renderStackApp = () => {
    if (token) {
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
