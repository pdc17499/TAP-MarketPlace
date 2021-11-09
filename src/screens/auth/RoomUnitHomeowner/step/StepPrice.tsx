import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppButton, AppInput, AppQA, AppSlider} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {fontFamily, scaleWidth, SIZE} from '@util';
import {ScrollView} from 'react-native-gesture-handler';

interface screenNavigationProp {
  navigate: any;
}

const StepPrice = (props: RoomStepProps) => {
  const navigation = useNavigation<screenNavigationProp>();
  const {onNext, room, onChangeValue, setRoom} = props;

  const onValuesChangeFinish = (values: any) => {
    const nRoom: any = {...room};
    nRoom['min_range'] = values[0];
    nRoom['max_range'] = values[1];
    if (setRoom) setRoom(nRoom);
  };

  const data = ROOM_UNIT_HOWNER;

  const renderFixedPrice = () => {
    return (
      <AppInput
        value={room.fixed_price}
        name={'fixed_price'}
        iconLeft={'dolar'}
        onValueChange={onChangeValue}
        keyboardType={'number-pad'}
        containerStyle={{marginBottom: SIZE.medium_space}}
        autoFocus
      />
    );
  };

  console.log({room});

  const renderPriceRange = () => {
    return (
      <AppSlider
        onValuesChangeFinish={onValuesChangeFinish}
        min_range={room.min_range}
        max_range={room.max_range}
      />
    );
  };

  const renderChildren = () => {
    if (room.rental_price?.id === 2) {
      return renderFixedPrice();
    } else if (room.rental_price?.id === 3) {
      return renderPriceRange();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <AppQA
          isFlex
          data={data.rentalPrice}
          title={'What is your rental price?'}
          value={room}
          name={'rental_price'}
          setValue={setRoom}
          typeList={'column'}
          children={renderChildren()}
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

export {StepPrice};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
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
