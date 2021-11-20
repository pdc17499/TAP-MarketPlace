import {IconQuestion} from '@assets';
import {AppButton, AppText, Header, AppPhoneNumber, AppInput} from '@component';
import {useNavigation} from '@react-navigation/core';
import {PROFILE, VERIFY_CODE} from '@routeName';
import {scaleWidth, SIZE} from '@util';
import React, {useState} from 'react';
import {Alert, Pressable, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {DataSignupProps, VerifyAccountProps} from '@interfaces';
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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const showRules = () => {
    setIsShowRules(!isShowRules);
  };
  // const email = props.route?.params?.email;
  const user = useSelector((state: any) => state?.auth?.user);

  console.log({user});

  const moveToVerifyCode = () => {
    if (phoneNumber !== '') {
      const contact = `+${countryCode} ${phoneNumber
        .toString()
        .replace(/[^a-zA-Z0-9]/g, '')}`;
      console.log({contact});
      dispatch(
        verifyPhonenumber({
          email: user?.email,
          contact,
        }),
      );
    } else {
      Alert.alert('Please enter your phone number!');
    }
  };

  const onSkip = () => {
    navigation.replace(PROFILE);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Sign up'}</AppText>
        <AppText style={styles.message}>{'Verify Account'}</AppText>
        <AppText style={styles.yourPhoneTxt}>{'Your Phone Number'}</AppText>

        <AppPhoneNumber
          value={phoneNumber}
          onChangeFlag={setCountryCode}
          onChangePhone={setPhoneNumber}
          maxLength={30}
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
          // onPress={moveToVerifyCode}
        />
      </View>
    </View>
  );
};

export {VerifyAccount};
