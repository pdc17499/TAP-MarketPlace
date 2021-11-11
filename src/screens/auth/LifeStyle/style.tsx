import {colors, fontFamily, scaleSize, scaleWidth, SIZE} from '@util';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSreen,
  },
  body: {
    paddingHorizontal: SIZE.padding,
    flex: 1,
  },
  title: {
    fontSize: scaleSize(18),
    ...fontFamily.fontCampWeight600,
    marginTop: SIZE.base_space,
    marginBottom: scaleWidth(15),
    color: colors.textSecondPrimary,
  },
  subTitle: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
    lineHeight: SIZE.base_size * 1.6,
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    marginBottom: SIZE.base_space + 2,
    color: colors.textPrimary,
  },
  containerBottom: {
    paddingBottom: SIZE.medium_space,
    paddingHorizontal: SIZE.padding,
  },
  textBottom: {
    color: colors.textSecondPrimary,
    lineHeight: SIZE.medium_size,
    textAlign: 'center',
  },
  input: {},
  inputAge: {
    marginBottom: scaleWidth(30),
    width: scaleWidth(106),
  },
  button: {
    marginTop: SIZE.base_space * 2,
  },
});

export {styles};
