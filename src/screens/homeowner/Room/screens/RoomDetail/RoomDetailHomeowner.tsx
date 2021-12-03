import {
  AppButton,
  AppInput,
  AppModalCountry,
  AppPicker,
  AppQA,
  AppText,
} from '@component';
import React, { useRef, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import {
  CaretRight,
} from '@assets';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  STYLE,
  validateForm,
} from '@util';
import { useNavigation } from '@react-navigation/core';
import { Formik, FormikValues } from 'formik';
import { ROOM_UNIT_HOWNER } from '@mocks';
import * as yup from 'yup';
import { DataSignupProps, UserInfo } from '@interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const RoomDetailHomeowner = ({ props }: any) => {
  const key = props;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const ROOM: any = useSelector((state: any) => state?.rooms?.roomDetail);
  const list = ROOM_UNIT_HOWNER;
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);
  const [showDate, setShowDate] = useState(false);
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );

  const [user, setUser] = useState({
    name: 'Ether Adele',
    nationality: 'Singapore',
    occupation: '',
    ethnicity: '',
    gender: 'Female',
    ageGroup: null,
    dob: '',
    life_style: ['Vegetarian', 'Working'],
    preferences: ['Student', 'Pet friendly']
  });

  const formRef: any = useRef<FormikValues>();


  console.log({ user });

  const formateDateServer = (date: any) => {
    return date
      ? moment(date, 'YYYY-MM-DDTHH:mm:ssSSZ').format('DD/MM/YYYY')
      : '';
  };

  const formInitialValues = {
    name: user?.name,
    nationality: user?.nationality,
    occupation: user?.occupation,
    ethnicity: user?.ethnicity,
    gender: user?.gender,
    ageGroup: user?.ageGroup,
    dob: user?.dob,
    life_style: user?.life_style,
    preferences: user?.preferences
  };

  const validationForm = yup.object().shape({
    name: validateForm().common.reuqire,
    // gender: validateForm().common.atLeastOnePicker,
    // nationality: validateForm().common.selectAtLeast,
    // ageGroup: validateForm().common.atLeastOnePicker,
    // dob: validateForm().common.reuqire,
  });

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = { ...user };
      nData[name] = item;
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
    const changeDate = selectedDate || '';
    const birthday = moment(changeDate).format('DD/MM/YYYY');
    onChangeValue(birthday, 'dob');
    setShowDate(false);
  };

  const formateDate = (date: any) => {
    return date ? moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
  };

  const onSubmit = () => {
    // let body: any = {
    //   name: user?.name,
    //   nationality: user?.nationality,
    //   occupation: user?.occupation,
    //   ethnicity: user?.ethnicity,
    //   gender: user?.gender === 'N/A' ? '' : user?.gender,
    //   ageGroup: typeof user?.ageGroup === 'number' ? user?.ageGroup : 0,
    //   dob: formateDate(user?.dob),
    // };
    // console.log('bbb', body);
    // dispatch(updateUserInfo({ body, id: user?.id }));
  };

  const renderCustomPlaceHolder = (name: string) => {
    const style =
      name === 'date of birth'
        ? styles.viewPlacHolderDOB
        : styles.viewPlacHolder;
    return (
      <View style={style}>
        <AppText style={styles.customPlaceHolder}>
          {`Update your ${name} `}
        </AppText>
        <CaretRight iconFillColor={colors.primary} width={13} height={13} />
      </View>
    );
  };

  const setData = (data: any) => {
    // dispatch(setDataSignup({ data }));
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
                label={'Name'}
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
                showDot
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
                  showDot
                  customSubview={
                    <Pressable
                      hitSlop={STYLE.hitSlop}
                      onPress={showDatepicker}
                      style={{ marginTop: SIZE.padding }}>
                      {!props.values.dob ? (
                        renderCustomPlaceHolder('date of birth')
                      ) : (
                        <View style={styles.viewPlacHolderDOB}>
                          <AppText style={styles.birthdayTxt}>
                            {props.values.dob}
                          </AppText>
                        </View>
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
                type={'country'}
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
                customePlaceholder={renderCustomPlaceHolder('Occupation')}
                showDot
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
                customePlaceholder={renderCustomPlaceHolder('Ethnicity')}
                showDot
              />
            </View>

            <AppQA
              isFlex
              data={list.life_style}
              title={'Lifestyle'}
              customStyleTitle={styles.titleQa}
              value={user}
              setValue={setUser}
              typeList={'even'}
              name={'life_style'}
              error={props.errors.life_style}
              isMultiChoice
              showIconLeft
              customStyleButton={styles.customStyleButton}
              customStyleTitleButton={styles.customStyleTitleButton}
            />

            <AppQA
              isFlex
              data={list.preferences}
              title={'Preferences'}
              customStyleTitle={styles.titleQa}
              value={user}
              setValue={setUser}
              typeList={'even'}
              name={'preferences'}
              error={props.errors.preferences}
              isMultiChoice
              showIconLeft
              customStyleButton={styles.customStyleButton}
              customStyleTitleButton={styles.customStyleTitleButton}
            />

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
      <View style={styles.body}>

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
    // paddingHorizontal: SIZE.padding,
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
  customStyleButton: {
    flexDirection: 'column',
    paddingVertical: SIZE.base_space,
  },
  customStyleTitleButton: { lineHeight: SIZE.base_size * 1.8 },
  titleQa: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.secondPrimary
  }
});

export { RoomDetailHomeowner };
