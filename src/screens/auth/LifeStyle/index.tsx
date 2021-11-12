import {AppButton, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {LIFE_STYLE_STEP, SIGNUP} from '@routeName';

interface screenNavigationProp {
  navigate: any;
}

const LifeStyle = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();

  const onStart = () => {
    navigation.navigate(LIFE_STYLE_STEP);
  };

  const onSkip = () => {
    navigation.navigate(SIGNUP);
  };

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'About you'}</AppText>
        <AppText style={styles.message}>{'Lifestyle & Preferences'}</AppText>
        <AppText style={styles.subTitle}>
          {
            'Since you’ll be living with your guests, this section will help us to find your best housemates'
          }
        </AppText>
      </View>
      <View style={styles.containerBottom}>
        <AppText style={styles.textBottom}>
          {'*You can change your answer anytime later in your profile setting'}
        </AppText>
        <AppButton
          customStyleButton={styles.button}
          title={'Start'}
          size={'small'}
          iconRight={'arNext'}
          onPress={onStart}
        />
        <AppButton title={'Skip'} typeButton={'underline'} onPress={onSkip} />
      </View>
    </View>
  );
};

export {LifeStyle};
