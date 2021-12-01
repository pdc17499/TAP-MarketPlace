import { AppButton, AppText, Header, AppInput, AppPicker } from '@component';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { DataSignupProps } from '@interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { ROOM_UNIT_HOWNER } from '@mocks';
import { Formik, FormikValues } from 'formik';
import * as yup from 'yup';
import { setDataSignup } from '@redux';
import { AGENCY_INFORMATION_NAME } from '@routeName';

interface VerifyCodeProp {
  navigation: any;
  route: any;
}

const AgencyBasicInformation = ({ navigation }: VerifyCodeProp) => {
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const formRef: any = useRef<FormikValues>();

  const formInitialValues = {
    user_name: dataSignUp?.user_name,
    gender: dataSignUp?.gender,
  };

  const validationForm = yup.object().shape({
    user_name: validateForm().common.reuqire,
    gender: validateForm().common.compareNA,
  });

  const list = ROOM_UNIT_HOWNER;

  const onChangeValue = (value: any, name?: string) => {
    if (name) {
      const data: any = { ...dataSignUp };
      data[name] = value;
      dispatch(setDataSignup({ data }));
    }
  };

  const onSubmit = (values: any) => {
    navigation.navigate(AGENCY_INFORMATION_NAME);
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Sign up'}</AppText>
        <AppText style={styles.message}>{'Your Name'}</AppText>
        <Formik
          innerRef={formRef}
          initialValues={formInitialValues}
          validationSchema={validationForm}
          validateOnChange={false}
          enableReinitialize
          onSubmit={onSubmit}>
          {props => (
            <>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <AppPicker
                    value={props.values.gender}
                    name={'gender'}
                    onValueChange={onChangeValue}
                    items={list.gender_agency}
                    style={{ width: scaleWidth(90), marginRight: scaleWidth(20) }}
                  />
                </View>

                <AppInput
                  name={'user_name'}
                  value={props.values.user_name}
                  onValueChange={onChangeValue}
                  containerStyle={styles.input}
                  placeholder={'Enter your name'}
                />
              </View>
              <AppText
                style={
                  props.errors.user_name ? styles.errorInput : styles.error
                }>
                {props.errors.gender || props.errors.user_name}
              </AppText>
            </>
          )}
        </Formik>
      </View>
      <View style={styles.buttonView}>
        <AppButton
          onPress={handleSubmit}
          title={'Continue'}
          size={'small'}
          iconRight={'arNext'}
        />
      </View>
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
  buttonView: {
    paddingHorizontal: SIZE.padding,
    paddingBottom: SIZE.medium_space,
  },
  title: {
    fontSize: scaleSize(18),
    ...fontFamily.fontCampWeight600,
    marginTop: SIZE.base_space / 2,
    marginBottom: scaleWidth(15),
    color: colors.textSecondPrimary,
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    color: colors.textPrimary,
    width: scaleWidth(280),
  },
  error: {
    marginTop: 5,
    color: colors.red,
    fontSize: scaleSize(15),
    lineHeight: scaleSize(17),
  },
  errorInput: {
    marginLeft: scaleWidth(90) + SIZE.base_space,
    marginTop: 5,
    color: colors.red,
    fontSize: scaleSize(15),
    lineHeight: scaleSize(17),
  },
  input: {
    flex: 1,
    // marginLeft: SIZE.base_space,
    marginTop: SIZE.base_space,
  },
});

export { AgencyBasicInformation };
