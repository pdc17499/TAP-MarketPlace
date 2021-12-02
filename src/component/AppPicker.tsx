import { AppText } from '@component';
import { DownIcon, IconAddPhotos, IconDotOrange } from '@assets';
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
    customStyleLabel,
    customePlaceholder,
    customStyleInputPicker,
    customSubview,
    showDot,
  } = props;
  const value = props.value || '';
  const [isOpenPicker, setIsOpenPicker] = useState(false);

  const onSelectFlag = (country: any) => {
    onValueChange(country, name);
    console.log({ country });
  };
  // console.log('vall', name, value);

  const onOpenPickerSelect = (isOpen: boolean) => setIsOpenPicker(isOpen);

  const modalCountryProps = disable ? { visible: !disable } : {};
  const isLinear = stylePicker === 'linear';

  const colorLabel = {
    color: isOpenPicker ? colors.primary : colors.secondPrimary,
  };
  const styles = isLinear
    ? {
      ...stylesBase,
      ...stylesLinear,
    }
    : stylesBase;

  const DownIconPicker = () => {
    return !isLinear ? <DownIcon /> : null;
  };

  const styleInputAndroid = { ...styles.inputAndroid, ...customStyleInputPicker };
  const styleInputIOS = { ...styles.inputIOS, ...customStyleInputPicker };

  return (
    <>
      <View style={styles.container}>
        {label && (
          <View>
            <AppText style={[styles.label, colorLabel, customStyleLabel]}>
              {label}
            </AppText>
            {value !== '' ? null : (
              <View style={{ position: 'absolute', top: 7, right: 0 }}>
                {showDot && <IconDotOrange />}
              </View>
            )}
          </View>
        )}
        <View style={[styles.picker, style]}>
          {typePicker === 'country' ? (
            <View style={styles.country}>
              <CountryPicker
                theme={styles.themePickerCountry}
                withCallingCode={false}
                withCallingCodeButton={false}
                countryCode={value || 'SG'}
                // containerButtonStyle
                withFlagButton={false}
                onSelect={onSelectFlag}
                withFilter={true}
                withCountryNameButton
                modalProps={modalCountryProps}
                onOpen={() => onOpenPickerSelect(true)}
                onClose={() => onOpenPickerSelect(false)}
              />
              {DownIconPicker()}
            </View>
          ) : (
            <>
              <RNPickerSelect
                disabled={disable}
                onValueChange={item => onValueChange(item, name)}
                useNativeAndroidPickerStyle={false}
                placeholder={placeholder || { label: '', value: '' }}
                value={value}
                items={items}
                pickerProps={{
                  style: styles.pickerProps,
                }}
                style={{
                  inputAndroid: styleInputAndroid,
                  inputIOS: styleInputIOS,
                  iconContainer: styles.iconContainer,
                  placeholder: styles.placeholder,
                }}
                onOpen={() => onOpenPickerSelect(true)}
                onClose={() => onOpenPickerSelect(false)}
              />
              {!value && customePlaceholder}
              {isLinear ? (
                <View style={styles.hideDropdownAndroid} />
              ) : (
                <View style={styles.customIcon}>{DownIconPicker()}</View>
              )}
            </>
          )}
        </View>
        {customSubview}
      </View>
      {!!error && <AppText style={[styles.error, styleError]}>{error}</AppText>}
    </>
  );
});

const stylesBase = StyleSheet.create({
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
    top: 0,
    right: 5,
    width: 35,
    height: SIZE.input_height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hideDropdownAndroid: {
    backgroundColor: colors.white,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 1,
    right: 0,
    width: 50,
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
    marginTop: 6,
    color: colors.red,
    fontSize: scaleSize(15),
  },
  inputAndroid: {
    ...fontFamily.fontWeight400,
    fontSize: SIZE.base_size,
    color: colors.textPrimary,
    position: 'absolute',
    top: -8,
    width: '100%',
    zIndex: 1,
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
    top: 10,
    right: 12,
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
});

const stylesLinear = StyleSheet.create({
  container: {
    marginTop: SIZE.padding,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
  },
  picker: {
    justifyContent: 'center',
  },
  label: {
    color: colors.secondPrimary,
    fontSize: scaleSize(15),
    marginBottom: DEVICE.isIos ? SIZE.base_space / 2 : SIZE.base_space / 4,
    ...fontFamily.fontCampWeight500,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 'auto',
    backgroundColor: colors.white,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingBottom: SIZE.padding,
    // marginTop: 10
  },
  inputAndroid: {
    ...fontFamily.fontWeight500,
    fontSize: SIZE.base_size + 1,
    color: colors.textPrimary,
    position: 'absolute',
    top: 0,
    width: '100%',
    margin: 0,
    height: 'auto',
    minHeight: SIZE.input_height,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    // borderBottomColor: colors.borderProfileList,
    // borderBottomWidth: 1,
    borderRadius: 0,
    paddingBottom: scaleWidth(20),
    paddingTop: 0,
  },
  inputIOS: {
    ...fontFamily.fontWeight500,
    height: 'auto',
    color: colors.textPrimary,
    width: '100%',
    fontSize: SIZE.base_size + 1,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    // borderBottomColor: colors.borderProfileList,
    // borderBottomWidth: 1,
    borderRadius: 0,
    paddingBottom: SIZE.padding,
  },
});
