import {AppButton, AppInput, AppQA, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import {scaleHeight, SIZE, validateForm} from '@util';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {styles} from './style';
import * as yup from 'yup';
import {TENANT_PROPERTY} from '@mocks';
import {useDispatch, useSelector} from 'react-redux';
import {setDataSignup} from '@redux';
import {LIFE_STYLE, USER_INFORMATION_COUNTRY} from '@routeName';
import {DataSignupProps} from '@interfaces';
interface screenNavigationProp {
  navigate: any;
}

const UserInformationGender = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const list = TENANT_PROPERTY;
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    gender: dataSignUp?.gender?.value,
    age_group: dataSignUp?.age_group?.value,
    staying_with_guests: dataSignUp?.staying_with_guests?.id,
  };

  const validationForm = yup.object().shape({
    gender: validateForm().common.selectAtLeast,
    age_group: validateForm().common.selectAtLeast,
  });

  const onContinue = () => {
    navigation.navigate(USER_INFORMATION_COUNTRY);
  };

  const onSkip = (props: any) => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.gender = {};
    nData.age_group = {};
    setData(nData);
    props.setErrors({});
    navigation.navigate(USER_INFORMATION_COUNTRY);
  };

  console.log({dataSignUp});

  const RenderForm = () => (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationForm}
      validateOnChange={false}
      enableReinitialize
      onSubmit={onContinue}>
      {(props: any) => (
        <View style={{flex: 1, paddingBottom: SIZE.medium_space}}>
          <View style={{flex: 1}}>
            <AppQA
              data={list.gender}
              title={'How would you describe your gender?'}
              value={dataSignUp}
              setValue={setData}
              name={'gender'}
              typeList={'row'}
              typeTitle={'base'}
              error={props.errors.gender}
            />

            <AppQA
              data={list.group_age}
              title={'What is your age group?'}
              value={dataSignUp}
              setValue={setData}
              name={'age_group'}
              typeList={'even'}
              typeTitle={'base'}
              error={props.errors.age_group}
            />
          </View>
          <AppButton
            customStyleButton={styles.button}
            title={'Continue'}
            size={'small'}
            iconRight={'arNext'}
            onPress={props.handleSubmit}
          />
          {props.values.staying_with_guests === 1 && (
            <AppButton
              customStyleButton={styles.button}
              title={'Skip'}
              typeButton={'underline'}
              onPress={() => onSkip(props)}
            />
          )}
        </View>
      )}
    </Formik>
  );

  return (
    <View style={styles.container}>
      <Header back />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <AppText style={styles.title}>{'About you'}</AppText>
        <AppText
          style={
            styles.message
          }>{`Hi there, ${dataSignUp?.user_name}`}</AppText>
        {RenderForm()}
      </ScrollView>
    </View>
  );
};

export {UserInformationGender};
