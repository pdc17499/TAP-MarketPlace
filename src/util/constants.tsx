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
  MIN_PRICE: 400,
  MAX_PRICE: 50000,
  MIN_FLOOR_SIZE: 500,
  MAX_FLOOR_SIZE: 10000,
};

const FILE_SIZE = {
  MAX_IMAGE: 1048576,
};

export {DEVICE, SLIDER, FILE_SIZE};
