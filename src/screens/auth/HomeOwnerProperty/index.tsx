import {list_place, rent_place} from '@assets';
import {AppButton, AppSwiper, AppText, Header} from '@component';
import {RefAppSwiper} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {colors, scaleWidth, SIZE} from '@util';
import React, {MutableRefObject, useRef, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {StepFirst} from './step/StepFirst';
import {StepPrice} from './step/StepPrice';
import {styles} from './style';

interface screenNavigationProp {
  navigate: any;
}

const propertyProps = {

}

const HomeOwnerProperty = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();
  const [property, setProperty] = useState(null);
  const refSwiper = useRef() as MutableRefObject<RefAppSwiper>;

  const onNext = () => {
    refSwiper.current.onNextButton();
  };

  return (
    <View style={styles.container}>
      <AppSwiper ref={refSwiper}>
        <StepFirst onNext={onNext} />
        <StepPrice onNext={onNext} />
        <AppText>{'Hello 5678'}</AppText>
      </AppSwiper>
    </View>
  );
};

export {HomeOwnerProperty};
