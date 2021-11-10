import {AppButton, AppSwiper, AppText, Header} from '@component';
import {RoomUnitHOwnerProps, mockProps, RefAppSwiper} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {colors, scaleWidth, SIZE} from '@util';
import moment from 'moment';
import React, {MutableRefObject, useRef, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {StepFinal} from './step/StepFinal';
import {StepFirst} from './step/StepFirst';
import {StepLeasePeriod} from './step/StepLeasePeriod';
import {StepPrice} from './step/StepPrice';
import {StepRoomDetail} from './step/StepRoomDetail';
import {StepSecond} from './step/StepSecond';
import {styles} from './style';

interface screenNavigationProp {
  navigate: any;
}

const initStateRoom: RoomUnitHOwnerProps = {
  location: {
    lat: -1,
    long: -1,
    title: '',
  },
  kind_place: {},
  rental_price: {},
  fixed_price: '',
  min_range: 4000,
  max_range: 25000,
  lease_your_place: {},
  staying_with_guests: {},
  room_type: {},
  floor_size: 0,
  bathroom: {},
  room_furnishing: {},
  floor_level: {},
  allow_cooking: {},
  built_year: moment().format('YYYY').toString(),
  key_your_place: [],
};

const RoomUnitHomeowner = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();
  const [room, setRoom] = useState(initStateRoom);
  const refSwiper = useRef() as MutableRefObject<RefAppSwiper>;

  const onNext = () => {
    refSwiper.current.onNextButton();
  };

  const onChangeValue = (nRoom: any) => {
    // if (name) {
    //   const nRoom: any = {...room};
    //   nRoom[name] = item;
    //   setRoom(nRoom);
    // }
    setRoom(nRoom);
  };

  return (
    <View style={styles.container}>
      <AppSwiper ref={refSwiper}>
        <StepRoomDetail
          onNext={onNext}
          room={room}
          onChangeValue={onChangeValue}
          setRoom={setRoom}
        />
        <StepFinal onNext={onNext} room={room} setRoom={setRoom} />
        <StepLeasePeriod onNext={onNext} room={room} setRoom={setRoom} />
        <StepFirst onNext={onNext} property={room} />
        <StepSecond onNext={onNext} room={room} />
        <StepPrice
          onNext={onNext}
          room={room}
          onChangeValue={onChangeValue}
          setRoom={setRoom}
        />
      </AppSwiper>
    </View>
  );
};

export {RoomUnitHomeowner};
