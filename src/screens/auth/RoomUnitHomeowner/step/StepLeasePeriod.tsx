import {AppButton, AppQA} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {fontFamily, scaleWidth, SIZE} from '@util';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface screenNavigationProp {
  navigate: any;
}

const StepLeasePeriod = (props: RoomStepProps) => {
  const {onNext, room, setRoom} = props;

  const data = ROOM_UNIT_HOWNER;

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <AppQA
          data={data.lease_your_place}
          title={'How long will you want to lease your place?'}
          value={room}
          setValue={setRoom}
          typeList={'row'}
          name={'lease_your_place'}
        />
        <AppQA
          data={data.staying_width_guests}
          title={'Will you be staying with your guests?'}
          value={room}
          setValue={setRoom}
          typeList={'row'}
          name={'staying_with_guests'}
          customStyleViewButton={{flex: 1}}
        />
      </View>
      <AppButton title={'Continue'} onPress={onNext} />
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
