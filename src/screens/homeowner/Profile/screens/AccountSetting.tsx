import { AppButton, AppInput, AppPhoneNumber, AppText, Header } from '@component';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { colors, fontFamily, scaleSize, scaleWidth, SIZE } from '@util';
import * as yup from 'yup';
import { Formik } from 'formik';
import { UserInfo } from '@interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CaretRight, IconChangePassword, IconDeleteUser } from '@assets';
import { CHANGE_PASSWORD } from '@routeName';
import { useNavigation } from '@react-navigation/native';


interface screenNavigationProp {
  navigate: any;
}

const AccountSetting = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const [users, setUsers] = useState<UserInfo>();
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);
  const [showDate, setShowDate] = useState(false);

  const [showButton, setShowButton] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    setUsers(dataUser);
    console.log(dataUser);
  }, [dataUser]);

  console.log('dataa', dataUser);

  const formInitialValues = {
    email: users?.email,
    contact: users?.contact,
  };

  const validationForm = yup.object().shape({
    email: yup
      .string()
      .required('This field is required')
      .email('Email is not valid'),
    phone: yup
      .string()
      .max(30, 'Phone number invalid'),
  });

  const onChangeText = (item: any, name?: string) => {
    if (name) {
      const nData: any = { ...users };
      nData[name] = item;
      setUsers(nData);
    }
    setShowButton(true);
  };

  const onSubmit = () => { };

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
            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: colors.borderProfileList,
                paddingTop: 10,
              }}>
              <AppInput
                label={'Email'}
                value={props.values.email}
                onValueChange={onChangeText}
                error={props.errors.email}
                typeInput={'linear'}
                name={'email'}
              />

              {/* <AppInput
                label={'Your name'}
                value={props.values.name}
                onValueChange={onChangeText}
                error={props.errors.name}
                typeInput={'linear'}
                name={'name'}
              /> */}

              <View style={styles.phoneInput}>
                <AppText style={styles.phoneInputTxt}>{'Phone number'}</AppText>
                <AppPhoneNumber
                  value={props.values.contact}
                  onChangeFlag={setCountryCode}
                  onChangePhone={setPhoneNumber}
                  name={'contact'}
                  type={'inline'}
                />
              </View>
              <Pressable onPress={() => navigation.navigate(CHANGE_PASSWORD)}>
                <View style={styles.item}>
                  <IconChangePassword />
                  <AppText style={styles.titleBold}>
                    {'Change password'}
                  </AppText>
                  <CaretRight iconFillColor={colors.textSecondPrimary} />
                </View>
              </Pressable>
              <View style={styles.item}>
                <IconDeleteUser />
                <AppText style={styles.titleDelete}>{'Delete account'}</AppText>
              </View>
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
        <AppText style={styles.title}>{'Account Setting'}</AppText>
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
    marginTop: SIZE.big_space,
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
  birthday: {
    zIndex: 1000,
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 5,
  },
  birthdayTxt: {
    fontSize: scaleSize(14),
    color: colors.textSecondPrimary,
  },
  titleBold: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.primary,
    marginLeft: scaleWidth(20),
    flex: 1,
  },
  titleDelete: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    marginLeft: scaleWidth(20),
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderProfileList,
    paddingVertical: scaleWidth(20),
  },
  phoneInput: {
    justifyContent: 'center',
    // alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderProfileList,
    paddingBottom: scaleWidth(20),
  },
  phoneInputTxt: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.textPrimary,
    marginTop: scaleWidth(15),
  },
});

export { AccountSetting };
