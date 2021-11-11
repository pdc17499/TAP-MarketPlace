import { AppButton, AppInput, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { scaleHeight } from '@util';
import { Formik } from 'formik';
import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { styles } from './style';
import * as yup from 'yup';
import { SIGNUP_PROPERTY, VERIFY_ACCOUNT } from '@routeName';

interface SignUpEmailProp { }

interface screenNavigationProp {
  navigate: any;
}

const SignUpEmail = (props: SignUpEmailProp) => {
  const navigation = useNavigation<screenNavigationProp>();

  const formInitialValues = {
    email: '',
    password: '',
    confirm_password: '',
    error: '',
  };

  const validationEmail = yup.object().shape({
    email: yup
      .string()
      .required('This field is required')
      .email('Email is not valid'),
    password: yup
      .string()
      .required('This field is required')
      .min(6, 'Password must be at least 6 characters')
      .max(32, 'Password may not be greater than 32 characters'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password must match')

  });

  const RenderEmailForm = () => (
    <KeyboardAvoidingView  >
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationEmail}
        validateOnChange={false}
        onSubmit={values => { navigation.navigate(VERIFY_ACCOUNT) }}
      >
        {props => (
          <View style={styles.formInPut} >
            <View style={{ marginBottom: scaleHeight(24), flex: 1 }}>

              <AppInput
                label={'Email'}
                placeholder={'Enter your email'}
                iconLeft={'email'}
                value={props.values.email}
                onValueChange={props.handleChange('email')}
                error={props.errors.email}
              ></AppInput>

              <AppInput
                label={'Password'}
                secureTextEntry={true}
                showEye={true}
                placeholder={'Enter your password'}
                iconLeft={'key'}
                value={props.values.password}
                onValueChange={props.handleChange('password')}
                error={props.errors.password}
              ></AppInput>

              <AppInput
                label={'Confirm Password'}
                secureTextEntry={true}
                showEye={true}
                placeholder={'Confirm your password'}
                iconLeft={'key'}
                value={props.values.confirm_password}
                onValueChange={props.handleChange('confirm_password')}
                error={props.errors.confirm_password}
              ></AppInput>
            </View>
            <AppButton customStyleButton={styles.button} title={"Continue "} size={'small'} iconRight={'arNext'} onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  )

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText
          style={styles.title}>
          {'Sign up'}
        </AppText>
        {RenderEmailForm()}
      </View>
    </View>
  );
};

export { SignUpEmail };