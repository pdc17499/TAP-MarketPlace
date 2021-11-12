import {AppButton, AppPicker, AppQA} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import {SIGNUP} from '@routeName';
import {colors, fontFamily, scaleWidth, SIZE, validateForm} from '@util';
import {Formik} from 'formik';
import React, {forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

const Religion = forwardRef((props: RoomStepProps, ref) => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    your_religion: dataSignUp?.your_religion,
  };

  const validationForm = yup.object().shape({
    //  your_religion: validateForm().common.selectAtLeast,
  });

  useImperativeHandle(ref, () => ({
    onSkip,
  }));

  const onSkip = () => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.your_place = [];
    setData(nData);
  };

  const onChangeText = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...dataSignUp};
      nData[name] = item;
      setData(nData);
    }
  };

  const onNext = () => {
    navigation.navigate(SIGNUP);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onNext}>
        {(props: any) => {
          console.log({props});
          return (
            <>
              <AppPicker
                value={props.values.your_religion}
                name={'your_religion'}
                onValueChange={onChangeText}
                items={list.religions}
                error={props.errors.your_religion}
              />
              <AppButton
                containerStyle={{marginTop: SIZE.big_space * 5}}
                title={'Next step'}
                onPress={props.handleSubmit}
                iconRight={'arNext'}
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
});

export {Religion};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    // paddingBottom: SIZE.medium_space,
    backgroundColor: colors.bgSreen,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding,
    marginTop: SIZE.base_space / 2,
    maxWidth: scaleWidth(240),
  },
});
