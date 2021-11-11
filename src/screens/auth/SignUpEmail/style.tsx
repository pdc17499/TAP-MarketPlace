import { colors, fontFamily, scaleHeight, scaleWidth, SIZE } from '@util';
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
    fontSize: SIZE.big_size,
    marginBottom: scaleWidth(30),
    ...fontFamily.fontCampWeight600
  },
  text: {
    ...fontFamily.fontWeight500,
    marginTop: 20,
    marginBottom: 10,
  },
  formInPut: {
    height: scaleHeight(585),

  },
  button: {
    width: '100%',

    bottom: SIZE.medium_space
  },

});

export { styles };
