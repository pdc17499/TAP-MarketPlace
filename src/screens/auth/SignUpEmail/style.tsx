import { colors, fontFamily, scaleWidth, SIZE } from '@util';
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
    fontSize: SIZE.big_size,
    marginVertical: scaleWidth(36),
    ...fontFamily.fontCampWeight600
  },

});

export { styles };
