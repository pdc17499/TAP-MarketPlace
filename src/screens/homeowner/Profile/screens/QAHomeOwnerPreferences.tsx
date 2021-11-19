import { AppButton, AppQA, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SIGNUP } from '@routeName';
import { colors, SIZE, validateForm } from '@util';
import { DataSignupProps } from '@interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setDataSignup } from '@redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ROOM_UNIT_HOWNER } from '@mocks';
import { Preferences } from 'src/screens/auth/Preferences';

interface screenNavigationProp {
  navigate: any;
}

const QAHomeOwnerPreferences = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({ data }));
  };

  const list = ROOM_UNIT_HOWNER;

  const formInitialValues = {
    preferences: dataSignUp?.preferences,
    staying_with_guests: dataSignUp?.staying_with_guests?.value,
  };

  const validationSchema = yup.object().shape({
    preferences: validateForm().common.atLeastOneArray,
  });

  const onSkip = (props: any) => {
    const nData: DataSignupProps = { ...dataSignUp };
    nData.preferences = [];
    setData(nData);
    props.setErrors({});
    navigation.navigate(SIGNUP);
  };

  const saveChange = () => {

  };

  const renderFormStepSecond = (props: any) => {
    console.log({ props });
    return (
      <>
        <AppQA
          isFlex
          data={list.preferences}
          title={''}
          value={dataSignUp}
          setValue={setData}
          typeList={'even'}
          name={'preferences'}
          error={props.errors.preferences}
          isMultiChoice
          showIconLeft
          customStyleButton={styles.customStyleButton}
          customStyleTitleButton={styles.customStyleTitleButton}
        />
        <AppButton
          title={'Save change'}
          size={'small'}
          iconRight={'tick'}
          onPress={props.handleSubmit}
        />
        {props.values.staying_with_guests === 'Yes' && (
          <AppButton
            title={'Skip'}
            typeButton={'link'}
            onPress={() => onSkip(props)}
          />
        )}
      </>
    );
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize
          onSubmit={saveChange}>
          {props => renderFormStepSecond(props)}
        </Formik>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSreen,
    paddingHorizontal: SIZE.padding,
    marginTop: -SIZE.big_space

  },
  customStyleButton: {
    flexDirection: 'column',
    paddingVertical: SIZE.base_space,
  },
  customStyleTitleButton: { lineHeight: SIZE.base_size * 1.8 },
});

export { QAHomeOwnerPreferences };
