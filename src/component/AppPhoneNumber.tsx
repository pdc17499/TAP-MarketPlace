import CountryPicker from 'react-native-country-picker-modal';
import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppInput, AppText} from '@component';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import {DownIcon, IconShieldCheck} from '@assets';
interface IAppPhoneNumber {
  label?: string;
  value?: string;
  onChangePhone: (text: string, name?: string) => void;
  onChangeFlag: (text: string) => void;
  error?: string;
  type?: 'default' | 'inline';
  name?: string;
}

export const AppPhoneNumber = React.memo((props: IAppPhoneNumber) => {
  const {label, value, onChangePhone, onChangeFlag, error, type} = props;
  const [countryCode, setCountryCode]: any = useState('SG');
  const [visible, setVisible] = useState(false);
  const [isInLine, setIsInLine] = useState(false);

  useEffect(() => {
    onChangeFlag('65');
    if (type === 'inline') setIsInLine(true);
  }, []);

  const onSelectFlag = (country: any) => {
    setCountryCode(country?.cca2);
    onChangeFlag(country?.callingCode[0] || '65');
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <>
      {isInLine ? (
        <Pressable style={styles.inlineType} onPress={() => setIsInLine(false)}>
          <AppText>{'N/A'}</AppText>
        </Pressable>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.code} onPress={showModal}>
            <CountryPicker
              theme={{
                fontSize: SIZE.base_size,
                ...fontFamily.fontWeight400,
              }}
              visible={visible}
              withCallingCode={false}
              withCallingCodeButton={true}
              countryCode={countryCode || 'SG'}
              withFlagButton={false}
              onSelect={onSelectFlag}
              withFilter={true}
            />
            <DownIcon />
          </TouchableOpacity>
          <View style={styles.input}>
            <AppInput
              typeInput={'phone'}
              delimiter={' - '}
              label={label}
              style={styles.inputPhone}
              keyboardType="number-pad"
              value={value}
              onValueChange={onChangePhone}
            />
          </View>
        </View>
      )}

      {!!error && <AppText style={styles.error}>{error}</AppText>}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: SIZE.input_height,
    marginTop: SIZE.base_space,
    justifyContent: 'space-between',
  },
  inputPhone: {
    marginTop: 0,
  },
  input: {
    flex: 1,
    marginLeft: SIZE.base_space,
  },
  code: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scaleWidth(86),
    justifyContent: 'space-between',
    backgroundColor: colors.bgInput,
    borderRadius: 8,
    paddingHorizontal: 13,
  },
  error: {
    marginTop: 4,
    color: colors.red,
  },
  inlineType: {
    flexDirection: 'row',
    marginTop: SIZE.base_space,
  },
});
