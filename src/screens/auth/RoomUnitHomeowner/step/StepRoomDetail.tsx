import {AppButton, AppPicker, AppQA, AppText} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {colors, fontFamily, scaleWidth, SIZE, YEARS} from '@util';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface screenNavigationProp {
  navigate: any;
}

const StepRoomDetail = (props: RoomStepProps) => {
  const navigation = useNavigation<screenNavigationProp>();
  const {onNext, room, onChangeValue, setRoom} = props;
  const data = ROOM_UNIT_HOWNER;

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <AppText style={styles.titleHeading}>{'Room details'}</AppText>
        <AppQA
          data={data.roomFurnishing}
          title={'Room furnishing'}
          value={room}
          setValue={setRoom}
          name={'room_furnishing'}
        />
        <AppQA
          data={data.floor_level}
          title={'Floor level'}
          value={room.floor_level}
          setValue={setRoom}
          typeList={'row'}
          name={'floor_level'}
        />
        <AppQA
          data={data.allow_cooking}
          title={'Allow cooking?'}
          value={room}
          setValue={setRoom}
          typeList={'row'}
          name={'allow_cooking'}
          customStyleViewButton={{flex: 1}}
        />
        <AppText style={styles.title}>
          {'Built year'}
          <AppText style={styles.optional}>{' (optional)'}</AppText>
        </AppText>
        <AppPicker
          value={room.built_year}
          name={'built_year'}
          onValueChange={onChangeValue}
          items={YEARS()}
          style={styles.customContainerPicker}
        />
      </ScrollView>
      <AppButton
        title={'Continue'}
        onPress={onNext}
        containerStyle={styles.customStyleButton}
      />
    </View>
  );
};

export {StepRoomDetail};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  titleHeading: {
    ...fontFamily.fontCampWeight600,
    lineHeight: SIZE.big_size * 1.3,
    fontSize: SIZE.big_size,
    color: colors.primary,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding - SIZE.base_space,
    marginTop: SIZE.padding,
  },
  optional: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
  },
  customStyleButton: {
    paddingTop: SIZE.base_space,
    paddingBottom: SIZE.medium_space,
  },
  customContainerPicker: {
    marginTop: SIZE.base_size,
    maxWidth: scaleWidth(106),
    marginBottom: SIZE.medium_space,
  },
});
