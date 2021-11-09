import { IconEmail, iconFacebook, iconGoogle, Key, logo } from '@assets';
import { AppButton, AppInput, AppText } from '@component';
import { useNavigation } from '@react-navigation/core';
import { RESETPASSWORD, SIGNUP } from '@routeName';
import { colors, fontFamily, scaleHeight, validateForm } from '@util';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import * as yup from 'yup';

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

  const validationSign = yup.object().shape({
    email: yup
      .string()
      .required('This field is required')
      .email('Email is not valid'),
    password: yup
      .string()
      .required('This field is required')
      .min(6, 'Password must be at least 6 characters')
      .max(32, 'Password may not be greater than 32 characters'),
  });

  const moveToResetPassword = () => {
    navigation.navigate(RESETPASSWORD)
  }

  const moveToSignUp = () => {
    navigation.navigate(SIGNUP)
  }

  const RenderSignInForm = () => (
    <KeyboardAvoidingView>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSign}
        validateOnChange={false}
        onSubmit={values => {
          console.log('email', values.email);
        }}>
        {props => (
          <View>
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
              <TouchableOpacity onPress={() => moveToResetPassword()}>
                <AppText style={styles.forgetTxt}>{'Forget password ?'}</AppText>
              </TouchableOpacity>
              <AppButton title={'Sign in'} size={'small'} onPress={props.handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <AppText style={styles.title}>{'Sign in'}</AppText>

      {RenderSignInForm()}

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
        <TouchableOpacity onPress={() => moveToSignUp()}>
          <AppText>{' Sign up'}</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export { SignIn };
