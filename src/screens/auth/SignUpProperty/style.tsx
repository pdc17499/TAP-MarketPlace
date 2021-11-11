import { colors, fontFamily, height, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: SIZE.padding,
    flex: 1,
    height: '100%',

  },
  title: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    color: colors.textSecondPrimary,
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    marginBottom: SIZE.base_space + 2,
    color: colors.textPrimary,
  },

  input: {
    paddingHorizontal: SIZE.padding,


  },

  button: {
    width: '100%',
    bottom: SIZE.medium_space
  },
  logo: {
    width: scaleWidth(45),
    height: scaleWidth(49),
    marginTop: scaleWidth(20),
    marginBottom: scaleWidth(26)
  },
  youTxt: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    color: colors.textPrimary
  }
});

export { styles };
