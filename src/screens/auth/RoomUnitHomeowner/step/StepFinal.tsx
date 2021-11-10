import {AppButton, AppQA} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface screenNavigationProp {
  navigate: any;
}

const StepFinal = (props: RoomStepProps) => {
  const {onNext, room, onChangeValue, setRoom} = props;

  const data = ROOM_UNIT_HOWNER;

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <AppQA
          data={data.utilities}
          title={'Let your guests know what your place has to offer'}
          subTitle={'Select some keywords that describe your place'}
          value={room}
          setValue={setRoom}
          typeList={'row'}
          isMultiChoice
          name={'key_your_place'}
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

export {StepFinal};

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
    marginBottom: SIZE.padding,
    marginTop: SIZE.padding,
    maxWidth: scaleWidth(240),
  },
  customStyleButton: {
    paddingTop: SIZE.base_space,
    paddingBottom: SIZE.medium_space,
  },
});
