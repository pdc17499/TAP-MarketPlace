import {AppButton, AppQA} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import {ROOM_UNIT_PICTURE} from '@routeName';
import {
  colors,
  DEVICE,
  fontFamily,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';

const StepPlaceOffer = (props: RoomStepProps) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    key_your_place: dataSignUp?.key_your_place,
  };

  const validationSchema = yup.object().shape({
    key_your_place: validateForm().common.atLeastOneArray,
  });

  const onContinue = () => {
    navigation.navigate(ROOM_UNIT_PICTURE);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1, height: DEVICE.height}}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize
          onSubmit={onContinue}>
          {(propsFormik: any) => (
            <>
              <AppQA
                data={list.utilities}
                title={'Let your guests know what your place has to offer'}
                subTitle={'Select some keywords'}
                value={dataSignUp}
                setValue={setData}
                typeList={'wrap'}
                isMultiChoice
                name={'key_your_place'}
                error={propsFormik.errors.key_your_place}
              />
              <AppButton
                title={'Continue'}
                onPress={propsFormik.handleSubmit}
                containerStyle={styles.customStyleButton}
                iconRight={'arNext'}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export {StepPlaceOffer};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    height: DEVICE.height,
  },
  titleHeading: {
    ...fontFamily.fontCampWeight600,
    lineHeight: SIZE.big_size * 1.3,
    fontSize: SIZE.big_size,
    color: colors.primary,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding,
    marginTop: SIZE.padding,
    maxWidth: scaleWidth(240),
  },
  customStyleButton: {
    paddingTop: SIZE.base_space,
    paddingBottom: SIZE.medium_space,
  },
});