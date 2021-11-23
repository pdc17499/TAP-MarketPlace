import CountryPicker from 'react-native-country-picker-modal';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppInput, AppModalCountry, AppText} from '@component';
import {colors, fontFamily, scaleSize, scaleWidth, SIZE} from '@util';
import {CaretRight, DownIcon, IconShieldCheck} from '@assets';
import {useNavigation} from '@react-navigation/core';
import {VERIFY_ACCOUNT, VERIFY_CODE} from '@routeName';
import {useDispatch, useSelector} from 'react-redux';
import {verifyPhonenumber} from '@redux';
import {UserInfo} from '@interfaces';
interface IAppPhoneNumber {
  label?: string;
  value?: string;
  onChangePhone: (text: string, name?: string) => void;
  onChangeFlag: (text: string) => void;
  error?: string;
  type?: 'default' | 'inline';
  name?: string;
  maxLength?: number;
  showVerifyNumber?: boolean;
}

export const AppPhoneNumber = React.memo((props: IAppPhoneNumber) => {
  const {
    label,
    value,
    onChangePhone,
    onChangeFlag,
    error,
    type,
    maxLength,
    name,
    showVerifyNumber,
  } = props;
  const [countryCode, setCountryCode]: any = useState('SG');
  const [visible, setVisible] = useState(false);
  const [isInLine, setIsInLine] = useState(false);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    onChangeFlag('65');
    if (type === 'inline') setIsInLine(false);
  }, []);

  const onSelectFlag = (country: any) => {
    setCountryCode(country?.cca2);
    onChangeFlag(country?.callingCode[0] || '65');
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  console.log({value});

  // const callBackOnFocus = (focus: boolean) => {
  //   if (type === 'inline') {
  //     setIsInLine(focus);
  //   }
  // };

  const onChangeValue = () => {};

  const onNavigateVerify = () => {
    if (value && value !== '') {
      const contact = `+${countryCode} ${value
        .toString()
        .replace(/[^a-zA-Z0-9]/g, '')}`;
      console.log({contact});
      dispatch(
        verifyPhonenumber({
          email: dataUser?.email,
          contact,
        }),
      );
      navigation.navigate(VERIFY_CODE, {contact});
    } else {
      Alert.alert('Please enter your phone number!');
    }
  };

  return (
    <>
      {!isInLine ? (
        <Pressable style={styles.inlineType} onPress={() => setIsInLine(true)}>
          <AppText style={{...fontFamily.fontWeight500}}>
            {value || 'N/A'}
          </AppText>
        </Pressable>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.code} onPress={showModal}>
            {/* <CountryPicker
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
            /> */}
            <AppModalCountry
              name={'nationality'}
              label={'Country'}
              // value={''}
              onValueChange={onChangeValue}
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
              onValueChange={text => onChangePhone(text, name)}
              maxLength={maxLength}
              inputStyle={{fontSize: SIZE.base_size + 1}}
              // callBackOnFocus={callBackOnFocus}
              autoFocus
            />
          </View>
        </View>
      )}

      {showVerifyNumber && (
        <Pressable style={styles.verifyPress} onPress={onNavigateVerify}>
          <AppText style={{fontSize: scaleSize(14), color: colors.primary}}>
            {'Verify this number'}
          </AppText>
          <CaretRight width={14} height={14} iconFillColor={colors.primary} />
        </Pressable>
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
    marginTop: SIZE.base_space / 2,
  },
  verifyPress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleWidth(17),
  },
});
