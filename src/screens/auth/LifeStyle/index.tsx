import {AppButton, AppQA, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './style';
import {PREFERENCES, SIGNUP} from '@routeName';
import {colors, SIZE, validateForm} from '@util';
import {DataSignupProps} from '@interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {setDataSignup} from '@redux';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ROOM_UNIT_HOWNER} from '@mocks';

interface screenNavigationProp {
  navigate: any;
}

const LifeStyle = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };
  const list = ROOM_UNIT_HOWNER;
  const isTenant = dataSignUp?.role_user === 'Tenant';

  const formInitialValues = {
    life_style: dataSignUp?.life_style,
    staying_with_guests: dataSignUp?.staying_with_guests?.value,
  };

  const validationSchema = yup.object().shape({
    life_style: validateForm().common.atLeastOneArray,
  });

  const onSkip = (props: any) => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.life_style = [];
    setData(nData);
    props.setErrors({});
    navigation.navigate(SIGNUP);
  };

  const onContinue = () => {
    navigation.navigate(PREFERENCES);
  };

  const renderFormStepSecond = (props: any) => {
    console.log({props});
    return (
      <>
        <AppQA
          isFlex
          data={list.life_style}
          title={'What’s your lifestyle?'}
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

export {LifeStyle};
