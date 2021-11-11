import {AppButton, AppPicker, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import {validateForm, YEARS} from '@util';
import {Formik} from 'formik';
import React from 'react';
import {View, ScrollView} from 'react-native';
import {styles} from './style';
import * as yup from 'yup';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useDispatch, useSelector} from 'react-redux';
import {setDataSignup} from '@redux';
import {LIFE_STYLE} from '@routeName';
import {DataSignupProps, mockProps} from '@interfaces';
interface screenNavigationProp {
  navigate: any;
}

const UserInformationCountry = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    country: dataSignUp?.country?.value,
    occupation: dataSignUp?.occupation?.value,
    ethnicity: dataSignUp?.ethnicity?.value,
  };

  const validationForm = yup.object().shape({
    country: validateForm().common.selectAtLeast,
    occupation: validateForm().common.selectAtLeast,
    ethnicity: validateForm().common.selectAtLeast,
  });

  const onChangeText = (item: mockProps, name?: string) => {
    if (name) {
      const nData: any = {...dataSignUp};
      nData[name] = item;
      setData(nData);
    }
  };

  const onContinue = () => {
    navigation.navigate(LIFE_STYLE);
  };

  const onSkip = (props: any) => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.gender = {};
    nData.age_group = {};
    setData(nData);
    props.setErrors({});
    navigation.navigate(LIFE_STYLE);
  };

  const RenderForm = () => (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationForm}
      validateOnChange={false}
      onSubmit={onContinue}>
      {(props: any) => (
        <>
          <View style={{flex: 1}}>
            <AppPicker
              value={dataSignUp?.country}
              name={'country'}
              label={'Where do you come from?'}
              onValueChange={onChangeText}
              items={YEARS()}
              error={props.errors.country}
            />

            <AppPicker
              value={dataSignUp?.occupation}
              name={'occupation'}
              label={'What is your occupation?'}
              onValueChange={onChangeText}
              items={list.occupation}
              error={props.errors.occupation}
            />

            <AppPicker
              value={dataSignUp?.ethnicity}
              name={'ethnicity'}
              label={'How do you describe your ethnicity?'}
              onValueChange={onChangeText}
              items={list.ethnicity}
              error={props.errors.ethnicity}
            />
          </View>
          <AppButton
            customStyleButton={styles.button}
            title={'Continue'}
            size={'small'}
            iconRight={'arNext'}
            onPress={props.handleSubmit}
          />
          <AppButton
            customStyleButton={styles.skip}
            title={'Skip'}
            typeButton={'underline'}
            onPress={() => onSkip(props)}
          />
        </>
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

export {UserInformationCountry};
