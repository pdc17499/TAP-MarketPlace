import {AppButton, AppQA} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import {colors, fontFamily, scaleWidth, SIZE, validateForm} from '@util';
import {Formik} from 'formik';
import React, {forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

const DietChoice = forwardRef((props: RoomStepProps, ref) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    diet_choice: dataSignUp?.diet_choice,
  };

  const validationForm = yup.object().shape({
    diet_choice: validateForm().common.atLeastOneArray,
  });

  useImperativeHandle(ref, () => ({
    onSkip,
  }));

  const onSkip = () => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.diet_choice = [];
    setData(nData);
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onNext}>
        {(propsFormik: any) => (
          <>
            <AppQA
              data={list.diet_choices}
              title={'Your Diet choices ?'}
              value={dataSignUp}
              setValue={setData}
              typeList={'column'}
              name={'diet_choice'}
              isMultiChoice
              titleHighlight={['Diet choices']}
              typeTitle={'center-mix'}
              error={propsFormik.errors.diet_choice}
            />
            <AppButton
              title={'Next'}
              onPress={propsFormik.handleSubmit}
              iconRight={'arNext'}
              customStyleButton={{
                backgroundColor: colors.bgSreen,
                paddingBottom: SIZE.big_space,
              }}
              customStyleTitle={{color: colors.primary}}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
});

export {DietChoice};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding,
    marginTop: SIZE.padding,
    maxWidth: scaleWidth(240),
  },
});
