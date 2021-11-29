import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import UnAuthenStack from './unauthenstack';
import TenantStack from './tenant';
import HomeownerStack from './homeowner';
import AgentStack from './agent';
import {resetDataSignup} from '@redux';

//main stack app
const NavigationApp = React.forwardRef((props: any, ref: any) => {
  let {token, role}: any = useSelector((state: any) => state?.auth);
  const dispatch = useDispatch();
  console.log({token});
  React.useEffect(() => {
    dispatch(resetDataSignup());
  }, [token]);

  const renderStackApp = () => {
    if (!token) {
      return <UnAuthenStack />;
    } else {
      if (role?.idType === 'Tenant') {
        return <TenantStack />;
      } else if (role?.idType === 'Homeowner') {
        return <HomeownerStack />;
      } else {
        return <AgentStack />;
      }
    }
  };
  return (
    <NavigationContainer ref={ref}>{renderStackApp()}</NavigationContainer>
  );
});

export default NavigationApp;
