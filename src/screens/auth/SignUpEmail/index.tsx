import { AppButton, AppInput, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { scaleHeight } from '@util';
import { Formik } from 'formik';
import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { styles } from './style';
import * as yup from 'yup';
import { SIGNUP_PROPERTY } from '@routeName';

interface SignUpEmailProp { }

interface screenNavigationProp {
  navigate: any;
}

const SignUpEmail = (props: SignUpEmailProp) => {
  const navigation = useNavigation<screenNavigationProp>();

  const formInitialValues = {
    email: '',
    error: '',
  };

  const validationEmail = yup.object().shape({
    email: yup
      .string()
      .required('This field is required')
      .email('Email is not valid'),
  });

  const RenderEmailForm = () => (
    <KeyboardAvoidingView  >
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationEmail}
        validateOnChange={false}
        onSubmit={values => { navigation.navigate(SIGNUP_PROPERTY) }}
      >
        {props => (
          <View>
            <View style={{ marginBottom: scaleHeight(24) }}>
              <AppInput
                placeholder={'Email'}
                iconLeft={'email'}
                value={props.values.email}
                onValueChange={props.handleChange('email')}
                error={props.errors.email}
              ></AppInput>
            </View>
            <AppButton title={"Continue "} size={'small'} iconRight={'arrowGray'} onPress={props.handleSubmit} />
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
