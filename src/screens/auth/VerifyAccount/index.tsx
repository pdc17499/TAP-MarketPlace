import {IconQuestion} from '@assets';
import {AppButton, AppText, Header, AppPhoneNumber} from '@component';
import {useNavigation} from '@react-navigation/core';
import {PROFILE, TABBAR} from '@routeName';
import {SIZE} from '@util';
import React, {useState} from 'react';
import {Alert, Pressable, View} from 'react-native';
import {styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {verifyPhonenumber} from '@redux';

interface VerifyCodeProp {
  navigation: any;
  route: any;
}

const VerifyAccount = (props: VerifyCodeProp) => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const [isShowRules, setIsShowRules] = useState(false);
  const [contact, setContact] = useState('');
  const user = useSelector((state: any) => state?.auth?.user);
  const [error, setError] = useState('');

  console.log({user});

  const showRules = () => {
    setIsShowRules(!isShowRules);
  };

  const moveToVerifyCode = () => {
    if (contact !== '') {
      const index = contact.indexOf(' ');
      if (index === -1) {
        setError('Code number is required');
      } else {
        const nPhone = contact.substring(index + 1, contact.length);
        if (nPhone === '') {
          setError('Phone number is required');
        } else {
          setError('');
          dispatch(
            verifyPhonenumber({
              email: user?.email,
              contact: contact,
            }),
          );
        }
      }
    } else {
      Alert.alert('Please enter your phone number!');
    }
  };

  const onSkip = () => {
    navigation.replace(TABBAR);
  };

  const onChangeContact = (nContact: string) => {
    setContact(nContact);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Sign up'}</AppText>
        <AppText style={styles.message}>{'Verify Account'}</AppText>
        <AppText style={styles.yourPhoneTxt}>{'Your Phone Number'}</AppText>

        <AppPhoneNumber
          value={contact}
          onChangePhone={onChangeContact}
          maxLength={30}
          name={'contact'}
          error={error}
        />

        <AppText style={styles.sendCodeTxt}>
          {"We'll send a text with a verification code to create your account."}
        </AppText>

        <Pressable style={styles.question} onPress={showRules}>
          <IconQuestion />
          <AppText style={styles.questionTxt}>
            {'How TAP use my phone number?'}
          </AppText>
        </Pressable>

        <View>
          {isShowRules ? (
            <View>
              <AppText style={styles.miniTxt}>
                {
                  'Verifying your account brings trust and security to our community.'
                }
              </AppText>
              <AppText style={styles.miniTxt}>
                {
                  'We will not call or share your number with other unless with your consent.'
                }
              </AppText>
            </View>
          ) : null}
        </View>
      </View>
      <View
        style={{paddingHorizontal: SIZE.padding, paddingBottom: SIZE.padding}}>
        <AppButton
          title={'Submit '}
          size={'small'}
          onPress={moveToVerifyCode}
        />
        <AppButton
          onPress={onSkip}
          title={'Skip for now'}
          typeButton={'link'}
          customStyleTitle={styles.skipTxt}
        />
      </View>
    </View>
  );
};

export {VerifyAccount};
