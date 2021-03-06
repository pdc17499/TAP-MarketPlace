import { AppButton, AppModalCountry, AppQA, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { fontFamily, SIZE, validateForm } from '@util';
import { Formik } from 'formik';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './style';
import * as yup from 'yup';
import { ROOM_UNIT_HOWNER } from '@mocks';
import { useDispatch, useSelector } from 'react-redux';
import { setDataSignup } from '@redux';
import { AGENCY_BASIC_INFORMATION, LIFE_STYLE, SIGNUP } from '@routeName';
import { DataSignupProps } from '@interfaces';
interface screenNavigationProp {
  navigate: any;
}

const UserInformationGender = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({ data }));
  };
  const isTenant = dataSignUp?.role_user === 'Tenant';
  const isAgent = dataSignUp?.role_user === 'Agent';

  const formInitialValues = {
    country: dataSignUp?.country,
    gender: isAgent ? dataSignUp?.homeowner_gender?.value : dataSignUp?.gender?.value,
    // age_group: dataSignUp?.age_group?.id,
    staying_with_guests: dataSignUp?.staying_with_guests?.value,
  };

  const validationForm = yup.object().shape({
    gender: validateForm().common.selectAtLeast,
    country: validateForm().common.selectAtLeast,
    // age_group: validateForm().common.selectAtLeast,
  });

  const onContinue = () => {
    navigation.navigate(LIFE_STYLE);
  };

  const onSkip = (props: any) => {
    const nData: DataSignupProps = { ...dataSignUp };
    nData.gender = {};
    nData.age_group = {};
    setData(nData);
    props.setErrors({});
    navigation.navigate(isAgent ? AGENCY_BASIC_INFORMATION : SIGNUP);
  };

  const onChangeText = (item: any, name?: string) => {
    if (name) {
      const nData: any = { ...dataSignUp };
      nData[name] = item;
      setData(nData);
    }
  };

  console.log({ dataSignUp });

  const RenderForm = () => (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationForm}
      validateOnChange={false}
      enableReinitialize
      onSubmit={onContinue}>
      {(props: any) => (
        <View style={{ flex: 1, paddingBottom: SIZE.medium_space }}>
          <View style={{ flex: 1, marginBottom: SIZE.big_space * 2 }}>
            <AppQA
              data={list.gender}
              title={isAgent ? 'What is her/his gender?' : 'How would you describe your gender?'}
              value={dataSignUp}
              setValue={setData}
              name={isAgent ? 'homeowner_gender' : 'gender'}
              typeList={'row'}
              typeTitle={'base'}
              error={props.errors.gender}
              customStyleTitle={{ ...fontFamily.fontWeight500 }}
            />

            {/* <AppPicker
              value={props.values.country}
              name={'country'}
              label={'Where do you come from?'}
              onValueChange={onChangeText}
              typePicker={'country'}
              error={props.errors.country}
              customStyleLabel={styles.labelCountry}
            /> */}

            <AppModalCountry
              label={isAgent ? 'Where does she/he come from?' : 'Where do you come from?'}
              name={'country'}
              value={props.values.country}
              onValueChange={onChangeText}
              type={'country'}
              typeButton={'base'}
              customStyleButton={{ paddingTop: 0 }}
            />

            {/* <AppQA
              data={list.group_age}
              title={'What is your age group?'}
              value={dataSignUp}
              setValue={setData}
              name={'age_group'}
              typeList={'even'}
              typeTitle={'base'}
              error={props.errors.age_group}
            /> */}
          </View>
          <AppButton
            customStyleButton={styles.button}
            title={'Continue'}
            size={'small'}
            iconRight={'arNext'}
            onPress={props.handleSubmit}
          />
          {(props.values.staying_with_guests === 'Yes' || isTenant || isAgent) && (
            <AppButton
              customStyleButton={styles.button}
              title={'Skip'}
              typeButton={'link'}
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
        <AppText style={styles.title}>{isAgent ? 'Homeowner' : 'About you'}</AppText>
        <AppText
          style={
            styles.message
          }>{isAgent ? `${dataSignUp?.homeowner_name}` : `Hi there, ${dataSignUp?.user_name}`}</AppText>
        {RenderForm()}
      </ScrollView>
    </View>
  );
};

export { UserInformationGender };
