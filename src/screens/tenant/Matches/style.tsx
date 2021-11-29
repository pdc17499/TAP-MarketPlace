import {
  colors,
  DEVICE,
  fontFamily,
  scaleHeight,
  scaleSize,
  scaleWidth,
  SIZE,
} from '@util';
import {StyleSheet} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    alignSelf: 'center',
    marginTop: 200,
  },
  header: {
    paddingHorizontal: SIZE.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...ifIphoneX(
      {
        marginTop: scaleHeight(50),
      },
      {
        marginTop: scaleHeight(50),
      },
    ),

    marginBottom: SIZE.base_space,
  },
  iconFilterView: {
    backgroundColor: colors.borderProfileList,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZE.base_space / 2,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 0,
  },
  card: {
    flex: 1,
    height: scaleHeight(530),
    borderRadius: 8,
    padding: SIZE.base_space,
    marginHorizontal: scaleWidth(4),
  },
  subTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: colors.white,
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    marginTop: 8,
  },
  age: {
    color: colors.white,
    ...fontFamily.fontCampWeight500,
    fontSize: scaleSize(13),
    textAlign: 'center',
    marginBottom: SIZE.base_space / 2,
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: scaleHeight(350),
    // paddingBottom: scaleHeight(80),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: -SIZE.base_space,
    paddingRight: 10,
  },
  subTitle: {
    color: colors.white,
    ...fontFamily.fontWeight500,
    textAlign: 'center',
  },
  reactionView: {
    position: 'absolute',
    top: scaleHeight(530 + 50) + SIZE.base_space + 48 - scaleHeight(40),
    flexDirection: 'row',
    // justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  imageUser: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scaleHeight(530),
    // bottom: 0,
    zIndex: -1,
    borderRadius: 8,
  },
  dislikeView: {
    minWidth: 40,
    minHeight: 40,
    width: scaleHeight(60),
    height: scaleHeight(60),
    backgroundColor: 'white',
    borderRadius: scaleWidth(80),
    marginRight: SIZE.padding / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatView: {
    minWidth: 40,
    minHeight: 40,
    width: scaleHeight(60),
    height: scaleHeight(60),
    backgroundColor: 'white',
    borderRadius: scaleWidth(80),
    marginLeft: SIZE.padding / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeView: {
    minWidth: 60,
    minHeight: 60,
    width: scaleHeight(80),
    height: scaleHeight(80),
    backgroundColor: '#2ED6A5',
    borderRadius: scaleHeight(80),
    marginHorizontal: SIZE.padding / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchingImg: {
    width: scaleWidth(191),
    height: scaleWidth(150),
    marginTop: scaleHeight(30),
  },
  emptyTitle: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    color: colors.primary,
    textAlign: 'center',
    marginTop: scaleHeight(50),
    marginBottom: SIZE.padding,
    lineHeight: SIZE.medium_size * 1.2,
  },
  emptySubtitle: {
    ...fontFamily.fontWeight500,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: SIZE.base_size * 1.3,
    marginBottom: SIZE.padding,
    maxWidth: '90%',
  },
  emptyTextBottom: {
    ...fontFamily.fontCampWeight600,
  },
  emptyLike: {
    marginTop: -10,
    marginRight: 10,
  },
  ////////////////
  bigTitle: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    color: colors.primary,
    marginTop: SIZE.medium_space,
  },
  customStyleLabel: {
    color: colors.textSecondPrimary,
    fontSize: scaleSize(14),
    ...fontFamily.fontCampWeight500,
  },
  customStyleButton: {
    marginTop: SIZE.base_size / 2,
  },
  customStyleTitle: {
    ...fontFamily.fontWeight600,
    fontSize: scaleSize(18),
    color: colors.textFouthPrimary,
  },
  /////
  viewLifestyle: {
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
  },
  titleLifestyle: {
    color: colors.textFouthPrimary,
    fontSize: scaleSize(14),
    ...fontFamily.fontCampWeight500,
    marginBottom: -SIZE.padding / 2,
    marginTop: SIZE.padding,
  },
  titleButtonLifestyle: {
    marginLeft: 10,
    color: colors.textFouthPrimary,
    fontSize: scaleSize(14),
  },
  buttonLifestyle: {
    borderRadius: 20,
    minHeight: scaleWidth(40),
    paddingHorizontal: SIZE.base_space,
  },
  ///
  viewAmenities: {
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
    marginTop: SIZE.padding,
    paddingBottom: SIZE.base_space,
  },
  labelAmenities: {
    color: colors.textSecondPrimary,
    fontSize: scaleSize(14),
    ...fontFamily.fontCampWeight500,
    marginBottom: SIZE.base_space / 2,
  },
  ///
  titleRoom: {
    color: colors.textPrimary,
    textAlign: 'center',
    ...fontFamily.fontCampWeight500,
    marginBottom: SIZE.base_space / 4,
  },
  location: {
    ...fontFamily.fontWeight500,
    color: colors.textPlace,
    marginLeft: 8,
    flex: 1,
  },
});

export {styles};
