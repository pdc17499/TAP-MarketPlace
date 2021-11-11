import { AppButton, AppInput, AppQA, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { scaleHeight } from '@util';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { styles } from './style';
import * as yup from 'yup';
import { TENANT_PROPERTY } from '@mocks';
import { useDispatch, useSelector } from 'react-redux';
import { setDataSignup } from '@redux';
import { LIFE_STYLE } from '@routeName';

interface SignUpPropertyProp {
  route: any;
}

interface screenNavigationProp {
  navigate: any;
}

const UserInformationGender = (props: SignUpPropertyProp) => {
  const NAME = props.route.params
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const list = TENANT_PROPERTY;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({ data }));
  };

  const formInitialValues = {
    gender: '',
    age_group: '',
    error: '',
  };

  const validationForm = yup.object().shape({
    name: yup.string().required('This field is required'),
  });

  const onContinue = () => {
    navigation.navigate(LIFE_STYLE);
  };

  const RenderForm = () => (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationForm}
      validateOnChange={false}
      onSubmit={values => { }}>
      {props => (
        <View style={{ flex: 1, paddingBottom: 48 }}>
          <View style={{ flex: 1 }}>
            <AppQA
              data={list.gender}
              title={'How would you describe your gender?'}
              value={dataSignUp}
              setValue={setData}
              name={'gender'}
              typeList={'row'}
              typeTitle={'base'}
            />

            <AppQA
              data={list.group_age}
              title={'What is your age group?'}
              value={dataSignUp}
              setValue={setData}
              name={'age_group'}
              typeList={'even'}
              typeTitle={'base'}
            />
          </View>
          <AppButton
            customStyleButton={styles.button}
            title={'Continue'}
            size={'small'}
            iconRight={'arNext'}
            onPress={onContinue}
          />
          <AppButton
            customStyleButton={styles.button}
            title={'Skip'}
            typeButton={'underline'}
            onPress={onContinue}
          />
        </View>
      )}
    </Formik>
  );

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'About you'}</AppText>
        <AppText style={styles.message}>{`Hi there, ${NAME.name}`}</AppText>
        {RenderForm()}
      </View>
    </View>
  );
};

export { UserInformationGender };
