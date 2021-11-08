import {DEVICE} from '@util';
import {StyleSheet} from 'react-native';

const fontFamily = StyleSheet.create({
  fontCampWeight600: {
    fontFamily: DEVICE.isIos ? 'Campton SemiBold' : 'CamptonSemiBold',
  },
  fontCampWeight500: {
    fontFamily: DEVICE.isIos ? 'Campton Medium' : 'CamptonMedium',
  },
  fontWeight600: {
    fontFamily: 'Metropolis-SemiBold',
  },
  fontWeight500: {
    fontFamily: 'Metropolis-Medium',
  },
  fontWeight400: {
    fontFamily: 'Metropolis-Regular',
  },
});

export {fontFamily};
