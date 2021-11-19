import {AppButton, AppQA, AppSlider, AppText, Header} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {
  colors,
  fontFamily,
  scaleWidth,
  SIZE,
  SLIDER,
  validateForm,
} from '@util';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/core';
import {ROOM_UNIT_FURNISHING, ROOM_UNIT_PLACE_OFFER} from '@routeName';

interface screenNavigationProp {
  navigate: any;
}

const RoomUnitTypeRoom = () => {
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
    room_type: dataSignUp?.room_type?.value,
    bedroom_number: dataSignUp?.bedroom_number?.value,
    bathroom_number: dataSignUp?.bathroom_number?.value,
    attached_bathroom: dataSignUp?.attached_bathroom?.value,
    allow_cooking: dataSignUp?.allow_cooking?.value,
    staying_with_guests: dataSignUp?.staying_with_guests?.value,
  };

  const validationSchema = yup.object().shape({
    room_type: validateForm().common.selectAtLeast,
    bedroom_number: yup.string().when('room_type', {
      is: 'Entire Home',
      then: validateForm().common.selectAtLeast,
    }),
    bathroom_number: yup.string().when('room_type', {
      is: 'Entire Home',
      then: validateForm().common.selectAtLeast,
    }),
    attached_bathroom: yup.string().when('room_type', {
      is: 'Room',
      then: validateForm().common.selectAtLeast,
    }),
    staying_with_guests: yup.string().when('room_type', {
      is: 'Room',
      then: validateForm().common.selectAtLeast,
    }),
    allow_cooking: validateForm().common.selectAtLeast,
  });

  const onNext = () => {
    navigation.navigate(ROOM_UNIT_PLACE_OFFER);
  };

  const onValuesChangeFinish = (values: any) => {
    const nData: any = {...dataSignUp};
    nData['floor_size_min'] = values[0];
    nData['floor_size_max'] = values[1];
    setData(nData);
  };

  return (
    <View style={{flex: 1}}>
      <Header back />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize
          onSubmit={onNext}>
          {(propsFormik: any) => (
            <View style={{flex: 1, paddingHorizontal: SIZE.padding}}>
              <AppText style={styles.titleHeading}>{'Room details'}</AppText>
              <AppQA
                data={list.room_type}
                title={'I want to rent out'}
                value={dataSignUp}
                setValue={setData}
                typeList={'even'}
                name={'room_type'}
                error={propsFormik.errors.room_type}
              />
              {!_.isEmpty(dataSignUp.room_type) && (
                <>
                  {dataSignUp?.room_type?.value == 'Entire Home' ? (
                    <>
                      <AppQA
                        data={list.bedroom_number}
                        title={'Bedroom number'}
                        value={dataSignUp}
                        setValue={setData}
                        typeList={'row'}
                        name={'bedroom_number'}
                        error={propsFormik.errors.bedroom_number}
                      />
                      <AppQA
                        data={list.bathroom_number}
                        title={'Bathroom number'}
                        value={dataSignUp}
                        setValue={setData}
                        typeList={'row'}
                        name={'bathroom_number'}
                        error={propsFormik.errors.bathroom_number}
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
                    </>
                  ) : (
                    <>
                      <AppQA
                        data={list.attached_bathroom}
                        title={'Attached bathroom'}
                        value={dataSignUp}
                        setValue={setData}
                        typeList={'even'}
                        name={'attached_bathroom'}
                        error={propsFormik.errors.attached_bathroom}
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
                      <AppQA
                        data={list.staying_width_guests}
                        title={'Will you be staying with your guests?'}
                        value={dataSignUp}
                        setValue={setData}
                        typeList={'row'}
                        name={'staying_with_guests'}
                        error={propsFormik.errors.staying_with_guests}
                      />
                    </>
                  )}

                  {/* <AppText style={styles.title}>
                    {'Floor size'}
                    <AppText style={styles.optional}>{' (optional)'}</AppText>
                  </AppText> */}
                  {/* <AppSlider
                    onValuesChangeFinish={onValuesChangeFinish}
                    min_range_value={dataSignUp?.floor_size_min}
                    max_range_value={dataSignUp?.floor_size_max}
                    min_range={SLIDER.MIN_FLOOR_SIZE}
                    max_range={SLIDER.MAX_FLOOR_SIZE}
                    iconLeft={'floor_size'}
                  /> */}
                  <AppButton
                    title={'Continue'}
                    onPress={propsFormik.handleSubmit}
                    containerStyle={styles.customStyleButton}
                    iconRight={'arNext'}
                  />
                </>
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export {RoomUnitTypeRoom};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
