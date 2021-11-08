import {AppText} from '@component';
import {DownIcon} from '@assets';
import {colors, fontFamily, scaleSize, scaleWidth} from '@util';
import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface IAppPicker {
  label?: string;
  // value?: any;
  onValueChange: (value: any) => void;
  items?: any;
  style?: any;
  placeholder?: any;
  value?: any;
  error?: string;
  styleError?: any;
}

export const AppPicker: React.FC<IAppPicker> = React.memo((props: any) => {
  const {
    label,
    value,
    onValueChange,
    items,
    style,
    placeholder,
    error,
    styleError,
  } = props;

  return (
    <>
      {label && <Animated.Text style={[styles.label]}>{label}</Animated.Text>}
      <View style={[styles.container, style]}>
        <RNPickerSelect
          onValueChange={onValueChange}
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
      </View>
      {!!error && <AppText style={[styles.error, styleError]}>{error}</AppText>}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    minHeight: scaleWidth(60),
    marginTop: scaleWidth(30),
    backgroundColor: colors.bgInput,
  },
  label: {
    ...fontFamily.fontWeight400,
  },
  error: {
    marginTop: 5,
    color: colors.red,
  },
  inputAndroid: {
    ...fontFamily.fontWeight400,
    fontSize: scaleSize(16),
    color: colors.textPrimary,
    position: 'absolute',
    top: 2,
    width: '100%',
    margin: 0,
    height: scaleWidth(60),
  },
  inputIOS: {
    ...fontFamily.fontWeight400,
    height: scaleWidth(60),
    color: colors.textPrimary,
    width: '100%',
    fontSize: scaleSize(16),
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    height: scaleWidth(60),
    justifyContent: 'center',
    marginRight: scaleWidth(10),
  },
  placeholder: {
    ...fontFamily.fontWeight400,
    color: colors.textSecondPrimary,
    fontSize: scaleSize(16),
  },
});
