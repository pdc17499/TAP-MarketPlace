import {AppSwiper} from '@component';
import {RefAppSwiper} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import React, {MutableRefObject, useRef} from 'react';
import {View} from 'react-native';
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
  const refSwiper = useRef() as MutableRefObject<RefAppSwiper>;
  const onNext = () => {
    refSwiper.current.onNextButton();
  };

  return (
    <View style={styles.container}>
      <AppSwiper ref={refSwiper} showPagination={false}>
        <YourPlace onNext={onNext} />
        <Pets onNext={onNext} />
        <Smoking onNext={onNext} />
        <DietChoice onNext={onNext} />
      </AppSwiper>
    </View>
  );
};

export {LifeStyleStep};
