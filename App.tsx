import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import NavigationApp from './src/navigation/StackContainer';
//Redux
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {GlobalUI} from '@component';
import {GlobalService} from '@services';
import {NavigationUtils} from '@navigation';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <ActionSheetProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationApp
              ref={(navigatorRef: any) =>
                NavigationUtils.setTopLevelNavigator(navigatorRef)
              }
            />
          </PersistGate>
        </Provider>
      </ActionSheetProvider>
      <FlashMessage
        position="top"
        floating={true}
        hideStatusBar={false}
        // renderCustomContent={AppCustomFlatMessage}
      />
      <GlobalUI ref={GlobalService.globalUIRef} />
    </>
  );
};

export default App;
