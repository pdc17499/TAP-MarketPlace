import { IconEmail, iconFacebook, iconGoogle, Key, logo } from '@assets';
import { AppButton, AppInput, AppText } from '@component';
import { useNavigation } from '@react-navigation/core';
import { colors, fontFamily, scaleHeight, validateForm } from '@util';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';

interface SignInProp { }

interface screenNavigationProp {
    navigate: any;
}

const SignIn = React.memo((props: SignInProp) => {
    const navigation = useNavigation<screenNavigationProp>();
    const dispath = useDispatch();

    const formInitialValues = {
        email: '',
        password: '',
        error: '',
    };

    const RenderSignInForm = () => (
        <KeyboardAvoidingView  >
            <Formik
                initialValues={formInitialValues}
                validationSchema={validateForm}
                validateOnChange={false}
                onSubmit={values => { }}
            >
                {props => (
                    <View>
                        <View style={{ marginBottom: scaleHeight(16) }}>
                            <AppInput iconLeft={<IconEmail />} value={props.values.email} onValueChange={props.handleChange('email')} ></AppInput>
                        </View>
                        <View style={{ marginBottom: scaleHeight(16) }}>
                            <AppInput showEye={true} secureTextEntry={true} iconLeft={<Key />} value={props.values.password} onValueChange={props.handleChange('password')}></AppInput>
                        </View>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    )

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <AppText style={styles.title}>
                {'Sign in'}
            </AppText>

            {RenderSignInForm()}

            <View>
                <AppText style={styles.forgetTxt}>
                    {'Forget password ?'}
                </AppText>
                <AppButton title={"Sign in"} size={'small'}  ></AppButton>
            </View>

            <View style={styles.signInWith}>
                <View style={styles.line} />
                <AppText style={styles.signInWithTxt}>
                    {'or sign in with'}
                </AppText>
                <View style={styles.line} />
            </View>

            <View style={styles.blockButton}>
                <AppButton typeButton={'linear'} image={iconGoogle} size={'small'} imageStyle={styles.imageGoogle} customStyleButton={styles.googleButton} />
                <AppButton typeButton={'linear'} image={iconFacebook} size={'small'} imageStyle={styles.imageFacebook} customStyleButton={styles.facebookButton} />
            </View>

            <View style={styles.signUpTxt}>
                <AppText style={{ ...fontFamily.fontWeight400, color: colors.textSecondPrimary }}>
                    {"Don't have an account?"}
                </AppText>
                <AppText>{' Sign up'}</AppText>
            </View >
        </View >
    );
});

export { SignIn };
