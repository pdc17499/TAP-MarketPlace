import {Dimensions, Platform, NativeModules} from 'react-native';
const {width, height} = Dimensions.get('window');
const {PlatformConstants} = NativeModules;

const DEVICE = {
  isIos: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  width,
  height,
  deviceType: PlatformConstants.interfaceIdiom,
  isSmallDevice: width < 375,
};

const SLIDER = {
  min: 400,
  max: 50000,
};

export {DEVICE, SLIDER};
