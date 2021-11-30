import {AppButton, AppInput, AppPhoneNumber, AppText, Header} from '@component';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import * as yup from 'yup';
import {Formik, FormikValues} from 'formik';
import {UserInfo} from '@interfaces';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CaretRight, IconChangePassword, IconDeleteUser} from '@assets';
import {CHANGE_PASSWORD} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {updateUserInfo} from '@redux';

interface screenNavigationProp {
  navigate: any;
}

const AccountSetting = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const [user, setUser] = useState<UserInfo>();
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);
  const dispatch = useDispatch();
  const formRef: any = useRef<FormikValues>();

  useEffect(() => {
    setUser(dataUser);
  }, [dataUser]);

  const formInitialValues = {
    email: user?.email,
    contact: user?.contact,
  };

  const validationForm = yup.object().shape({
    email: validateForm().email,
    contact: validateForm().common.reuqire,
  });

  const onChangeText = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...user};
      nData[name] = item;
      setUser(nData);
    }
  };

  const onSubmit = (values: any) => {
    console.log({values});
    const body = {
      email: user?.email,
      contact: user?.contact,
    };
    console.log({body});
    dispatch(updateUserInfo({body, id: user?.id}));
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const RenderForm = () => (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1}}>
      <Formik
        innerRef={formRef}
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onSubmit}>
        {(props: any) => (
          <>
            <View style={styles.formik}>
              <AppInput
                label={'Email'}
                value={props.values.email}
                onValueChange={onChangeText}
                error={props.errors.email}
                typeInput={'linear'}
                name={'email'}
              />

              <View style={styles.phoneInput}>
                <AppText style={styles.phoneInputTxt}>{'Phone number'}</AppText>
                <AppPhoneNumber
                  value={props.values.contact}
                  onChangePhone={onChangeText}
                  name={'contact'}
                  type={'inline'}
                  maxLength={30}
                  error={props.errors.contact}
                  showVerifyNumber
                  isContactVerified={user?.isContactVerified}
                  isAccSettingScreen
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
              <Pressable style={styles.item}>
                <IconDeleteUser />
                <AppText style={styles.titleDelete}>{'Delete account'}</AppText>
              </Pressable>
            </View>
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
        <AppButton
          customStyleButton={styles.button}
          title={'Save change'}
          size={'small'}
          iconRight={'tick'}
          onPress={handleSubmit}
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
  formik: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.borderProfileList,
    paddingTop: 10,
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
    paddingBottom: SIZE.padding,
  },
  phoneInputTxt: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.secondPrimary,
    marginTop: SIZE.padding,
  },
});

export {AccountSetting};
