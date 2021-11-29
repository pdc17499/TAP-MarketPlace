import { iconFacebook, iconGoogle, logo } from '@assets';
import { AppButton, AppInput, AppText } from '@component';
import { useNavigation } from '@react-navigation/core';
import { CHOOSE_ROLE, RESETPASSWORD, SIGNUP } from '@routeName';
import { colors, scaleHeight, scaleWidth, SIZE } from '@util';
import { Formik } from 'formik';
import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import * as yup from 'yup';
import { loginApp } from '@redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


interface SignInProp { }

interface screenNavigationProp {
  navigate: any;
}

const SignIn = React.memo((props: SignInProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();

  const signIn = (email: string, password: string) => {
    dispath(loginApp({ email: email, password: password }))
  }

  const formInitialValues = {
    email: '',
    password: '',
    error: '',
  };

  const validationSign = yup.object().shape({
    email: yup
      .string()
      .required('This field is required')
      .email('Email is not valid'),
    password: yup
      .string()
      .required('This field is required')
      .min(8, 'Password must be at least 8 characters')
    // .max(32, 'Password may not be greater than 32 characters'),
  });

  const moveToResetPassword = () => {
    navigation.navigate(RESETPASSWORD)
  }

  const moveToSignUp = () => {
    navigation.navigate(CHOOSE_ROLE)
  }


  return (
    <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={validationSign}
        validateOnChange={false}
        onSubmit={values => { signIn(values.email, values.password) }}>
        {props => (
          <>
            <View style={{ flex: 1 }}>
              <Image source={logo} style={styles.logo} />
              <AppText style={styles.title}>{'Sign in'}</AppText>
              <View style={{ marginBottom: scaleHeight(16) }}>
                <AppInput
                  placeholder={'Email'}
                  iconLeft={'email'}
                  value={props.values.email}
                  onValueChange={props.handleChange('email')}
                  error={props.errors.email}
                />
              </View>
              <View style={{ marginBottom: scaleHeight(16) }}>
                <AppInput
                  placeholder={'Password'}
                  showEye={true}
                  secureTextEntry={true}
                  iconLeft={'key'}
                  value={props.values.password}
                  onValueChange={props.handleChange('password')}
                  error={props.errors.password}
                />
              </View>
              <View>
                <Pressable style={{ alignSelf: 'flex-end' }} onPress={() => moveToResetPassword()}>
                  <AppText style={styles.forgetTxt}>{'Forget password ?'}</AppText>
                </Pressable>

              </View>
            </View>
            <AppButton customStyleButton={styles.buttonSignIn} title={'Sign in'} size={'small'} onPress={props.handleSubmit} />
            <View style={styles.signInWith}>
              <View style={styles.line} />
              <AppText style={styles.signInWithTxt}>{'or sign in with'}</AppText>
              <View style={styles.line} />
            </View>

            <View style={styles.blockButton}>
              <AppButton
                typeButton={'linear'}
                image={iconGoogle}
                size={'small'}
                imageStyle={styles.imageGoogle}
                customStyleButton={styles.googleButton}
              />
              <AppButton
                typeButton={'linear'}
                image={iconFacebook}
                size={'small'}
                imageStyle={styles.imageFacebook}
                customStyleButton={styles.facebookButton}
              />
            </View>

            <View style={styles.signUpLine}>
              <AppText
                style={styles.signUpTxt}>
                {"Don't have an account?"}
              </AppText>
              <Pressable onPress={() => moveToSignUp()}>
                <AppText>{' Sign up'}</AppText>
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView >

  );
});

export { SignIn };
