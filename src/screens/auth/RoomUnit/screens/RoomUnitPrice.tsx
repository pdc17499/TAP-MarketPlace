import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {AppButton, AppInput, AppQA, AppSlider, Header} from '@component';
import {RoomStepProps} from '@interfaces';
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
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const formInitialValues = {
    rental_price: dataSignUp?.rental_price?.value,
    negotiable_price: dataSignUp?.negotiable_price,
    fixed_price: dataSignUp?.fixed_price,
  };

  const validationSchema = yup.object().shape({
    rental_price: validateForm().common.selectAtLeast,
    negotiable_price: yup.string().when('rental_price', {
      is: '1',
      then: validateForm().common.reuqire,
    }),
    fixed_price: yup.string().when('rental_price', {
      is: '2',
      then: validateForm().common.reuqire,
    }),
  });

  const onNext = () => {
    navigation.navigate(ROOM_UNIT_LEASE_PERIOD);
  };

  const onValuesChangeFinish = (values: any) => {
    const nData: any = {...dataSignUp};
    nData['min_range_price'] = values[0];
    nData['max_range_price'] = values[1];
    setData(nData);
  };

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...dataSignUp};
      nData[name] = item;
      setData(nData);
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
        min_range_value={dataSignUp.min_range_price}
        max_range_value={dataSignUp.max_range_price}
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
      <View style={styles.container}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            enableReinitialize
            onSubmit={onNext}>
            {(propsFormik: any) => (
              <>
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
                <AppButton
                  title={'Continue'}
                  onPress={propsFormik.handleSubmit}
                  containerStyle={styles.customStyleButton}
                  iconRight={'arNext'}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
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