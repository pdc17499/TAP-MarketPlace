import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center'

    },
    logo: {
        alignSelf: 'center',
        width: scaleWidth(45),
        height: scaleWidth(49),
        marginTop: scaleHeight(121),
        marginBottom: scaleHeight(26)

    },
    imageBackground: {
        width: scaleWidth(334),
        height: scaleHeight(274),
        marginTop: SIZE.big_space,
        marginBottom: scaleHeight(32),
        alignSelf: 'center',

    },
    title: {
        color: colors.primary,
        fontSize: SIZE.big_size,
        ...fontFamily.fontCampWeight600,
        alignSelf: 'center',
    },
    miniTitle: {
        fontSize: scaleSize(18),
        color: colors.secondPrimary,
        alignSelf: 'center',


    },
    signInTxt: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleHeight(60),
        // justifyContent: 'center'
    }

});

export { styles };
