import {AppButton, AppPicker, AppQA, AppSlider, AppText} from '@component';
import {mockProps, RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {colors, fontFamily, scaleWidth, SIZE, SLIDER, YEARS} from '@util';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

const StepRoomDetailFirst = (props: RoomStepProps) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const onValuesChangeFinish = (values: any) => {
    const nData: any = {...dataSignUp};
    nData['floor_size_min'] = values[0];
    nData['floor_size_max'] = values[1];
    setData(nData);
  };

  console.log(111, _.isEmpty(dataSignUp.room_type));

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <AppText style={styles.titleHeading}>{'Room details'}</AppText>
        <AppQA
          data={list.room_type}
          title={'Room type'}
          value={dataSignUp}
          setValue={setData}
          typeList={'even'}
          name={'room_type'}
        />
        {!_.isEmpty(dataSignUp.room_type) && (
          <>
            {dataSignUp?.room_type?.id == 1 ? (
              <>
                <AppQA
                  data={list.bedroom_number}
                  title={'Bedroom number'}
                  value={dataSignUp}
                  setValue={setData}
                  typeList={'row'}
                  name={'bedroom_number'}
                />
                <AppQA
                  data={list.bathroom_number}
                  title={'Bathroom number'}
                  value={dataSignUp}
                  setValue={setData}
                  typeList={'row'}
                  name={'bathroom_number'}
                />
              </>
            ) : (
              <AppQA
                data={list.attached_bathroom}
                title={'Attached bathroom'}
                value={dataSignUp}
                setValue={setData}
                typeList={'even'}
                name={'attached_bathroom'}
              />
            )}

            <AppText style={styles.title}>
              {'Floor size'}
              <AppText style={styles.optional}>{' (optional)'}</AppText>
            </AppText>
            <AppSlider
              onValuesChangeFinish={onValuesChangeFinish}
              min_range_value={dataSignUp?.floor_size_min}
              max_range_value={dataSignUp?.floor_size_max}
              min_range={SLIDER.MIN_FLOOR_SIZE}
              max_range={SLIDER.MAX_FLOOR_SIZE}
            />
          </>
        )}
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

export {StepRoomDetailFirst};

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
    marginTop: SIZE.padding,
  },
  optional: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
  },
  customStyleButton: {
    paddingTop: SIZE.base_space,
    paddingBottom: SIZE.medium_space,
    marginHorizontal: SIZE.padding,
  },
  customContainerPicker: {
    marginTop: SIZE.base_size,
    maxWidth: scaleWidth(106),
    marginBottom: SIZE.medium_space,
  },
});
