import {AppButton, AppInput, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import {
  colors,
  fontFamily,
  scaleHeight,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {changePassword} from '@redux';

interface ChangePasswordProp {}
interface screenNavigationProp {
  navigate: any;
}

const ChangePassword = (props: ChangePasswordProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();

  const formInitialValues = {
    old_password: '',
    new_password: '',
    confirm_password: '',
    error: '',
  };

  const validationResetPassword = yup.object().shape({
    old_password: validateForm().password,
    new_password: validateForm().newPassword,
    confirm_password: validateForm().confirmPassword,
  });

  const onSubmit = (values: any) => {
    const body = {
      oldPassword: values.old_password,
      newPassword: values.new_password,
    };

    console.log({body});

    dispath(changePassword(body));
  };

  const RenderForm = () => (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <AppText style={styles.title}>{'Change Password'}</AppText>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationResetPassword}
        validateOnChange={false}
        onSubmit={onSubmit}>
        {props => (
          <>
            <View style={{flex: 1}}>
              <AppInput
                containerStyle={{marginTop: SIZE.base_space / 2}}
                secureTextEntry={true}
                showEye={true}
                label={'Old Password'}
                value={props.values.old_password}
                onValueChange={props.handleChange('old_password')}
                error={props.errors.old_password}
              />
              <AppInput
                containerStyle={{marginTop: SIZE.base_space / 2}}
                secureTextEntry={true}
                showEye={true}
                label={'New Password'}
                value={props.values.new_password}
                onValueChange={props.handleChange('new_password')}
                error={props.errors.new_password}
              />
              <AppInput
                containerStyle={{marginTop: SIZE.base_space / 2}}
                secureTextEntry={true}
                // showEye={true}
                label={'Confirm New Password'}
                // iconLeft={'key'}
                value={props.values.confirm_password}
                onValueChange={props.handleChange('confirm_password')}
                error={props.errors.confirm_password}
              />
            </View>
            <AppButton
              title={'Save new password'}
              size={'small'}
              iconRight={'tick'}
              onPress={props.handleSubmit}
              customStyleButton={{marginTop: scaleHeight(90)}}
            />
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>{RenderForm()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: SIZE.padding,
    flex: 1,
  },
  title: {
    fontSize: SIZE.big_size - 4,
    marginTop: SIZE.big_space,
    alignSelf: 'center',
    ...fontFamily.fontCampWeight600,
    marginBottom: scaleWidth(20),
    color: colors.primary,
  },
  miniTxt: {
    color: colors.textThirdPrimary,
    ...fontFamily.fontWeight400,
    width: scaleWidth(200),
    marginTop: scaleWidth(35),
    marginBottom: scaleWidth(30),
    textAlign: 'center',
    alignSelf: 'center',
  },
  sendButton: {
    marginTop: scaleWidth(15),
  },
});

export {ChangePassword};
