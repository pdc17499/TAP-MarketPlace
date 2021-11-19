import {AppButton, AppQA, Header} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import {ROOM_UNIT_PRICE} from '@routeName';
import {fontFamily, scaleWidth, SIZE, validateForm} from '@util';
import {Formik} from 'formik';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

interface screenNavigationProp {
  navigate: any;
}

const RoomUnitKindPlace = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    lease_your_place: dataSignUp?.lease_your_place,
    kind_place: dataSignUp?.kind_place?.value,
  };

  const validationSchema = yup.object().shape({
    lease_your_place: validateForm().common.atLeastOneArray,
    kind_place: validateForm().common.selectAtLeast,
  });

  const onNext = () => {
    navigation.navigate(ROOM_UNIT_PRICE);
  };

  const renderFormStepSecond = (props: any) => {
    console.log({props});
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
        {props.values.kind_place && (
          <>
            <AppQA
              data={
                props.values.kind_place === 'HDB'
                  ? list.lease_your_place_hdb
                  : list.lease_your_place
              }
              title={'How long will you want to lease your place?'}
              value={dataSignUp}
              setValue={setData}
              typeList={'even'}
              name={'lease_your_place'}
              error={props.errors.lease_your_place}
              isMultiChoice
            />
            <AppButton
              title={'Continue'}
              onPress={props.handleSubmit}
              iconRight={'arNext'}
              containerStyle={{marginBottom: SIZE.medium_space}}
            />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Header back />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize
          onSubmit={onNext}>
          {props => renderFormStepSecond(props)}
        </Formik>
      </ScrollView>
    </>
  );
};

export {RoomUnitKindPlace};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    paddingBottom: SIZE.medium_space,
    backgroundColor: 'white',
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
