import { AppButton, AppInput, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

interface VerifyCodeProp {
  navigation: any,
  route: any;
}
interface screenNavigationProp {
  navigate: any;
  route: any;
}

const VerifyCode = (props: VerifyCodeProp) => {
  const PHONE = props.route.params.phone.toString().slice(1)
  const COUNTRY_CODE = props.route.params.coutryCode
  console.log('hi', PHONE);
  const navigation = useNavigation<screenNavigationProp>();
  const [timerCount, setTimer] = useState(25)

  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval)
        return lastTimerCount - 1
      })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval)
  }, []);

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.message}>{'Enter your code'}</AppText>
        <View style={{ marginBottom: 50 }}>
          <CodeField
            ref={ref}
            {...prop}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => (
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
        <AppText style={styles.miniTxt}>
          {`We've send a code to +${COUNTRY_CODE} ${PHONE} . You can send another code in ${timerCount} seconds. `}
        </AppText>

        {(timerCount <= 0 ?
          <AppButton title={'Resend'} size={'small'} />
          : null
        )}


        <AppButton title={'Verify'} size={'small'} />
      </View>
    </View>
  );
};

export { VerifyCode };
