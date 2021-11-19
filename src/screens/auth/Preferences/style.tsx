import {colors, fontFamily, scaleSize, scaleWidth, SIZE} from '@util';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSreen,
    paddingHorizontal: SIZE.padding,
    paddingTop: SIZE.base_space,
  },
  customStyleButton: {
    flexDirection: 'column',
    paddingVertical: SIZE.base_space,
  },
  customStyleTitleButton: {lineHeight: SIZE.base_size * 1.8},
});

export {styles};
