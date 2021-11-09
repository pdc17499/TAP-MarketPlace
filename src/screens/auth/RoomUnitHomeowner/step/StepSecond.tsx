import {AppButton, AppInput, AppQA, AppText, Header} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface screenNavigationProp {
  navigate: any;
}

const StepSecond = (props: RoomStepProps) => {
  const navigation = useNavigation<screenNavigationProp>();
  const [location, setLocation] = useState('');
  const {onNext, room, onChangeValue, setRoom} = props;

  const data = ROOM_UNIT_HOWNER;

  return (
    <View style={styles.container}>
      <AppQA
        isFlex
        data={data.place}
        title={'What kind of place will you host?'}
        value={room}
        setValue={setRoom}
        typeList={'row'}
        name={'kind_place'}
      />
      <AppButton title={'Continue'} onPress={onNext} />
    </View>
  );
};

export {StepSecond};

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
