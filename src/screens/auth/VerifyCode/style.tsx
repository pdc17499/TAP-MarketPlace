import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';


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
    color: colors.textSecondPrimary
  },
  message: {
    fontSize: SIZE.semi_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    marginBottom: scaleWidth(36),
    color: colors.textPrimary,
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 10,
    marginRight: 20,
    alignSelf: 'center'
  },
  cellRoot: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: scaleWidth(16),
    backgroundColor: colors.bgInput,
  },
  cellText: {
    color: colors.textPrimary,
    fontSize: SIZE.medium_size,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  miniTxt: {
    color: colors.textThirdPrimary,
    ...fontFamily.fontWeight400,
    lineHeight: scaleWidth(25),
    textAlign: 'center',
    marginBottom: scaleWidth(130)
  }



});

export { styles };
