import {AppButton, AppQA, AppSlider, AppText} from '@component';
import {RoomStepProps} from '@interfaces';
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

const StepRoomDetailFirst = (props: RoomStepProps) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    room_type: dataSignUp?.room_type?.id,
    bedroom_number: dataSignUp?.bedroom_number?.id,
    bathroom_number: dataSignUp?.bathroom_number?.id,
    attached_bathroom: dataSignUp?.attached_bathroom?.id,
  };

  const validationSchema = yup.object().shape({
    room_type: validateForm().common.selectAtLeast,
    bedroom_number: yup.string().when('room_type', {
      is: '1',
      then: validateForm().common.selectAtLeast,
    }),
    bathroom_number: yup.string().when('room_type', {
      is: '1',
      then: validateForm().common.selectAtLeast,
    }),
    attached_bathroom: yup.string().when('room_type', {
      is: '2',
      then: validateForm().common.selectAtLeast,
    }),
  });

  const onValuesChangeFinish = (values: any) => {
    const nData: any = {...dataSignUp};
    nData['floor_size_min'] = values[0];
    nData['floor_size_max'] = values[1];
    setData(nData);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
                data={list.room_type}
                title={'Room type'}
                value={dataSignUp}
                setValue={setData}
                typeList={'even'}
                name={'room_type'}
              />
              {!_.isEmpty(dataSignUp.room_type) && (
                <>
                  {dataSignUp?.room_type?.id == 1 ? (
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
                    </>
                  ) : (
                    <AppQA
                      data={list.attached_bathroom}
                      title={'Attached bathroom'}
                      value={dataSignUp}
                      setValue={setData}
                      typeList={'even'}
                      name={'attached_bathroom'}
                      error={propsFormik.errors.attached_bathroom}
                    />
                  )}

                  <AppText style={styles.title}>
                    {'Floor size'}
                    <AppText style={styles.optional}>{' (optional)'}</AppText>
                  </AppText>
                  <AppSlider
                    onValuesChangeFinish={onValuesChangeFinish}
                    min_range_value={dataSignUp?.floor_size_min}
                    max_range_value={dataSignUp?.floor_size_max}
                    min_range={SLIDER.MIN_FLOOR_SIZE}
                    max_range={SLIDER.MAX_FLOOR_SIZE}
                  />
                </>
              )}
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

export {StepRoomDetailFirst};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
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
