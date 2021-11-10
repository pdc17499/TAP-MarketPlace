import {AppButton, AppQA} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import {SIGNUP} from '@routeName';
import {fontFamily, scaleWidth, SIZE} from '@util';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const DietChoice = (props: RoomStepProps) => {
  const {onNext} = props;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const onPress = () => {
    navigation.navigate(SIGNUP);
  };

  return (
    <ScrollView style={styles.container}>
      <AppQA
        data={list.diet_choices}
        title={'Your Diet choices ?'}
        value={dataSignUp}
        setValue={setData}
        typeList={'column'}
        name={'diet_choice'}
        customStyleTitle={{textAlign: 'center'}}
      />
      <AppButton title={'Continue'} onPress={onPress} iconRight={'arNext'} />
    </ScrollView>
  );
};

export {DietChoice};

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
