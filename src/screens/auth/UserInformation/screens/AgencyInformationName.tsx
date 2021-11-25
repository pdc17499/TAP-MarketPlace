import {AppButton, AppText, Header, AppInput, AppPicker} from '@component';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {DataSignupProps} from '@interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {Formik, FormikValues} from 'formik';
import * as yup from 'yup';
import {setDataSignup} from '@redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SIGNUP} from '@routeName';

interface VerifyCodeProp {
  navigation: any;
  route: any;
}

const AgencyInformationName = ({navigation}: VerifyCodeProp) => {
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };
  const formRef: any = useRef<FormikValues>();

  const formInitialValues = {
    agency_name: dataSignUp?.agency_name,
    license_no: dataSignUp?.license_no,
    sale_person_no: dataSignUp?.sale_person_no,
  };

  const validationForm = yup.object().shape({
    agency_name: validateForm().common.atLeastOnePicker,
    license_no: validateForm().common.reuqire,
    sale_person_no: validateForm().common.reuqire,
  });

  const list = ROOM_UNIT_HOWNER;

  const onChangeValue = (value: any, name?: string) => {
    if (name) {
      const nData: any = {...dataSignUp};
      nData[name] = value;
      setData(nData);
    }
  };

  const onSubmit = () => {
    navigation.navigate(SIGNUP);
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <Header back />
      <KeyboardAwareScrollView style={styles.body}>
        <AppText style={styles.title}>{'Sign up'}</AppText>
        <AppText style={styles.message}>{'Your Agency Information'}</AppText>
        <Formik
          innerRef={formRef}
          initialValues={formInitialValues}
          validationSchema={validationForm}
          validateOnChange={false}
          enableReinitialize
          onSubmit={onSubmit}>
          {props => (
            <>
              <AppPicker
                value={props.values.agency_name}
                error={props.errors.agency_name}
                name={'agency_name'}
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
                name={'license_no'}
                label={'CEA License no.'}
                value={props.values.license_no}
                onValueChange={onChangeValue}
                error={props.errors.license_no}
                placeholder={'e.g. RT45251'}
                customStyleLabel={{marginTop: SIZE.padding}}
              />
              <AppInput
                name={'sale_person_no'}
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
