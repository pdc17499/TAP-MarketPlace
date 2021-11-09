import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,

  },
  body: {
    paddingHorizontal: SIZE.padding

  },
  title: {
    fontSize: SIZE.big_size,
    marginTop: scaleWidth(20),
    ...fontFamily.fontCampWeight600
  },

  description: {
    color: colors.textThirdPrimary,
    ...fontFamily.fontWeight400,
    width: scaleWidth(264),
    marginTop: scaleWidth(16),
    marginBottom: scaleWidth(36),
    lineHeight: scaleWidth(22)
  },
  sendButton: {
    marginTop: scaleWidth(15)
  },
  facebookButton: {
    backgroundColor: colors.facebook,
    justifyContent: 'flex-start',
    paddingHorizontal: scaleWidth(23)
  },
  googleButton: {
    backgroundColor: colors.google,
    marginBottom: SIZE.base_size,
    justifyContent: 'flex-start',
    paddingHorizontal: scaleWidth(23)
  },
  imageGoogle: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginRight: scaleWidth(17)
  },
  imageFacebook: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginRight: scaleWidth(17)

  },
  googleTxt: {
    borderLeftWidth: 1,
    borderLeftColor: colors.borderPrimary,
    color: colors.textThirdPrimary,
    flex: 1,
    textAlign: 'center',
  },
  facebookTxt: {
    borderLeftWidth: 1,
    borderLeftColor: colors.borderTextFacebook,
    color: 'white',
    textAlign: 'center',
    flex: 1
  },
  line: {
    flex: 4,
    borderBottomColor: colors.borderPrimary,
    borderBottomWidth: 1,
  },
  or: {
    flexDirection: 'row',
    marginTop: scaleHeight(34),
    alignItems: 'center',
    marginBottom: SIZE.padding
  },
  orTxt: {
    flex: 1,
    ...fontFamily.fontWeight400,
    color: colors.textThirdPrimary,
    textAlign: 'center',
  },
  emailTxt: {
    color: colors.primary,
  },

});

export { styles };
