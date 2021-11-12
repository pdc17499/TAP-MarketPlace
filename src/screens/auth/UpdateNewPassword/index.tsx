import { AppButton, AppInput, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { scaleHeight } from '@util';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


interface UpdateNewPasswordProp { }
interface screenNavigationProp {
  navigate: any;
}

const UpdateNewPassword = (props: UpdateNewPasswordProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();

  const formInitialValues = {
    new_password: '',
    confirm_password: '',
    error: '',
  };

  const validationResetPassword = yup.object().shape({
    new_password: yup
      .string()
      .required('This field is required')
      .min(6, 'Password must be at least 6 characters')
      .max(32, 'Password may not be greater than 32 characters'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('new_password'), null], 'Confirm password must match')
  });

  const RenderForm = () => (
    <KeyboardAwareScrollView >
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationResetPassword}
        validateOnChange={false}
        onSubmit={values => { }}
      >
        {props => (
          <View>
            <View style={{ marginBottom: scaleHeight(24) }}>
              <AppInput
                secureTextEntry={true}
                showEye={true}
                label={'New password'}
                iconLeft={'key'}
                value={props.values.new_password}
                onValueChange={props.handleChange('new_password')}
                error={props.errors.new_password}
              />
              <AppInput
                secureTextEntry={true}
                showEye={true}
                label={'Confirm new password'}
                iconLeft={'key'}
                value={props.values.confirm_password}
                onValueChange={props.handleChange('confirm_password')}
                error={props.errors.confirm_password}
              />
            </View>
            <AppButton title={"Reset"} size={'small'} iconRight={'tick'} onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  )

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText
          style={styles.title}>
          {'Reset password'}
        </AppText>
        {RenderForm()}
      </View>
    </View>
  );
};

export { UpdateNewPassword };
