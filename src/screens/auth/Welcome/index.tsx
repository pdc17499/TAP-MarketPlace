import {background, CaretRight, logo} from '@assets';
import {AppButton, AppText} from '@component';
import {useNavigation} from '@react-navigation/core';
import {CHOOSE_ROLE, SIGNIN} from '@routeName';
import {colors, fontFamily, scaleWidth} from '@util';
import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';

interface WelcomeProp {}

interface screenNavigationProp {
  navigate: any;
}

const Welcome = React.memo((props: WelcomeProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  // const dispath = useDispatch();

  const moveToSignIn = () => {
    navigation.navigate(SIGNIN);
  };

  const moveToChooseRoles = () => {
    navigation.navigate(CHOOSE_ROLE);
  };

  return (
    <View style={styles.container}>
      <View>
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
        <AppButton
          title={'Explore'}
          onPress={moveToChooseRoles}
          size={'small'}
          iconRight={'right'}
          customStyleButton={{width: scaleWidth(152), alignSelf: 'center'}}
        />
      </View>
    </View>
  );
});

export {Welcome};
