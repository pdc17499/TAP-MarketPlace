import {AppButton, AppQA} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const YourPlace = forwardRef((props: RoomStepProps, ref) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  useImperativeHandle(ref, () => ({
    onSkip,
  }));

  const onSkip = () => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.your_place = [];
    setData(nData);
    // props.setErrors({});
  };

  return (
    <View style={styles.container}>
      <AppQA
        data={list.your_place}
        title={'Is your place?'}
        value={dataSignUp}
        setValue={setData}
        typeList={'column'}
        name={'your_place'}
        customStyleTitle={{textAlign: 'center'}}
        isMultiChoice
      />
      <AppButton
        title={'Next'}
        onPress={onNext}
        iconRight={'arNext'}
        customStyleButton={{backgroundColor: colors.bgSreen}}
        customStyleTitle={{color: colors.primary}}
      />
    </View>
  );
});

export {YourPlace};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.base_space * 4,
    paddingBottom: SIZE.medium_space,
    backgroundColor: colors.bgSreen,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding,
    marginTop: SIZE.base_space / 2,
    maxWidth: scaleWidth(240),
  },
});
