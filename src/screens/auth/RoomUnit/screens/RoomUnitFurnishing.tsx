import {AppButton, AppPicker, AppQA, AppText, Header} from '@component';
import {mockProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {colors, fontFamily, scaleWidth, SIZE, validateForm, YEARS} from '@util';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ROOM_UNIT_PLACE_OFFER} from '@routeName';
import {useNavigation} from '@react-navigation/core';

interface screenNavigationProp {
  navigate: any;
}

const RoomUnitFurnishing = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    room_furnishing: dataSignUp?.room_furnishing?.id,
    floor_level: dataSignUp?.floor_level?.id,
    allow_cooking: dataSignUp?.allow_cooking?.id,
  };

  const validationSchema = yup.object().shape({
    room_furnishing: validateForm().common.selectAtLeast,
    floor_level: validateForm().common.selectAtLeast,
    allow_cooking: validateForm().common.selectAtLeast,
  });

  const onChangeText = (item: mockProps, name?: string) => {
    if (name) {
      const nData: any = {...dataSignUp};
      nData[name] = item;
      setData(nData);
    }
  };

  const onNext = () => {
    navigation.navigate(ROOM_UNIT_PLACE_OFFER);
  };

  return (
    <>
      <Header back />
      <View style={styles.container}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            enableReinitialize
            onSubmit={onNext}>
            {(propsFormik: any) => (
              <>
                <AppText style={styles.titleHeading}>{'Room details'}</AppText>
                <AppQA
                  data={list.room_furnishing}
                  title={'Room furnishing'}
                  value={dataSignUp}
                  setValue={setData}
                  typeList={'column'}
                  name={'room_furnishing'}
                  error={propsFormik.errors.room_furnishing}
                />
                <AppQA
                  data={list.floor_level}
                  title={'Floor level'}
                  value={dataSignUp}
                  setValue={setData}
                  typeList={'wrap'}
                  name={'floor_level'}
                  error={propsFormik.errors.floor_level}
                />
                <AppQA
                  data={list.allow_cooking}
                  title={'Allow cooking?'}
                  value={dataSignUp}
                  setValue={setData}
                  typeList={'even'}
                  name={'allow_cooking'}
                  error={propsFormik.errors.allow_cooking}
                />
                <AppText style={styles.title}>
                  {'Built year'}
                  <AppText style={styles.optional}>{' (optional)'}</AppText>
                </AppText>
                <AppPicker
                  value={dataSignUp?.built_year}
                  name={'built_year'}
                  onValueChange={onChangeText}
                  items={YEARS()}
                  style={styles.customContainerPicker}
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
    </>
  );
};

export {RoomUnitFurnishing};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    backgroundColor: colors.white,
  },
  titleHeading: {
    ...fontFamily.fontCampWeight600,
    lineHeight: SIZE.big_size * 1.3,
    fontSize: SIZE.big_size,
    color: colors.primary,
    marginVertical: SIZE.padding / 2,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginTop: SIZE.padding,
  },
  optional: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
  },
  customStyleButton: {
    paddingTop: SIZE.base_space,
    paddingBottom: SIZE.medium_space,
  },
  customContainerPicker: {
    marginTop: SIZE.base_size,
    maxWidth: scaleWidth(106),
    marginBottom: SIZE.medium_space,
  },
});
