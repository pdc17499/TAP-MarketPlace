import React from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import {AppButton, AppInput, AppQA, AppSlider} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {fontFamily, scaleWidth, SIZE} from '@util';
import {setDataSignup} from '@redux';
import {useDispatch, useSelector} from 'react-redux';

const StepPrice = (props: RoomStepProps) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
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

  const renderFixedPrice = (id: number) => {
    const name = id === 1 ? 'negotiable_price' : 'fixed_price';
    return (
      <AppInput
        value={dataSignUp[name]}
        name={name}
        iconLeft={'dolar'}
        onValueChange={onChangeValue}
        keyboardType={'number-pad'}
        containerStyle={styles.inputStyle}
        autoFocus
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

  const renderChildren = () => {
    const id = dataSignUp?.rental_price?.id;
    if (id === 1 || id === 2) {
      return renderFixedPrice(id);
    } else if (id === 3) {
      return renderPriceRange();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <AppQA
          isFlex
          data={list.rental_price}
          title={'What is your rental price?'}
          value={dataSignUp}
          name={'rental_price'}
          setValue={setData}
          typeList={'column'}
          children={renderChildren()}
        />
      </KeyboardAvoidingView>
      <AppButton
        title={'Continue'}
        onPress={onNext}
        containerStyle={styles.customStyleButton}
        iconRight={'arNext'}
      />
    </View>
  );
};

export {StepPrice};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
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
