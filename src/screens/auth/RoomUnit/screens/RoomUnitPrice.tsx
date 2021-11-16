import React, {useEffect, useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {AppButton, AppInput, AppQA, AppSlider, Header} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import {setDataSignup} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {ROOM_UNIT_LEASE_PERIOD} from '@routeName';

interface screenNavigationProp {
  navigate: any;
}

const RoomUnitPrice = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const signup = useSelector((state: any) => state?.auth?.dataSignup);
  const [dataSignUp, setStateSignup] = useState<DataSignupProps>();
  useEffect(() => {
    setDataSignup(signup);
  }, [signup]);

  const setData = (data: any) => {
    setStateSignup(data);
  };

  const formInitialValues = {
    rental_price: dataSignUp?.rental_price?.value,
    negotiable_price: dataSignUp?.negotiable_price,
    fixed_price: dataSignUp?.fixed_price,
  };

  const validationSchema = yup.object().shape({
    rental_price: validateForm().common.selectAtLeast,
    negotiable_price: yup.string().when('rental_price', {
      is: 'Negotiable',
      then: validateForm().common.reuqire,
    }),
    fixed_price: yup.string().when('rental_price', {
      is: 'Fixed price',
      then: validateForm().common.reuqire,
    }),
  });

  const onNext = () => {
    dispatch(setDataSignup({data: dataSignUp}));
    navigation.navigate(ROOM_UNIT_LEASE_PERIOD);
  };

  const onValuesChangeFinish = (values: any) => {
    const nData: any = {...dataSignUp};
    nData['min_range_price'] = values[0];
    nData['max_range_price'] = values[1];
    setStateSignup(nData);
  };

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...dataSignUp};
      nData[name] = item;
      setStateSignup(nData);
    }
  };

  const renderFixedPrice = (value: string, propsFormik: any) => {
    const name = value === 'Negotiable' ? 'negotiable_price' : 'fixed_price';
    return (
      <AppInput
        value={dataSignUp[name]}
        name={name}
        iconLeft={'dolar'}
        onValueChange={onChangeValue}
        keyboardType={'number-pad'}
        containerStyle={styles.inputStyle}
        inputStyle={{fontSize: scaleSize(18)}}
        autoFocus
        typeInput={'price'}
        error={propsFormik.errors[name]}
      />
    );
  };

  const renderPriceRange = () => {
    return (
      <AppSlider
        onValuesChangeFinish={onValuesChangeFinish}
        min_range_value={dataSignUp?.min_range_price}
        max_range_value={dataSignUp?.max_range_price}
        iconLeft={'dolar'}
      />
    );
  };

  const renderChildren = (props: any) => {
    const value = dataSignUp?.rental_price?.value;
    if (value === 'Negotiable' || value === 'Fixed price') {
      return renderFixedPrice(value, props);
    } else if (value === 'Price range') {
      return renderPriceRange();
    }
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
          {(propsFormik: any) => (
            <>
              <View style={{flex: 1}}>
                <AppQA
                  isFlex
                  data={list.rental_price}
                  title={'What is your rental price?'}
                  value={dataSignUp}
                  name={'rental_price'}
                  setValue={setData}
                  typeList={'column'}
                  children={renderChildren(propsFormik)}
                  error={propsFormik.errors.rental_price}
                />
              </View>
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
    </>
  );
};

export {RoomUnitPrice};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    backgroundColor: colors.white,
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
  inputStyle: {
    marginTop: SIZE.base_space,
    marginBottom: SIZE.padding,
  },
});
