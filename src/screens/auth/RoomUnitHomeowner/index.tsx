import {AppSwiper} from '@component';
import {RefAppSwiper} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import React, {MutableRefObject, useRef} from 'react';
import {View} from 'react-native';
import {StepPlaceOffer} from './step/StepPlaceOffer';
import {StepFirst} from './step/StepFirst';
import {StepLeasePeriod} from './step/StepLeasePeriod';
import {StepPrice} from './step/StepPrice';
import {StepRoomDetail} from './step/StepRoomDetail';
import {StepRoomDetailFirst} from './step/StepRoomDetailFirst';
import {StepSecond} from './step/StepSecond';
import {styles} from './style';

interface screenNavigationProp {
  navigate: any;
}

const RoomUnitHomeowner = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const refSwiper = useRef() as MutableRefObject<RefAppSwiper>;
  const onNext = () => {
    refSwiper.current.onNextButton();
  };

  return (
    <View style={styles.container}>
      <AppSwiper ref={refSwiper} showPagination={false}>
        <StepFirst onNext={onNext} />
        <StepSecond onNext={onNext} />
        <StepPrice onNext={onNext} />
        <StepLeasePeriod onNext={onNext} />
        <StepRoomDetailFirst onNext={onNext} />
        <StepRoomDetail onNext={onNext} />
        <StepPlaceOffer onNext={onNext} />
      </AppSwiper>
    </View>
  );
};

export {RoomUnitHomeowner};
