import {
  AppButton,
  AppInput,
  AppText,
  Header,
} from '@component';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ROOM_UNIT_HOWNER } from '@mocks';
import { UserInfo } from '@interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateUserInfo } from '@redux';

const AgentInformation = () => {
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const [user, setUser] = useState<UserInfo>();
  const dataUser: any = useSelector((state: any) => state?.auth?.user);
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    setUser(dataUser);
  }, [dataUser]);

  console.log({ user });

  const formInitialValues = {
    name: user?.name,
    agencyName: user?.agencyName,
    licenseNumber: user?.licenseNumber,
    salespersonNumber: user?.salespersonNumber,
  };

  const validationForm = yup.object().shape({
    name: validateForm().common.reuqire,
    agencyName: validateForm().common.reuqire,
    licenseNumber: validateForm().common.reuqire,
    salespersonNumber: validateForm().common.reuqire,
  });

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = { ...user };
      nData[name] = item;
      setUser(nData);
    }
  };

  const onSubmit = () => {
    const body = {
      name: user?.name,
      agencyName: user?.agencyName,
      licenseNumber: user?.licenseNumber,
      salespersonNumber: user?.salespersonNumber
    };
    console.log('h2', body);
    dispatch(updateUserInfo({ body, id: user?.id }));
  };

  const RenderForm = () => (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onSubmit}>
        {(props: any) => (
          <>
            <View style={styles.formikContainer}>
              <AppInput
                label={'Your name'}
                value={props.values.name}
                onValueChange={onChangeValue}
                error={props.errors.name}
                typeInput={'linear'}
                name={'name'}
                gender={user?.gender}
              />
              {/* <AppText style={{ position: 'absolute', top: 0 }}>{'Mr.'}</AppText> */}
              <AppInput
                label={'Agency name'}
                value={props.values.agencyName}
                onValueChange={onChangeValue}
                error={props.errors.agencyName}
                typeInput={'linear'}
                name={'agencyName'}
              />
              <AppInput
                label={'CEA License no.'}
                value={props.values.licenseNumber}
                onValueChange={onChangeValue}
                error={props.errors.licenseNumber}
                typeInput={'linear'}
                name={'licenseNumber'}
              />
              <AppInput
                label={'CEA Salesperson no.'}
                value={props.values.salespersonNumber}
                onValueChange={onChangeValue}
                error={props.errors.salespersonNumber}
                typeInput={'linear'}
                name={'salespersonNumber'}
              />
            </View>
            <AppButton
              customStyleButton={styles.button}
              title={'Save change'}
              size={'small'}
              iconRight={'tick'}
              onPress={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Agent Information'}</AppText>
        {RenderForm()}
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
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  formikContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.borderProfileList,
    paddingTop: 10,
  },
  customPlaceHolder: {
    color: colors.primary,
    ...fontFamily.fontWeight600,
    fontSize: scaleSize(14),
    zIndex: -1,
  },
  title: {
    fontSize: scaleSize(24),
    ...fontFamily.fontWeight500,
    marginTop: SIZE.base_space,
    marginBottom: scaleWidth(27),
    color: colors.textPrimary,
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    color: colors.textPrimary,
  },
  text: {
    fontSize: scaleSize(15),
    ...fontFamily.fontWeight500,
    lineHeight: scaleWidth(15),
    marginBottom: scaleWidth(10),
    color: colors.primary,
  },
  text2: {
    fontSize: scaleSize(15),
    ...fontFamily.fontWeight500,
    lineHeight: scaleWidth(15),
    color: colors.primary,
    marginBottom: -5,
  },
  input: {},
  inputAge: {
    marginBottom: scaleWidth(30),
    width: scaleWidth(106),
  },
  button: {
    marginTop: SIZE.medium_space,
    marginBottom: SIZE.medium_space,
  },
  skip: {
    marginBottom: SIZE.medium_space,
  },
  code: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgInput,
    borderRadius: 8,
    paddingHorizontal: 13,
    minHeight: SIZE.input_height,
  },
  birthdayTxt: {
    fontSize: scaleSize(15),
    color: colors.textSecondPrimary,
    // marginTop: 20,
  },
  viewPlacHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    bottom: SIZE.padding + 4,
    marginTop: -SIZE.base_space,
  },
  viewPlacHolderDOB: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    bottom: SIZE.padding + 8,
  },
});

export { AgentInformation };
