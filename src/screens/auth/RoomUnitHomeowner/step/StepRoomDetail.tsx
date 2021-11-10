import {AppButton, AppPicker, AppQA, AppText} from '@component';
import {mockProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {colors, fontFamily, scaleWidth, SIZE, YEARS} from '@util';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const StepRoomDetail = (props: RoomStepProps) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };
  const onChangeText = (item: mockProps, name?: string) => {
    if (name) {
      const nData: any = {...dataSignUp};
      nData[name] = item;
      setData(nData);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <AppText style={styles.titleHeading}>{'Room details'}</AppText>
        <AppQA
          data={list.room_furnishing}
          title={'Room furnishing'}
          value={dataSignUp}
          setValue={setData}
          typeList={'column'}
          name={'room_furnishing'}
        />
        <AppQA
          data={list.floor_level}
          title={'Floor level'}
          value={dataSignUp}
          setValue={setData}
          typeList={'wrap'}
          name={'floor_level'}
        />
        <AppQA
          data={list.allow_cooking}
          title={'Allow cooking?'}
          value={dataSignUp}
          setValue={setData}
          typeList={'even'}
          name={'allow_cooking'}
        />
        <AppText style={styles.title}>
          {'Built year'}
          <AppText style={styles.optional}>{' (optional)'}</AppText>
        </AppText>
        <AppPicker
          value={dataSignUp?.built_year}
          name={'built_year'}
          onValueChange={onChangeText}
          items={YEARS()}
          style={styles.customContainerPicker}
        />
      </ScrollView>
      <AppButton
        title={'Continue'}
        onPress={onNext}
        containerStyle={styles.customStyleButton}
        iconRight={'arNext'}
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
