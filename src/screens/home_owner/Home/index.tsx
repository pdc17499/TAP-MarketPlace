import { IconBack, iconFacebook, iconGoogle, logo } from '@assets';
import { AppButton, AppInput, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { RESETPASSWORD, SIGNIN, SIGNUP } from '@routeName';
import { scaleHeight } from '@util';
import { Formik } from 'formik';
import React from 'react';
import { View, Image, KeyboardAvoidingView, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import * as yup from 'yup';
import NavigationApp from 'src/navigation/StackContainer';


interface HomeProp { }

interface screenNavigationProp {
    navigate: any;
}

const Home = React.memo((props: HomeProp) => {

    return (
        <View style={styles.container}>

            <AppText style={styles.title}>{'Home Screen'}</AppText>


        </View>
    );
});

export { Home };
