import {AppText} from '@component';
import {DownIcon} from '@assets';
import {colors, fontFamily, scaleSize, scaleWidth, SIZE} from '@util';
import React, {useState} from 'react';
import {StyleSheet, View, Animated, Pressable} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CountryPicker from 'react-native-country-picker-modal';
import {IAppPicker} from '@interfaces';

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
  } = props;
  const value = props.value || '';
  const [visible, setVisible] = useState(false);

  const onSelectFlag = (country: any) => {
    // setCountryCode(country?.cca2);
    onValueChange(country, name);
    console.log({country});
  };

  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View style={[styles.picker, style]}>
        {typePicker === 'coutry' ? (
          <View style={styles.country}>
            <CountryPicker
              theme={{
                fontSize: SIZE.base_size,
                ...fontFamily.fontWeight400,
              }}
              visible={visible}
              withCallingCode={false}
              withCallingCodeButton={false}
              countryCode={value || 'SG'}
              withFlagButton={false}
              onSelect={onSelectFlag}
              withFilter={true}
              withCountryNameButton
            />
            <DownIcon />
          </View>
        ) : (
          <RNPickerSelect
            onValueChange={item => onValueChange(item, name)}
            useNativeAndroidPickerStyle={false}
            placeholder={placeholder}
            value={value}
            items={items}
            pickerProps={{
              style: {
                height: '100%',
                backgroundColor: 'transparent',
                color: 'transparent',
              },
            }}
            style={{
              inputAndroid: styles.inputAndroid,
              inputIOS: styles.inputIOS,
              iconContainer: styles.iconContainer,
              placeholder: styles.placeholder,
            }}
            Icon={() => <DownIcon style={{top: 4}} />}
          />
        )}
      </View>
      {!!error && <AppText style={[styles.error, styleError]}>{error}</AppText>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: SIZE.medium_space,
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
    right: 8,
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
});
