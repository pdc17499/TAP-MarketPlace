import {AppButton, AppInput, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import {scaleHeight, validateForm} from '@util';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import * as yup from 'yup';
import {UPDATE_NEW_PASSWORD} from '@routeName';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {forgotPassword} from '@redux';

interface ResetPasswordProp {}
interface screenNavigationProp {
  navigate: any;
}

const ResetPassword = (props: ResetPasswordProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();

  const formInitialValues = {
    email: '',
    error: '',
  };

  const validationResetPassword = yup.object().shape({
    email: validateForm().email,
  });

  const sendLinkReset = (email: string) => {
    dispath(forgotPassword({email}));
  };

  const RenderResetForm = () => (
    <KeyboardAwareScrollView>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationResetPassword}
        validateOnChange={false}
        onSubmit={values => {
          sendLinkReset(values.email);
        }}>
        {props => (
          <View>
            <View style={{marginBottom: scaleHeight(24)}}>
              <AppInput
                placeholder={'Email'}
                iconLeft={'email'}
                value={props.values.email}
                onValueChange={props.handleChange('email')}
                error={props.errors.email}
              />
            </View>
            <AppButton
              title={'Send reset link'}
              size={'small'}
              iconRight={'email'}
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Reset password'}</AppText>

        <AppText style={styles.miniTxt}>
          {"We'll send the reset password link to your email."}
        </AppText>

        {RenderResetForm()}
      </View>
    </View>
  );
};

export {ResetPassword};
