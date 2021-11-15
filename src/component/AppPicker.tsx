import { AppText } from '@component';
import { DownIcon } from '@assets';
import { colors, DEVICE, fontFamily, scaleSize, scaleWidth, SIZE } from '@util';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Pressable } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CountryPicker from 'react-native-country-picker-modal';
import { IAppPicker } from '@interfaces';

export const AppPicker: React.FC<IAppPicker> = React.memo((props: any) => {
  const {
    label,
    onValueChange,
    items,
    style,
    placeholder,
    error,
    styleError,
    name,
    typePicker,
    stylePicker,
    disable,
  } = props;
  const value = props.value || '';

  const onSelectFlag = (country: any) => {
    onValueChange(country, name);
    console.log({ country });
  };

  console.log('value', value);


  const modalCountryProps = disable ? { visible: !disable } : {};
  const isLinear = stylePicker === 'linear';
  const DownIconPicker = () => {
    if (isLinear) return null
    else return <DownIcon />
  }
  // !isLinear && <DownIcon />;
  const contryPickerStyle = [styles.country, isLinear && styles.linearPicker];
  const inputAndroidStyle = isLinear
    ? styles.inputAndroidLinear
    : styles.inputAndroid;
  const inputIOSStyle = isLinear ? styles.inputIOSLinear : styles.inputIOS;

  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View style={[styles.picker, style]}>
        {typePicker === 'country' ? (
          <View style={contryPickerStyle}>
            <CountryPicker
              theme={styles.themePickerCountry}
              withCallingCode={false}
              withCallingCodeButton={false}
              countryCode={value || 'SG'}
              withFlagButton={false}
              onSelect={onSelectFlag}
              withFilter={true}
              withCountryNameButton
              modalProps={modalCountryProps}
            />
            {DownIconPicker()}
          </View>
        ) : (
          <>
            <RNPickerSelect
              disabled={disable}
              onValueChange={item => onValueChange(item, name)}
              useNativeAndroidPickerStyle={false}
              placeholder={placeholder}
              value={value}
              items={items}
              pickerProps={{
                style: styles.pickerProps,
              }}
              style={{
                inputAndroid: inputAndroidStyle,
                inputIOS: inputIOSStyle,
                iconContainer: styles.iconContainer,
                placeholder: styles.placeholder,
              }}
              Icon={() => DEVICE.isIos && DownIconPicker()}
            />
            {DEVICE.isAndroid && (
              <View style={styles.customIcon}>{DownIconPicker()}</View>
            )}
          </>
        )}
      </View>
      {!!error && <AppText style={[styles.error, styleError]}>{error}</AppText>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: SIZE.base_space,
  },
  pickerProps: {
    backgroundColor: 'transparent',
    color: 'transparent',
  },
  themePickerCountry: {
    fontSize: SIZE.base_size,
    ...fontFamily.fontWeight400,
  },
  customIcon: {
    backgroundColor: colors.bgInput,
    zIndex: 1,
    position: 'absolute',
    top: SIZE.input_height / 2 - 3,
    right: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customIcon2: {
    backgroundColor: colors.white,
    zIndex: 1,
    position: 'absolute',
    top: SIZE.input_height / 2 - 3,
    right: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    minHeight: SIZE.input_height,
    justifyContent: 'center',
  },
  label: {
    color: colors.primary,
    fontSize: scaleSize(15),
    marginBottom: SIZE.base_space,
  },
  error: {
    marginTop: 5,
    color: colors.red,
  },
  inputAndroid: {
    ...fontFamily.fontWeight400,
    fontSize: SIZE.base_size,
    color: colors.textPrimary,
    position: 'absolute',
    top: 2,
    width: '100%',
    margin: 0,
    height: SIZE.input_height,
    paddingLeft: SIZE.base_space,
    backgroundColor: colors.bgInput,
    borderRadius: 8,
  },
  inputIOS: {
    ...fontFamily.fontWeight400,
    height: SIZE.input_height,
    color: colors.textPrimary,
    width: '100%',
    fontSize: SIZE.base_size,
    paddingLeft: SIZE.base_space,
    backgroundColor: colors.bgInput,
    borderRadius: 8,
  },
  iconContainer: {
    position: 'absolute',
    top: scaleWidth(20),
    right: 0,
    justifyContent: 'center',
    marginRight: scaleWidth(10),
  },
  placeholder: {
    ...fontFamily.fontWeight400,
    color: colors.textSecondPrimary,
    fontSize: SIZE.base_size,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgInput,
    borderRadius: 8,
    paddingHorizontal: SIZE.base_space,
    minHeight: SIZE.input_height,
  },
  linearPicker: {
    backgroundColor: colors.white,
    borderBottomColor: colors.borderPrimary,
    borderBottomWidth: 1,
    borderRadius: 0,
    // marginTop: 10
  },
  inputAndroidLinear: {
    ...fontFamily.fontWeight400,
    fontSize: SIZE.base_size,
    color: colors.textPrimary,
    position: 'absolute',
    top: 2,
    width: '100%',
    margin: 0,
    height: SIZE.input_height,
    paddingLeft: SIZE.base_space,
    backgroundColor: colors.white,
    borderBottomColor: colors.borderPrimary,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  inputIOSLinear: {
    ...fontFamily.fontWeight400,
    height: SIZE.input_height,
    color: colors.textPrimary,
    width: '100%',
    fontSize: SIZE.base_size,
    paddingLeft: SIZE.base_space,
    backgroundColor: colors.white,
    borderBottomColor: colors.borderPrimary,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
});
