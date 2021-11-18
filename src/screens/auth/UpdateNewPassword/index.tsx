import {AppButton, AppInput, AppText, Header} from '@component';
import {scaleHeight, SIZE, validateForm} from '@util';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {resetNewPassword} from '@redux';

const UpdateNewPassword = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const token = route.params?.token;
  console.log({token});

  const formInitialValues = {
    password: '',
    confirm_password: '',
    error: '',
  };

  const validationResetPassword = yup.object().shape({
    password: validateForm().password,
    confirm_password: validateForm().confirmPassword,
  });

  const onResetPassword = (values: any) => {
    if (token) {
      dispatch(
        resetNewPassword({
          token,
          newPassword: values.password,
        }),
      );
    }
  };

  const RenderForm = () => (
    <KeyboardAwareScrollView>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationResetPassword}
        validateOnChange={false}
        onSubmit={(values: any) => onResetPassword(values)}>
        {props => (
          <View>
            <View style={{marginBottom: scaleHeight(24)}}>
              <AppInput
                secureTextEntry={true}
                showEye={true}
                label={'New password'}
                iconLeft={'key'}
                value={props.values.password}
                onValueChange={props.handleChange('password')}
                error={props.errors.password}
              />
              <AppInput
                containerStyle={{marginTop: SIZE.base_space}}
                secureTextEntry={true}
                // showEye={true}
                label={'Confirm new password'}
                iconLeft={'key'}
                value={props.values.confirm_password}
                onValueChange={props.handleChange('confirm_password')}
                error={props.errors.confirm_password}
              />
            </View>
            <AppButton
              title={'Reset'}
              size={'small'}
              iconRight={'tick'}
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
        {RenderForm()}
      </View>
    </View>
  );
};

export {UpdateNewPassword};
