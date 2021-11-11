import {AppButton, AppQA} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {fontFamily, scaleWidth, SIZE, validateForm} from '@util';
import {Formik} from 'formik';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

const StepSecond = (props: RoomStepProps) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    kind_place: dataSignUp?.kind_place?.value,
  };

  const validationSchema = yup.object().shape({
    kind_place: validateForm().common.selectAtLeast,
  });

  const renderFormStepSecond = (props: any) => {
    return (
      <>
        <AppQA
          isFlex
          data={list.kind_place}
          title={'What kind of place will you host?'}
          value={dataSignUp}
          setValue={setData}
          typeList={'even'}
          name={'kind_place'}
          customStyleTitle={{maxWidth: scaleWidth(240)}}
          error={props.errors.kind_place}
        />
        <AppButton
          title={'Continue'}
          onPress={props.handleSubmit}
          iconRight={'arNext'}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onNext}>
        {props => renderFormStepSecond(props)}
      </Formik>
    </View>
  );
};

export {StepSecond};

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
