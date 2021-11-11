import {AppSwiper} from '@component';
import {RefAppSwiper} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import React, {MutableRefObject, useRef} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DietChoice} from './step/DietChoices';
import {Pets} from './step/Pets';
import {Smoking} from './step/Smoking';
import {YourPlace} from './step/YourPlace';
import {styles} from './style';

interface screenNavigationProp {
  navigate: any;
}

const LifeStyleStep = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const refSwiper = useRef() as MutableRefObject<RefAppSwiper>;
  const yourPlaceRef = useRef<any>();
  const petsRef = useRef<any>();
  const smokingRef = useRef<any>();
  const dietRef = useRef<any>();
  const onNext = () => {
    refSwiper.current.onNextButton();
  };

  const onSkip = (index: number) => {
    if (index === 0) {
      yourPlaceRef.current.onSkip();
    } else if (index === 1) {
      petsRef.current.onSkip();
    } else if (index === 2) {
      smokingRef.current.onSkip();
    } else if (index === 3) {
      dietRef.current.onSkip();
    }
  };

  return (
    <View style={styles.container}>
      <AppSwiper ref={refSwiper} showPagination={'center-top'} onSkip={onSkip}>
        <YourPlace onNext={onNext} ref={yourPlaceRef} />
        <Pets onNext={onNext} ref={petsRef} />
        <Smoking onNext={onNext} ref={smokingRef} />
        <DietChoice onNext={onNext} ref={dietRef} />
      </AppSwiper>
    </View>
  );
};

export {LifeStyleStep};
