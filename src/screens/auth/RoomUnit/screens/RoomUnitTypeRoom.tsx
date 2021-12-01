import {AppButton, AppQA, AppText, Header} from '@component';
import {DataSignupProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {colors, fontFamily, scaleWidth, SIZE, validateForm} from '@util';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/core';
import {ROOM_UNIT_PLACE_OFFER} from '@routeName';

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

  const isTenant = dataSignUp?.role_user === 'Tenant';

  const formInitialValues = {
    room_type: dataSignUp?.room_type?.value,
    bedroom_number: dataSignUp?.bedroom_number?.value,
    bathroom_number: dataSignUp?.bathroom_number?.value,
    attached_bathroom: dataSignUp?.attached_bathroom?.value,
    allow_cooking: dataSignUp?.allow_cooking?.value,
    staying_with_guests: dataSignUp?.staying_with_guests?.value,
    bedroom_number_tenant: dataSignUp?.bedroom_number_tenant,
    bathroom_number_tenant: dataSignUp?.bathroom_number_tenant,
  };

  const validationSchema = yup.object().shape({
    room_type: validateForm().common.selectAtLeast,
    bedroom_number: isTenant
      ? yup.object().nullable()
      : yup.string().when('room_type', {
          is: 'Entire Home',
          then: validateForm().common.selectAtLeast,
        }),
    bathroom_number: isTenant
      ? yup.object().nullable()
      : yup.string().when('room_type', {
          is: 'Entire Home',
          then: validateForm().common.selectAtLeast,
        }),
    bedroom_number_tenant: !isTenant
      ? yup.array().nullable()
      : yup.array().when('room_type', {
          is: 'Entire Home',
          then: validateForm().common.atLeastOneArray,
        }),
    bathroom_number_tenant: !isTenant
      ? yup.array().nullable()
      : yup.array().when('room_type', {
          is: 'Entire Home',
          then: validateForm().common.atLeastOneArray,
        }),
    attached_bathroom: yup.string().when('room_type', {
      is: 'Room',
      then: validateForm().common.selectAtLeast,
    }),
    staying_with_guests: isTenant
      ? yup.object().nullable()
      : yup.string().when('room_type', {
          is: 'Room',
          then: validateForm().common.selectAtLeast,
        }),
    allow_cooking: validateForm().common.selectAtLeast,
  });

  const onNext = () => {
    const data = {...dataSignUp};
    const {room_type} = data;
    if (room_type.value === 'Entire Home') {
      data.attached_bathroom = {};
      data.staying_with_guests = {};
    } else {
      data.bedroom_number = {};
      data.bathroom_number = {};
      data.bedroom_number_tenant = [];
      data.bathroom_number_tenant = [];
    }
    dispatch(setDataSignup({data}));
    navigation.navigate(ROOM_UNIT_PLACE_OFFER);
  };

  const onValuesChangeFinish = (values: any) => {
    const nData: any = {...dataSignUp};
    nData['floor_size_min'] = values[0];
    nData['floor_size_max'] = values[1];
    setData(nData);
  };

  const subTitle = !isTenant
    ? 'I want to rent out'
    : 'Room type you’re looking for';
  const cookingTitle = !isTenant ? 'Allow cooking?' : 'Will you be cooking?';
  const attachedTitle = !isTenant
    ? 'Attached bathroom'
    : 'Do you prefer attached bathroom?';
  const listAttached = isTenant
    ? list.attached_bathroom
    : list.attached_bathroom.filter(item => item.label !== 'Any');

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
            <View style={styles.formik}>
              {!isTenant && (
                <AppText style={styles.titleHeading}>{'Room details'}</AppText>
              )}

              <AppQA
                data={list.room_type}
                title={subTitle}
                value={dataSignUp}
                setValue={setData}
                typeList={'even'}
                name={'room_type'}
                customStyleTitle={{maxWidth: scaleWidth(280)}}
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
                        name={
                          isTenant ? 'bedroom_number_tenant' : 'bedroom_number'
                        }
                        error={
                          propsFormik.errors[
                            isTenant
                              ? 'bedroom_number_tenant'
                              : 'bedroom_number'
                          ]
                        }
                        isMultiChoice={isTenant}
                      />
                      <AppQA
                        data={list.bathroom_number}
                        title={'Bathroom number'}
                        value={dataSignUp}
                        setValue={setData}
                        typeList={'row'}
                        name={
                          isTenant
                            ? 'bathroom_number_tenant'
                            : 'bathroom_number'
                        }
                        error={
                          propsFormik.errors[
                            isTenant
                              ? 'bathroom_number_tenant'
                              : 'bathroom_number'
                          ]
                        }
                        isMultiChoice={isTenant}
                      />
                      <AppQA
                        data={list.allow_cooking}
                        title={cookingTitle}
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
                        data={listAttached}
                        title={attachedTitle}
                        value={dataSignUp}
                        setValue={setData}
                        typeList={isTenant ? 'row' : 'even'}
                        name={'attached_bathroom'}
                        error={propsFormik.errors.attached_bathroom}
                        customStyleTitle={{maxWidth: scaleWidth(260)}}
                      />
                      <AppQA
                        data={list.allow_cooking}
                        title={cookingTitle}
                        value={dataSignUp}
                        setValue={setData}
                        typeList={'even'}
                        name={'allow_cooking'}
                        error={propsFormik.errors.allow_cooking}
                      />
                      {!isTenant && (
                        <AppQA
                          data={list.staying_width_guests}
                          title={'Will you be staying with your guests?'}
                          value={dataSignUp}
                          setValue={setData}
                          typeList={'row'}
                          name={'staying_with_guests'}
                          error={propsFormik.errors.staying_with_guests}
                        />
                      )}
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
  formik: {flex: 1, paddingHorizontal: SIZE.padding},
});
