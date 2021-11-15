import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: scaleWidth(24),
    flex: 1
  },

  avatar: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: 16,
    alignSelf: 'center'
  },
  name: {
    ...fontFamily.fontCampWeight600,
    fontSize: scaleSize(20),
    marginBottom: scaleWidth(12)
  },
  email: {
    ...fontFamily.fontWeight400,
    fontSize: scaleSize(14),
    color: colors.textThirdPrimary,
  },
  infomation: {
    alignItems: 'center',
    marginVertical: scaleWidth(24)
  },
  txtStyle: {
    ...fontFamily.fontWeight400,
    fontSize: SIZE.base_size,
    color: colors.textPrimary,
  },
  title: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.textFouthPrimary,
    marginLeft: scaleWidth(20),
    flex: 1
  },

  borderBottom: {
    height: 1,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
    marginTop: scaleWidth(25)

  },
  titleBold: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.primary,
    marginLeft: scaleWidth(20),
    flex: 1
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderProfileList,
    paddingVertical: scaleWidth(20)
  },
  borderTopList: {
    height: 1,
    backgroundColor: colors.borderProfileList
  },
  logOutTxt: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.textSecondPrimary,
  },
  logOut: {
    flexDirection: 'row', alignSelf: 'center', marginTop: SIZE.big_space,
    marginBottom: SIZE.medium_space
  }
}
);

export { styles };
