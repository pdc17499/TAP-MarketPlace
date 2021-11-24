import {
  AppButton,
  AppInput,
  AppModalCountry,
  AppPicker,
  AppText,
  Header,
} from '@component';
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
import { saveDataUser, updateUserInfo } from '@redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { CaretRight } from '@assets';

const BasicInfomation = () => {
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const [user, setUser] = useState<UserInfo>();
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);
  const [showDate, setShowDate] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    setUser(dataUser);
  }, [dataUser]);

  const formInitialValues = {
    name: user?.name,
    nationality: user?.nationality,
    occupation: user?.occupation,
    ethnicity: user?.ethnicity,
    gender: user?.gender,
    ageGroup: user?.ageGroup,
    dob: user?.dob || '',
  };

  const validationForm = yup.object().shape({
    name: validateForm().common.reuqire,
    gender: validateForm().common.atLeastOnePicker,
    nationality: validateForm().common.selectAtLeast,
    ageGroup: validateForm().common.atLeastOnePicker,
    dob: validateForm().common.reuqire,
  });

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = { ...user };
      nData[name] = name === 'nationality' ? item.name : item;
      setUser(nData);
    }
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const hideDatePicker = () => {
    setShowDate(false);
  };

  const onChangDate = (selectedDate: any) => {
    const changeDate = selectedDate || dateOfBirth;
    const birthday = moment(changeDate).format('DD/MM/YYYY');
    console.log('A date has been picked: ', birthday);
    setDateOfBirth(birthday);
    setShowDate(false);
  };

  const onSubmit = () => {
    const body = {
      name: user?.name,
      nationality: user?.nationality,
      occupation: user?.occupation,
      ethnicity: user?.ethnicity,
      gender: user?.gender || '',
      ageGroup: user?.ageGroup || '',
    };

    dispatch(updateUserInfo({ body, id: user?.id }));
  };

  const renderCustomPlaceHolder = (name: string) => {
    return (
      <View style={styles.viewPlacHolder}>
        <AppText style={styles.customPlaceHolder}>
          {`Update your ${name} `}
        </AppText>
        <CaretRight iconFillColor={colors.primary} width={13} height={13} />
      </View>
    );
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
              />
              <AppPicker
                value={props.values.gender}
                name={'gender'}
                label={'Gender'}
                onValueChange={onChangeValue}
                items={list.gender}
                error={props.errors.gender}
                stylePicker={'linear'}
              />
              <View>
                <AppPicker
                  value={props.values.ageGroup}
                  name={'ageGroup'}
                  label={'Age group'}
                  onValueChange={onChangeValue}
                  items={list.group_age}
                  error={props.errors.ageGroup || props.errors.dob}
                  stylePicker={'linear'}
                  customSubview={
                    <Pressable
                      onPress={showDatepicker}
                      style={{ marginTop: SIZE.padding }}>
                      {dateOfBirth === '' ? (
                        renderCustomPlaceHolder('date of birth')
                      ) : (
                        <AppText style={styles.birthdayTxt}>
                          {dateOfBirth}
                        </AppText>
                      )}
                    </Pressable>
                  }
                />

                {showDate && (
                  <DateTimePickerModal
                    isVisible={showDate}
                    mode="date"
                    onConfirm={onChangDate}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()}
                  />
                )}
              </View>
              <AppModalCountry
                name={'nationality'}
                label={'Country'}
                value={props.values.nationality}
                onValueChange={onChangeValue}
                error={props.errors.nationality}
                typeButton={'linear'}
              />
              <AppPicker
                value={props.values.occupation}
                name={'occupation'}
                label={'Occupation'}
                onValueChange={onChangeValue}
                items={list.occupation}
                error={props.errors.occupation}
                stylePicker={'linear'}
                placeholder={{
                  label: '',
                  value: '',
                }}
                customePlaceholder={renderCustomPlaceHolder('Ethnicity')}
              />
              <AppPicker
                value={props.values.ethnicity}
                name={'ethnicity'}
                label={'Ethnicity'}
                onValueChange={onChangeValue}
                items={list.ethnicity}
                error={props.errors.ethnicity}
                stylePicker={'linear'}
                placeholder={{
                  label: '',
                  value: '',
                }}
                customePlaceholder={renderCustomPlaceHolder('Occupation')}
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
    fontSize: scaleSize(14),
    color: colors.textSecondPrimary,
    // marginTop: 20,
  },
  viewPlacHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: SIZE.padding,
    zIndex: -1,
  },
});

export { BasicInfomation };
