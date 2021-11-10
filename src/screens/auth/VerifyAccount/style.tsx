import {
  colors,
  fontFamily,
  scaleHeight,
  scaleSize,
  scaleWidth,
  SIZE,
} from '@util';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: SIZE.padding,
    flex: 1,
  },
  title: {
    fontSize: scaleSize(18),
    ...fontFamily.fontCampWeight600,
    marginTop: scaleWidth(20),
    marginBottom: scaleWidth(15),
    color: colors.textSecondPrimary,
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    marginBottom: scaleWidth(36),
    color: colors.textPrimary,
    width: scaleWidth(280),
  },
  picker: {
    marginTop: SIZE.base_size,
    height: 100,
  },
  yourPhoneTxt: {
    ...fontFamily.fontWeight500,
  },
  sendCodeTxt: {
    ...fontFamily.fontWeight400,
    color: colors.textThirdPrimary,
    marginTop: scaleWidth(25),
  },
  question: {
    marginTop: scaleWidth(25),
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionTxt: {
    ...fontFamily.fontWeight500,
    color: colors.textSecondPrimary,
    marginLeft: 5,
  },
  miniTxt: {
    ...fontFamily.fontWeight400,
    color: colors.textThirdPrimary,
    fontSize: scaleSize(14),
    marginTop: scaleWidth(10),
    marginLeft: scaleWidth(28),
    lineHeight: scaleSize(20),
  },
  skipTxt: {
    ...fontFamily.fontWeight500,
    color: colors.textSecondPrimary,
    fontSize: scaleSize(18),
  },
  skip: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondPrimary,
    alignSelf: 'center',
    marginTop: scaleWidth(22),
  },

  blockPhoneNumber: {
    marginTop: scaleWidth(10),
    marginBottom: scaleWidth(25),
  },
  customPicker: {
    height: 100,
  },
});

export {styles};
