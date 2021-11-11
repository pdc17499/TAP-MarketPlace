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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: scaleWidth(45),
    height: scaleWidth(49),
    // marginTop: scaleHeight(121),
    marginBottom: SIZE.padding,
  },
  imageBackground: {
    width: scaleWidth(334),
    height: scaleWidth(274),
    marginTop: scaleHeight(57),
    marginBottom: SIZE.padding,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    color: colors.primary,
    fontSize: SIZE.big_size - 4,
    ...fontFamily.fontCampWeight600,
    alignSelf: 'center',
  },
  miniTitle: {
    fontSize: scaleSize(18),
    color: colors.secondPrimary,
    alignSelf: 'center',
  },
  signInTxt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(50),
    justifyContent: 'center',
  },
});

export {styles};
