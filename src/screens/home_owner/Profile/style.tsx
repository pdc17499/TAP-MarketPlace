import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE } from '@util';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    body: {
        paddingHorizontal: scaleWidth(24)
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
    }
}
);

export { styles };
