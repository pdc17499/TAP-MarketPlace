import {colors, fontFamily, scaleHeight, scaleWidth, SIZE} from '@util';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: SIZE.padding,
    // flex: 1,
  },
  keyboard: {flex: 1, paddingHorizontal: SIZE.padding},
  title: {
    fontSize: SIZE.big_size,
    ...fontFamily.fontCampWeight600,
    marginTop: SIZE.padding,
  },
  text: {
    ...fontFamily.fontWeight500,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: scaleWidth(100),
    marginBottom: scaleWidth(200),
  },
  customStyleLabel: {
    marginTop: SIZE.padding,
  },
});

export {styles};
