import {iconFacebook, iconGoogle} from '@assets';
import {AppButton, AppText, Header} from '@component';
import {DataSignupProps} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {SIGNUP_EMAIL} from '@routeName';
import {colors} from '@util';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './style';

interface SignUpProp {}

interface screenNavigationProp {
  navigate: any;
}

const SignUp = (props: SignUpProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );

  const moveToSignUpWithEmail = () => {
    navigation.navigate(SIGNUP_EMAIL);
  };
  const isTenant = dataSignUp?.role_user === 'Tenant';
  // const title = isTenant ? ""

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{"Let's create an account"}</AppText>

        {isTenant ? (
          <AppText style={styles.description}>
            {'Finally, sign up and see amazing places we found for '}
            <AppText style={[styles.description, {color: colors.primary}]}>
              {'you!'}
            </AppText>
          </AppText>
        ) : (
          <AppText style={styles.description}>
            {'Finally, sign up and meet your potential guests'}
          </AppText>
        )}

        <AppButton
          title={'Sign up with Google'}
          typeButton={'linear'}
          image={iconGoogle}
          size={'small'}
          imageStyle={styles.imageGoogle}
          customStyleButton={styles.googleButton}
          customStyleTitle={styles.googleTxt}
        />

        <AppButton
          title={'Sign up with Facebook'}
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
          iconRight={'arNextBlack'}
          onPress={moveToSignUpWithEmail}
        />
      </View>
    </View>
  );
};

export {SignUp};
