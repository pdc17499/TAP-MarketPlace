import {AppButton, AppInput, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch} from 'react-redux';
import {forgotPassword, verifyCodeForgotPassword} from '@redux';
import {PROFILE} from '@routeName';
import {NavigationUtils} from '@navigation';

interface VerifyCodeProp {
  navigation: any;
  route: any;
}
interface screenNavigationProp {
  navigate: any;
  route: any;
}

const VerifyCode = ({navigation, route}: VerifyCodeProp) => {
  let PHONE = '';
  let COUNTRY_CODE = '';
  let email = '';
  const isForgetPassword = route.params?.isForgetPassword;
  if (isForgetPassword) {
    email = route.params?.email;
  } else {
    PHONE = route.params?.phone.toString().slice(1);
    COUNTRY_CODE = route.params?.countryCode;
  }
  console.log('hi', PHONE, route.params);
  const [timerCount, setTimer] = useState(25);
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  const interval = useRef<any>();
  // const

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 0 && clearInterval(interval.current);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  const resetInterval = () => {
    setTimer(25);
    interval.current = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 0 && clearInterval(interval.current);
        return lastTimerCount - 1;
      });
    }, 1000);
  };

  const codeTo = isForgetPassword ? email : `+${COUNTRY_CODE} ${PHONE}`;
  const onVerfiyCode = () => {
    if (isForgetPassword) {
      dispatch(verifyCodeForgotPassword({email, code: parseInt(value)}));
    }

    NavigationUtils.reset(PROFILE);
  };

  const onResend = () => {
    setValue('');
    resetInterval();
    if (isForgetPassword) {
      dispatch(forgotPassword({email}));
    }
  };

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.message}>{'Enter your code'}</AppText>
        <View style={{marginBottom: 50}}>
          <CodeField
            ref={ref}
            {...prop}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>

        {timerCount >= 1 ? (
          <AppText style={styles.miniTxt}>
            {`We've send a code to ${codeTo}. You can send another code in ${timerCount} seconds. `}
          </AppText>
        ) : (
          <AppText style={styles.miniTxt}>
            {`We've send a code to ${codeTo}. You can send another code in 0 second. `}
          </AppText>
        )}

        {timerCount <= 0 ? (
          <AppButton onPress={onResend} title={'Resend'} size={'small'} />
        ) : null}
        <AppButton title={'Verify'} size={'small'} onPress={onVerfiyCode} />
      </View>
    </View>
  );
};

export {VerifyCode};
