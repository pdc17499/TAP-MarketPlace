import {AppButton, AppQA} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {fontFamily, scaleWidth, SIZE} from '@util';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const StepLeasePeriod = (props: RoomStepProps) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <AppQA
          data={list.lease_your_place}
          title={'How long will you want to lease your place?'}
          value={dataSignUp}
          setValue={setData}
          typeList={'even'}
          name={'lease_your_place'}
        />
        <AppQA
          data={list.staying_width_guests}
          title={'Will you be staying with your guests?'}
          value={dataSignUp}
          setValue={setData}
          typeList={'wrap'}
          name={'staying_with_guests'}
          customStyleViewButton={{flex: 1}}
        />
      </View>
      <AppButton title={'Continue'} onPress={onNext} iconRight={'arNext'} />
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
