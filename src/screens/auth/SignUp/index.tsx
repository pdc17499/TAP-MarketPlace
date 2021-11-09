import { iconFacebook, iconGoogle } from '@assets';
import { AppButton, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { SIGNUP_EMAIL } from '@routeName';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';

interface SignUpProp { }

interface screenNavigationProp {
  navigate: any;
}

const SignUp = (props: SignUpProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();

  const moveToSignUpWithEmail = () => {
    navigation.navigate(SIGNUP_EMAIL)
  }

  return (
    <View style={styles.container} >
      <Header back />
      <View style={styles.body}>

        <AppText
          style={styles.title}>
          {'Sign up'}
        </AppText>

        <AppText
          style={styles.description}>
          {'Create an account to find the best room for your self'}
        </AppText>

        <AppButton
          title={'Sign up with google'}
          typeButton={'linear'}
          image={iconGoogle}
          size={'small'}
          imageStyle={styles.imageGoogle}
          customStyleButton={styles.googleButton}
          customStyleTitle={styles.googleTxt}
        />

        <AppButton
          title={'Sign up with facebook'}
          typeButton={'linear'}
          image={iconFacebook}
          size={'small'}
          imageStyle={styles.imageFacebook}
          customStyleButton={styles.facebookButton}
          customStyleTitle={styles.facebookTxt}
        />

        <View style={styles.or}>
          <View style={styles.line} />
          <AppText style={styles.orTxt}>{'or'}</AppText>
          <View style={styles.line} />
        </View>

        <AppButton
          title={'Sign up with email '}
          typeButton={'linear'}
          size={'small'}
          customStyleTitle={styles.emailTxt}
          iconRight={'arrowBlack'}
          onPress={moveToSignUpWithEmail}
        />
      </View>

    </View>
  );
};

export { SignUp };
