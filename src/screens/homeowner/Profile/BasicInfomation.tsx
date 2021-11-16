import {AppButton, AppInput, AppPicker, AppText, Header} from '@component';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {UserInfo} from '@interfaces';
import {saveDataUser} from '@redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface BasicInfomationProp {}

interface screenNavigationProp {
  navigate: any;
}

const BasicInfomation = () => {
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const [users, setUsers] = useState<UserInfo>();
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    setUsers(dataUser);
  }, [dataUser]);

  console.log('dataa', dataUser);

  const formInitialValues = {
    name: users?.name,
    country: users?.country,
    occupation: users?.occupation,
    ethnicity: users?.ethnicity,
    gender: users?.gender,
    ageGroup: users?.ageGroup,
  };

  const validationForm = yup.object().shape({
    name: yup.string(),
    country: validateForm().common.selectAtLeast,
    occupation: validateForm().common.atLeastOnePicker,
    ethnicity: validateForm().common.atLeastOnePicker,
    gender: validateForm().common.atLeastOnePicker,
    ageGroup: validateForm().common.atLeastOnePicker,
  });

  const onChangeText = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...dataUser};
      nData[name] = item;
      setData(nData);
    }
  };

  const setData = (data: any) => {
    // dispatch(saveDataUser(users));
  };

  const onSubmit = () => {};

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
                label={'Your name'}
                value={props.values.name}
                onValueChange={onChangeText}
                error={props.errors.name}
                typeInput={'linear'}
                name={'name'}
              />
              <AppPicker
                value={props.values.gender}
                name={'gender'}
                label={'Gender'}
                onValueChange={onChangeText}
                items={list.gender}
                error={props.errors.gender}
                stylePicker={'linear'}
              />
              <AppPicker
                value={props.values.ageGroup}
                name={'ageGroup'}
                label={'Age group'}
                onValueChange={onChangeText}
                items={list.group_age}
                error={props.errors.ageGroup}
                stylePicker={'linear'}
              />
              <AppPicker
                value={props.values.country}
                name={'country'}
                label={'Nationality'}
                onValueChange={onChangeText}
                typePicker={'country'}
                error={props.errors.country}
                stylePicker={'linear'}
              />
              <AppPicker
                value={props.values.occupation}
                name={'occupation'}
                label={'Occupation'}
                onValueChange={onChangeText}
                items={list.occupation}
                error={props.errors.occupation}
                stylePicker={'linear'}
              />
              <AppPicker
                value={props.values.ethnicity}
                name={'ethnicity'}
                label={'Ethnicity'}
                onValueChange={onChangeText}
                items={list.ethnicity}
                error={props.errors.ethnicity}
                stylePicker={'linear'}
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
        <AppText style={styles.title}>{'Basic Infomation'}</AppText>
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
});

export {BasicInfomation};
