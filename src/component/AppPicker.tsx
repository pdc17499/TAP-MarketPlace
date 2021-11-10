import {AppText} from '@component';
import {DownIcon} from '@assets';
import {colors, fontFamily, scaleSize, scaleWidth, SIZE} from '@util';
import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface IAppPicker {
  label?: string;
  // value?: any;
  onValueChange: (value: any, name?: string) => void;
  items?: any;
  style?: any;
  placeholder?: any;
  value?: any;
  error?: string;
  styleError?: any;
  name?: string;
}

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
  } = props;
  const value = props.value || '';

  return (
    <>
      {label && <Animated.Text style={[styles.label]}>{label}</Animated.Text>}
      <View style={[styles.container, style]}>
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
      </View>
      {!!error && <AppText style={[styles.error, styleError]}>{error}</AppText>}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    minHeight: SIZE.input_height,
    marginTop: SIZE.medium_space,
    justifyContent: 'center',
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
});
