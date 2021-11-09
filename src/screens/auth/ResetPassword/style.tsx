import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
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
    fontSize: SIZE.big_size, marginTop: scaleWidth(55), alignSelf: 'center', ...fontFamily.fontCampWeight600
  },
  miniTxt: {
    color: colors.textThirdPrimary, ...fontFamily.fontWeight400, width: scaleWidth(200), marginTop: scaleWidth(35), marginBottom: scaleWidth(30), textAlign: 'center', alignSelf: 'center'
  },
  sendButton: {
    marginTop: scaleWidth(15)
  }

});

export { styles };
