import {AppButton, AppQA} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {fontFamily, scaleWidth, SIZE} from '@util';
import React, {forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Smoking = forwardRef((props: RoomStepProps, ref) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
    onNext();
  };

  useImperativeHandle(ref, () => ({
    onSkip,
  }));

  const onSkip = () => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.smoke = {};
    setData(nData);
  };

  return (
    <View style={styles.container}>
      <AppQA
        data={list.smoking}
        title={'Do you Smoke ?'}
        value={dataSignUp}
        setValue={setData}
        typeList={'row'}
        name={'smoke'}
        customStyleTitle={{textAlign: 'center'}}
      />
    </View>
  );
});

export {Smoking};

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
