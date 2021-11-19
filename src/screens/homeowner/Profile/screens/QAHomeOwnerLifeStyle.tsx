import { AppButton, AppQA, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LIFE_STYLE_STEP, PREFERENCES, SIGNUP } from '@routeName';
import { colors, SIZE, validateForm } from '@util';
import { DataSignupProps } from '@interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setDataSignup } from '@redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ROOM_UNIT_HOWNER } from '@mocks';

interface screenNavigationProp {
  navigate: any;
}
const QAHomeOwnerLifeStyle = (props: any) => {
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
    life_style: dataSignUp?.life_style,
    staying_with_guests: dataSignUp?.staying_with_guests?.value,
  };

  const validationSchema = yup.object().shape({
    life_style: validateForm().common.atLeastOneArray,
  });

  const onContinue = () => {

  };

  const renderFormStepSecond = (props: any) => {
    console.log({ props });
    return (
      <>
        <AppQA
          isFlex
          data={list.life_style}
          title={''}
          customStyleTitle={{ lineHeight: 0 }}
          value={dataSignUp}
          setValue={setData}
          typeList={'even'}
          name={'life_style'}
          error={props.errors.life_style}
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
          onSubmit={onContinue}>
          {props => renderFormStepSecond(props)}
        </Formik>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'colors.bgSreen',
    paddingHorizontal: SIZE.padding,
    marginTop: -SIZE.big_space
  },
  customStyleButton: {
    flexDirection: 'column',
    paddingVertical: SIZE.base_space,
  },
  customStyleTitleButton: { lineHeight: SIZE.base_size * 1.8 },
})

export { QAHomeOwnerLifeStyle };
