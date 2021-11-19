import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.white, paddingHorizontal: scaleWidth(24)


    },
    logo: {
        alignSelf: 'center',
        width: scaleWidth(45),
        height: scaleHeight(49),
        marginTop: scaleHeight(85),
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
        // marginBottom: scaleHeight(30)
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
        flexDirection: 'row', alignItems: 'center',
        // marginBottom: scaleHeight(15),
        marginTop: scaleHeight(50)
    },
    blockButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(32)
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
        alignSelf: 'center',
        marginBottom: SIZE.medium_space,
    },
    buttonSignIn: {
        // position: 'absolute',
        // bottom: SIZE.medium_space
        marginTop: scaleHeight(54)
    }




});

export { styles };
