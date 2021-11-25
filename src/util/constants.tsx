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
  MAX_IMAGE_SIZE: 10485760,
  MAX_VIDEO_SIZE: 31457280,
  MAX_IMAGE_COUNT: 10,
  MAX_VIDEO_COUNT: 1,
};

const DEFAULT_COUNTRY = {
  callingCode: ['65'],
  cca2: 'SG',
  currency: ['SGD'],
  flag: 'flag-sg',
  name: 'Singapore',
  region: 'Asia',
  subregion: 'South-Eastern Asia',
};

const STYLE = {
  hitSlop: {top: 20, bottom: 20, left: 20, right: 20},
};

const OPTIONS_GALLERY = {
  optionPhotos: ['Upload Photos', 'Take a photo', 'Cancel'],
  optionVideos: ['Upload Video', 'Take a video', 'Cancel'],
};

export {DEVICE, SLIDER, FILE_SIZE, DEFAULT_COUNTRY, STYLE, OPTIONS_GALLERY};
