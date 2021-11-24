import {AppButton, AppQA, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView} from 'react-native';
import {styles} from './style';
import {SIGNUP} from '@routeName';
import {colors, validateForm} from '@util';
import {DataSignupProps} from '@interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {setDataSignup} from '@redux';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ROOM_UNIT_HOWNER} from '@mocks';

interface screenNavigationProp {
  navigate: any;
}

const Preferences = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };
  const isTenant = dataSignUp?.role_user === 'Tenant';
  const list = ROOM_UNIT_HOWNER;

  const formInitialValues = {
    preferences: dataSignUp?.preferences,
    staying_with_guests: dataSignUp?.staying_with_guests?.value,
  };

  const validationSchema = yup.object().shape({
    preferences: validateForm().common.atLeastOneArray,
  });

  const onSkip = (props: any) => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.preferences = [];
    setData(nData);
    props.setErrors({});
    navigation.navigate(SIGNUP);
  };

  const onContinue = () => {
    navigation.navigate(SIGNUP);
  };

  const renderFormStepSecond = (props: any) => {
    console.log({props});
    return (
      <>
        <AppQA
          isFlex
          data={list.preferences}
          title={'What’s your preferences?'}
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
          title={'Continue'}
          size={'small'}
          iconRight={'arNext'}
          onPress={props.handleSubmit}
        />
        {(props.values.staying_with_guests === 'Yes' || isTenant) && (
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
      <Header back customContainer={{backgroundColor: colors.bgSreen}} />
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

export {Preferences};
