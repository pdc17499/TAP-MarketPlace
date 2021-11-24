import {AppButton, AppQA, Header} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
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
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: DataSignupProps) => {
    console.log({data});
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
    const data = {...dataSignUp};
    const {kind_place, lease_your_place} = data;
    if (lease_your_place?.length > 0) {
      const month = kind_place.value === 'HDB' ? '3 months' : '6 months';
      data.lease_your_place = lease_your_place.filter(
        (item: string) => item !== month,
      );
      console.log({data});
    }
    dispatch(setDataSignup({data}));
    navigation.navigate(ROOM_UNIT_PRICE);
  };

  const isTenant = dataSignUp?.role_user === 'Tenant';

  const title = isTenant
    ? 'Property type you prefer'
    : 'What kind of place will you host?';

  const titleSecond = isTenant
    ? 'Lease period you prefer'
    : 'How long will you want to lease your place?';

  const renderFormStepSecond = (props: any) => {
    console.log({props});
    return (
      <>
        <AppQA
          isFlex
          data={isTenant ? list.kind_place_tenant : list.kind_place}
          title={title}
          value={dataSignUp}
          setValue={setData}
          typeList={'even'}
          name={'kind_place'}
          customStyleTitle={{maxWidth: scaleWidth(isTenant ? 320 : 240)}}
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
              title={titleSecond}
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
