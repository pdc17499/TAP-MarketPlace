import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: scaleWidth(24)

    },
    logo: {
        alignSelf: 'center',
        width: scaleWidth(45),
        height: scaleHeight(49),
        marginTop: scaleHeight(60),
        marginBottom: scaleHeight(26)

    },

    title: {
        color: colors.primary,
        fontSize: SIZE.big_size,
        ...fontFamily.fontCampWeight600,
        alignSelf: 'center',
        marginBottom: scaleHeight(40),
    },

    signInTxt: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleHeight(81),

    },
    forgetTxt: {
        ...fontFamily.fontWeight500,
        color: colors.textThirdPrimary,
        textAlign: 'right',
        marginBottom: scaleHeight(54)
    },
    signInWithTxt: {
        flex: 1,
        ...fontFamily.fontWeight400,
        color: colors.textThirdPrimary,
        textAlign: 'center',
        marginHorizontal: scaleWidth(6),
    },
    line: {
        flex: 1,
        borderBottomColor: colors.borderPrimary,
        borderBottomWidth: 1,
    },
    signInWith: {
        flexDirection: 'row', marginTop: scaleHeight(60), alignItems: 'center'
    },
    blockButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZE.medium_space
    },
    facebookButton: {
        flex: 1,
        backgroundColor: colors.facebook,
        width: scaleWidth(156)
    },
    googleButton: {
        flex: 1,
        backgroundColor: colors.google,
        width: scaleWidth(156),
        marginRight: scaleWidth(15)
    },
    imageGoogle: {
        width: scaleWidth(24), height: scaleWidth(24)

    },
    imageFacebook: {
        width: scaleWidth(24), height: scaleWidth(24)

    },
    signUpTxt: {
        ...fontFamily.fontWeight400,
        color: colors.textSecondPrimary,
    },
    signUpLine: {
        flexDirection: 'row',
        marginTop: SIZE.big_space,
        alignSelf: 'center'
    },




});

export { styles };
