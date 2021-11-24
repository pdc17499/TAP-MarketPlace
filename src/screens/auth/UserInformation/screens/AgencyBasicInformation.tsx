import {AppButton, AppText, Header, AppInput, AppPicker} from '@component';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DataSignupProps, VerifyAccountProps} from '@interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {Formik, FormikValues} from 'formik';
import * as yup from 'yup';
import {setDataSignup} from '@redux';
import {AGENCY_INFORMATION_NAME} from '@routeName';

interface VerifyCodeProp {
  navigation: any;
  route: any;
}

const AgencyBasicInformation = ({navigation}: VerifyCodeProp) => {
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const formRef: any = useRef<FormikValues>();

  const formInitialValues = {
    user_name: '',
    gender: 'Mr.',
  };

  const validationForm = yup.object().shape({
    user_name: validateForm().common.reuqire,
    gender: validateForm().common.compareNA,
  });

  const list = ROOM_UNIT_HOWNER;

  const onSubmit = (values: any) => {
    const data = {...dataSignUp};
    data.user_name = values.gender + values.user_name.trim();
    console.log({data});
    dispatch(setDataSignup({data}));
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppPicker
                  value={props.values.gender}
                  name={'gender'}
                  onValueChange={value => props.setFieldValue('gender', value)}
                  items={list.gender_agency}
                  customStyleInputPicker={{width: scaleWidth(90)}}
                />
                <AppInput
                  name={'user_name'}
                  value={props.values.user_name}
                  onValueChange={value =>
                    props.setFieldValue('user_name', value)
                  }
                  containerStyle={{
                    flex: 1,
                    marginLeft: SIZE.base_space,
                    marginTop: SIZE.base_space,
                  }}
                  placeholder={'Enter your name'}
                />
              </View>
              <AppText style={styles.error}>
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
});

export {AgencyBasicInformation};
