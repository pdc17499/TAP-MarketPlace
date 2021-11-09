import { colors, fontFamily, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: SIZE.padding,
  },
  title: {
    fontSize: scaleSize(18),
    ...fontFamily.fontCampWeight600,
    marginTop: scaleWidth(36),
    marginBottom: scaleWidth(15),
    color: colors.textSecondPrimary
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    marginBottom: scaleWidth(36),
    color: colors.textPrimary,
    width: scaleWidth(280)
  },
  text: {
    fontSize: scaleSize(15),
    ...fontFamily.fontWeight500,
    lineHeight: scaleWidth(15),
    marginBottom: scaleWidth(10),
    color: colors.primary,
  },
  text2: {
    fontSize: scaleSize(15),
    ...fontFamily.fontWeight500,
    lineHeight: scaleWidth(15),
    color: colors.primary,
    marginBottom: -5

  },
  input: {

  },
  inputAge: {
    marginBottom: scaleWidth(30),
    width: scaleWidth(106)
  },
  button: {

    marginTop: scaleWidth(100),
    marginBottom: scaleWidth(20)
  },

});

export { styles };
