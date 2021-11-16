import { AppButton, AppInput, AppPicker, AppText, Header } from '@component';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
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
import { saveDataUser } from '@redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';

interface HomeOwnerLifeStyleProp { }

interface screenNavigationProp {
  navigate: any;
}

const HomeOwnerLifeStyle = ((props: HomeOwnerLifeStyleProp) => {
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);
  const [users, setUsers] = useState<UserInfo>()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    setUsers(dataUser)
  }, [dataUser])


  const formInitialValues = {
    name: users?.name,
    country: users?.country,
    occupation: users?.occupation,
    ethnicity: users?.ethnicity,
    gender: users?.gender,
    ageGroup: users?.ageGroup,
    religion: users?.religion,
  };

  const validationForm = yup.object().shape({
    place: validateForm().common.selectAtLeast,
    pet: validateForm().common.atLeastOnePicker,
    smoking: validateForm().common.atLeastOnePicker,
    diet: validateForm().common.atLeastOnePicker,
    religion: validateForm().common.atLeastOnePicker,
  });

  const onChangeText = (item: any, name?: string) => {
    if (name) {
      const nData: any = { ...dataUser };
      nData[name] = item;
      setData(nData);
    }
    setShowButton(true)
  };

  const setData = (data: any) => {
    // dispatch(saveDataUser(data));
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

              <AppPicker
                value={props.values.place}
                name={'place'}
                label={'My place is'}
                onValueChange={onChangeText}
                items={list.your_place}
                error={props.errors.place}
                stylePicker={'linear'}
              />

              <AppPicker
                value={props.values.pet}
                name={'pet'}
                label={'Pets'}
                onValueChange={onChangeText}
                items={list.have_pets}
                error={props.errors.pet}
                stylePicker={'linear'}
              />

              <AppPicker
                value={props.values.smoking}
                name={'smoking'}
                label={'Smoking'}
                onValueChange={onChangeText}
                items={list.smoking}
                error={props.errors.smoking}
                stylePicker={'linear'}
              />
              <AppPicker
                value={props.values.diet}
                name={'diet'}
                label={'Diet-choices'}
                onValueChange={onChangeText}
                items={list.diet_choices}
                error={props.errors.diet}
                stylePicker={'linear'}
              />
              <AppPicker
                value={props.values.religion}
                name={'religion'}
                label={'Religion'}
                onValueChange={onChangeText}
                items={list.religions}
                error={props.errors.religion}
                stylePicker={'linear'}
              />
            </View>
            {showButton
              ? <AppButton
                customStyleButton={styles.button}
                title={'Save change'}
                size={'small'}
                iconRight={'tick'}
                onPress={props.handleSubmit}
              />
              : null}

          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Lifestyle & Preferences'}</AppText>
        {RenderForm()}
      </View>
    </View>
  );
});

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
  birthday: {
    fontSize: scaleSize(14),
    color: colors.textSecondPrimary,
    position: 'absolute',
    bottom: 5,
    // backgroundColor: 'red'

  }
});

export { HomeOwnerLifeStyle };
