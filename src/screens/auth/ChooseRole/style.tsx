import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heading: {
    marginBottom: SIZE.medium_space,
    lineHeight: SIZE.base_size * 1.3,
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE.base_space,
  },
  imageStyle: {
    width: scaleWidth(124),
    height: scaleWidth(124),
    resizeMode: 'contain',
    marginBottom: SIZE.base_space,
  },
  buttonLeft: {
    padding: SIZE.base_space,
    paddingBottom: scaleWidth(22),
    borderRadius: SIZE.base_size,
    marginRight: SIZE.base_space / 2,
  },
  buttonRight: {
    padding: SIZE.base_space,
    paddingBottom: scaleWidth(22),
    borderRadius: SIZE.base_size,
    marginLeft: SIZE.base_space / 2,
  },
  title: {
    fontSize: SIZE.medium_size,
    marginTop: SIZE.base_space * 3,
  },
  btnAgent: {
    marginRight: scaleWidth(8),
    flex: 1,
  },
  btnHomeOwner: {
    marginLeft: scaleWidth(8),
    flex: 1,
  },
});

export {styles};
