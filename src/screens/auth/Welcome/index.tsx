import {background, CaretRight, logo} from '@assets';
import {AppButton, AppText} from '@component';
import {useNavigation} from '@react-navigation/core';
import {SIGNIN} from '@routeName';
import {colors, fontFamily, scaleWidth} from '@util';
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';

interface WelcomeProp {}

interface screenNavigationProp {
  navigate: any;
}

const Welcome = React.memo((props: WelcomeProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();
  const moveToSignIn = () => {
    navigation.navigate(SIGNIN);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <AppText style={styles.title}>{'Welcome to TAP'}</AppText>
      <AppText style={styles.miniTitle}>{'by The Assembly Place'}</AppText>
      <Image source={background} style={styles.imageBackground} />
      <View style={styles.signInTxt}>
        <TouchableOpacity onPress={() => moveToSignIn()}>
          <AppText style={{...fontFamily.fontWeight600}}>{'Sign in'}</AppText>
        </TouchableOpacity>
        <AppText style={{color: colors.secondPrimary}}>
          {' and join out marketplace now'}
        </AppText>
      </View>
      <View>
        <AppButton
          title={'Explore'}
          size={'small'}
          iconRight={'right'}
          customStyleButton={{width: scaleWidth(152)}}
        />
      </View>
    </View>
  );
});

export {Welcome};
