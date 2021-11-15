import {AppButton, AppQA} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {fontFamily, scaleWidth, SIZE, validateForm} from '@util';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';

const StepLeasePeriod = (props: RoomStepProps) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    lease_your_place: dataSignUp?.lease_your_place,
    staying_with_guests: dataSignUp?.staying_with_guests?.value,
    kind_place: dataSignUp?.kind_place?.value,
  };

  const validationSchema = yup.object().shape({
    lease_your_place: validateForm().common.atLeastOneArray,
    staying_with_guests: validateForm().common.selectAtLeast,
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onNext}>
        {(propsFormik: any) => (
          <>
            <View style={{flex: 1}}>
              <AppQA
                data={
                  propsFormik.values.kind_place === 'HDB'
                    ? list.lease_your_place_hdb
                    : list.lease_your_place
                }
                title={'How long will you want to lease your place?'}
                value={dataSignUp}
                setValue={setData}
                typeList={'even'}
                name={'lease_your_place'}
                error={propsFormik.errors.lease_your_place}
                isMultiChoice
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
            </View>
            <AppButton
              title={'Continue'}
              onPress={propsFormik.handleSubmit}
              iconRight={'arNext'}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export {StepLeasePeriod};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    paddingBottom: SIZE.medium_space,
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
