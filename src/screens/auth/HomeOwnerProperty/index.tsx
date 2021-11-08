import {list_place, rent_place} from '@assets';
import {AppButton, AppSwiper, AppText, Header} from '@component';
import {homePropertyProps, mockProps, RefAppSwiper} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {colors, scaleWidth, SIZE} from '@util';
import moment from 'moment';
import React, {MutableRefObject, useRef, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {string} from 'yup/lib/locale';
import {StepFinal} from './step/StepFinal';
import {StepFirst} from './step/StepFirst';
import {StepPlace} from './step/StepPlace';
import {StepPrice} from './step/StepPrice';
import {StepRoomDetail} from './step/StepRoomDetail';
import {styles} from './style';

interface screenNavigationProp {
  navigate: any;
}

const initProperty: homePropertyProps = {
  location: {
    lat: -1,
    long: -1,
    title: '',
  },
  kind_place: {},
  rental_price: {},
  fixed_price: '',
  range_price: {
    min: 10,
    max: 1000,
  },
  lease_your_place: {},
  staying_with_guests: false,
  room_type: {},
  floor_size: 0,
  bathroom: {},
  room_furnishing: {},
  floor_level: {},
  built_year: moment().format('YYYY').toString(),
  key_your_place: [],
};

const HomeOwnerProperty = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();
  const [property, setProperty] = useState(initProperty);
  const refSwiper = useRef() as MutableRefObject<RefAppSwiper>;

  const onNext = () => {
    refSwiper.current.onNextButton();
  };

  return (
    <View style={styles.container}>
      <AppSwiper ref={refSwiper}>
        <StepFirst onNext={onNext} property={property} />
        <StepPrice
          onNext={onNext}
          property={property}
          setProperty={setProperty}
        />
        <StepPrice
          onNext={onNext}
          property={property}
          setProperty={setProperty}
        />
        <StepPrice
          onNext={onNext}
          property={property}
          setProperty={setProperty}
        />
        {/* <StepPrice onNext={onNext} />
        <StepPlace onNext={onNext} />
        <StepRoomDetail onNext={onNext} />
        <StepFinal onNext={onNext} /> */}
      </AppSwiper>
    </View>
  );
};

export {HomeOwnerProperty};
