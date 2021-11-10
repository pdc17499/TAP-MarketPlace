import {IconQuestion} from '@assets';
import {AppButton, AppText, Header, AppPhoneNumber} from '@component';
import {useNavigation} from '@react-navigation/core';
import {VERIFY_CODE} from '@routeName';
import {scaleWidth} from '@util';
import React, {useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {VerifyAccountProps} from '@interfaces';

interface screenNavigationProp {
  navigate: any;
}

const VerifyAccount = (props: VerifyAccountProps) => {
  const navigation = useNavigation<screenNavigationProp>();
  const [isShowRules, setIsShowRules] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const showRules = () => {
    setIsShowRules(!isShowRules);
  };
  const moveToVerifyCode = () => {
    phoneNumber !== ''
      ? navigation.navigate(VERIFY_CODE)
      : Alert.alert('Please enter your phone number!');
  };
  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Sign up'}</AppText>
        <AppText style={styles.message}>{'Verify Account'}</AppText>
        <AppText style={styles.yourPhoneTxt}>{'Your Phone Number'}</AppText>

        <AppPhoneNumber
          onChangeFlag={setCountryCode}
          onChangePhone={setPhoneNumber}
        />
        <AppText style={styles.sendCodeTxt}>
          {"We'll send a text with a verification code to create your account."}
        </AppText>

        <TouchableOpacity style={styles.question} onPress={showRules}>
          <IconQuestion />
          <AppText style={styles.questionTxt}>
            {'How TAP use my phone number?'}
          </AppText>
        </TouchableOpacity>

        <View style={{height: scaleWidth(170)}}>
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

        <AppButton
          title={'Submit '}
          size={'small'}
          onPress={moveToVerifyCode}
        />
        <View style={styles.skip}>
          <AppText style={styles.skipTxt}>{'Skip for now'}</AppText>
        </View>
      </View>
    </View>
  );
};

export {VerifyAccount};
