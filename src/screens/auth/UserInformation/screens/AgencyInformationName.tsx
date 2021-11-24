import {AppButton, AppText, Header, AppInput, AppPicker} from '@component';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DataSignupProps, VerifyAccountProps} from '@interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {Formik} from 'formik';
import * as yup from 'yup';
import {setDataSignup} from '@redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface VerifyCodeProp {
  navigation: any;
  route: any;
}

const AgencyInformationName = (props: VerifyCodeProp) => {
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    agency_name: dataSignUp?.agency_name,
    license_no: dataSignUp?.license_no,
    sale_person_no: dataSignUp?.sale_person_no,
  };

  const validationForm = yup.object().shape({
    gender: validateForm().common.selectAtLeast,
    country: validateForm().common.selectAtLeast,
  });

  const list = ROOM_UNIT_HOWNER;

  const onChangeValue = (value: string, name?: string) => {};

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <Header back />
      <KeyboardAwareScrollView style={styles.body}>
        <AppText style={styles.title}>{'Sign up'}</AppText>
        <AppText style={styles.message}>{'Your Agency Information'}</AppText>
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationForm}
          validateOnChange={false}
          enableReinitialize
          onSubmit={handleSubmit}>
          {props => (
            <>
              <AppPicker
                value={props.values.agency_name}
                error={props.errors.agency_name}
                name={'gender'}
                label={'Agency name'}
                onValueChange={onChangeValue}
                items={list.agency_name}
                placeholder={{label: 'Your Agency name'}}
                customStyleLabel={{
                  color: colors.primary,
                  ...fontFamily.fontWeight500,
                }}
              />
              <AppInput
                name={'user_name'}
                label={'CEA License no.'}
                value={props.values.license_no}
                onValueChange={onChangeValue}
                error={props.errors.license_no}
                placeholder={'e.g. RT45251'}
                customStyleLabel={{marginTop: SIZE.padding}}
              />
              <AppInput
                name={'user_name'}
                label={'CEA Salesperson no.'}
                value={props.values.sale_person_no}
                onValueChange={onChangeValue}
                error={props.errors.sale_person_no}
                placeholder={'e.g. RT45251'}
                customStyleLabel={{marginTop: SIZE.padding}}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <View style={styles.buttonView}>
        <AppButton title={'Continue'} size={'small'} iconRight={'arNext'} />
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
    marginTop: scaleWidth(5),
    marginBottom: scaleWidth(15),
    color: colors.textSecondPrimary,
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    color: colors.textPrimary,
    width: scaleWidth(280),
    marginBottom: SIZE.base_space,
  },
});

export {AgencyInformationName};
