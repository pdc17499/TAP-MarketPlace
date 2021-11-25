import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  viewSubtitle: {
    marginTop: SIZE.base_space,
    marginBottom: SIZE.big_space,
  },
  listImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 0,
    paddingHorizontal: SIZE.padding,
    marginTop: SIZE.padding,
  },
  bgImage: {
    width: scaleWidth(375),
    height: scaleWidth(390),
    resizeMode: 'contain',
    position: 'absolute',
  },
  customStyleTitle: {color: colors.primary},
  itemImage: {
    width: scaleWidth(93),
    height: scaleWidth(93),
    borderRadius: 8,
  },
  viewProfile: {
    position: 'absolute',
    top: -scaleWidth(44),
    left: SIZE.padding / 2,
    width: scaleWidth(93) + SIZE.padding,
    height: scaleWidth(93) + scaleWidth(44) + SIZE.padding / 2,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.google,
    zIndex: -1,
  },
  profilePhoto: {
    fontSize: SIZE.small_size,
    marginTop: SIZE.base_space,
    color: colors.textThirdPrimary,
    ...fontFamily.fontWeight500,
  },
  padding: {
    paddingHorizontal: SIZE.padding,
    paddingBottom: SIZE.medium_space,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgSreen,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.semi_size,
    lineHeight: scaleWidth(36),
    marginBottom: SIZE.padding,
    marginTop: SIZE.padding,
    textAlign: 'center',
    color: colors.secondPrimary,
  },
  subTitle: {
    lineHeight: SIZE.base_size * 1.3,
    textAlign: 'center',
    color: colors.textSecondPrimary,
  },
  videoSubView: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
    right: 0,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  dragging: {
    opacity: 0.2,
  },
  remove: {
    position: 'absolute',
    right: -8,
    zIndex: 1,
    top: -6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 3,
  },
  textGallery: {
    ...fontFamily.fontCampWeight500,
    color: colors.primary,
    paddingHorizontal: SIZE.padding,
    marginVertical: SIZE.base_space,
  },
});
