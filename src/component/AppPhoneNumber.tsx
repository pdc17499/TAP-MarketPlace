import CountryPicker from 'react-native-country-picker-modal';
import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppInput, AppText} from '@component';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import {DownIcon} from '@assets';

interface IAppPhoneNumber {
  label?: string;
  value?: string;
  onChangePhone: (text: string) => void;
  onChangeFlag: (text: string) => void;
  error?: string;
}

export const AppPhoneNumber = React.memo((props: IAppPhoneNumber) => {
  const {label, value, onChangePhone, onChangeFlag, error} = props;
  const [countryCode, setCountryCode]: any = useState('AU');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    onChangeFlag('61');
  }, []);

  const onSelectFlag = (country: any) => {
    setCountryCode(country?.cca2);
    onChangeFlag(country?.callingCode[0] || '61');
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.code} onPress={showModal}>
          <CountryPicker
            theme={{
              fontSize: SIZE.base_size,
              ...fontFamily.fontWeight400,
            }}
            visible={visible}
            withCallingCode={true}
            withCallingCodeButton={true}
            countryCode={countryCode || 'AU'}
            withFlagButton={false}
            onSelect={onSelectFlag}
            withFilter={true}
          />
          <DownIcon style={{top: 2}} />
        </TouchableOpacity>
        <View style={styles.input}>
          <AppInput
            label={label}
            style={styles.inputPhone}
            keyboardType="number-pad"
            value={value}
            onValueChange={onChangePhone}
          />
        </View>
      </View>
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
  },
  error: {
    marginTop: 4,
    color: colors.red,
  },
});
