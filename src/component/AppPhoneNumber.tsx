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
import {CaretRight, DownIcon, IconShieldCheck, IconVerifyPhone} from '@assets';
import {useNavigation} from '@react-navigation/core';
import {VERIFY_ACCOUNT, VERIFY_CODE} from '@routeName';
import {useDispatch, useSelector} from 'react-redux';
import {verifyPhonenumber} from '@redux';
import {UserInfo} from '@interfaces';
interface IAppPhoneNumber {
  label?: string;
  value?: string;
  onChangePhone: (text: string, name?: string) => void;
  error?: string;
  type?: 'default' | 'inline';
  name?: string;
  maxLength?: number;
  showVerifyNumber?: boolean;
  isContactVerified?: boolean;
  isAccSettingScreen?: boolean;
}

export const AppPhoneNumber = React.memo((props: IAppPhoneNumber) => {
  const {
    label,
    value,
    onChangePhone,
    error,
    type,
    maxLength,
    name,
    showVerifyNumber,
    isContactVerified,
    isAccSettingScreen,
  } = props;
  const [phone, setPhone] = useState({
    code: '',
    number: '',
  });
  const [isInLine, setIsInLine] = useState(false);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    getCountryCode();
  }, [value]);

  useEffect(() => {
    if (type === 'inline') setIsInLine(true);
  }, []);

  const getCountryCode = () => {
    if (!value) {
      setPhone({
        code: '',
        number: '',
      });
    } else {
      const index = value.indexOf(' ');
      if (index === -1) {
        const contact = `+65 ${value}`;
        onChangePhone(contact, name);
      } else {
        const nCode = value.substring(0, index);
        const nPhone = value.substring(index + 1, value.length);
        setPhone({
          code: nCode,
          number: nPhone,
        });
      }
    }
  };

  const onNavigateVerify = () => {
    if (value && value !== '') {
      console.log({value});
      dispatch(
        verifyPhonenumber({
          email: dataUser?.email,
          contact: value,
          isAccSettingScreen,
        }),
      );
      // navigation.navigate(VERIFY_CODE, {contact: value});
    } else {
      Alert.alert('Please enter your phone number!');
    }
  };

  const onChangePhoneNumber = (nPhone: any) => {
    const contact = `${phone.code} ${nPhone
      .toString()
      .replace(/[^a-zA-Z0-9]/g, '')}`;
    console.log({contact});
    onChangePhone(contact, name);
  };

  const onChangeCode = (nCode: any) => {
    const contact = `${nCode} ${phone.number}`;
    console.log({contact});
    onChangePhone(contact, name);
  };

  return (
    <>
      {isInLine ? (
        <Pressable style={styles.inlineType} onPress={() => setIsInLine(false)}>
          <AppText style={{...fontFamily.fontWeight500}}>
            {`${phone.code} ${phone.number}  ` || 'N/A'}
          </AppText>
          {isContactVerified && <IconVerifyPhone style={{bottom: 3}} />}
        </Pressable>
      ) : (
        <View style={styles.container}>
          <AppModalCountry
            value={phone.code}
            onValueChange={onChangeCode}
            customStyleContainer={styles.customStyleContainer}
            customStyleButton={styles.customStyleButton}
            type={'phone_code'}
            typeButton={'base'}
          />
          <View style={styles.input}>
            <AppInput
              typeInput={'phone'}
              delimiter={' - '}
              style={styles.inputPhone}
              keyboardType="number-pad"
              value={phone.number}
              onValueChange={onChangePhoneNumber}
              maxLength={maxLength}
              inputStyle={{fontSize: SIZE.base_size + 1}}
              // callBackOnFocus={callBackOnFocus}
              autoFocus
            />
          </View>
        </View>
      )}

      {showVerifyNumber && !isContactVerified && (
        <Pressable style={styles.verifyPress} onPress={onNavigateVerify}>
          <AppText style={{fontSize: scaleSize(14), color: colors.primary}}>
            {'Verify account with phone number'}
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
    minWidth: scaleWidth(70),
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
  customStyleContainer: {paddingTop: 0, paddingRight: 0},
  customStyleButton: {paddingBottom: 8, marginTop: 0},
});
