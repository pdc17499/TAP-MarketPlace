import { IconQuestion } from '@assets';
import { AppButton, AppInput, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface VerifyCodeProp { }

interface screenNavigationProp {
  navigate: any;
  route: any
}

const VerifyCode = (props: VerifyCodeProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  console.log('phone', navigation);

  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.container} >
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
        <AppText style={styles.miniTxt}>{"We've send a code to . You can send another code in 25 seconds. "}</AppText>




        <AppButton title={"Verify"} size={'small'} />




      </View>

    </View>
  );
};

export { VerifyCode };
