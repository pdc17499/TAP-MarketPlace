import {AppText} from '@component';
import React from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import {colors, fontFamily, DEVICE, scaleWidth, SIZE} from '@util';
import {EyeIconClose, EyeIconOpen} from '@assets';
import {IAppInput} from '@interfaces';

export const AppInput = (props: IAppInput) => {
  const {
    label,
    error,
    value,
    placeholder,
    secureTextEntry = false,
    inputStyle,
    multiline = false,
    numberOfLines = 1,
    style,
    showEye,
    onValueChange,
    keyboardType,
    editable,
    iconLeft,
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePasssWord, setHidePassWord] = React.useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const onShowPassWord = () => {
    setHidePassWord(!hidePasssWord);
  };

  const viewStyle: any = [
    styles.inputWrap,
    {borderColor: isFocused ? colors.secondPrimary : colors.bgInput},
    style,
  ];

  const ipStyle: any = [
    styles.input,
    inputStyle,
    DEVICE.isIos &&
      multiline && {
        paddingTop: scaleWidth(16),
      },
  ];

  return (
    <>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View style={viewStyle}>
        {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
        <TextInput
          style={ipStyle}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={colors.textThirdPrimary}
          value={value}
          multiline={multiline}
          onFocus={handleFocus}
          onBlur={handleBlur}
          numberOfLines={numberOfLines}
          blurOnSubmit={false}
          onChangeText={onValueChange}
          secureTextEntry={hidePasssWord && secureTextEntry}
          keyboardType={keyboardType}
        />
        {showEye && (
          <TouchableOpacity onPress={onShowPassWord} style={styles.iconRight}>
            {hidePasssWord ? <EyeIconOpen /> : <EyeIconClose />}
          </TouchableOpacity>
        )}
      </View>
      {!!error && <AppText style={styles.error}>{error}</AppText>}
    </>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    minHeight: SIZE.btn_height,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: colors.bgInput,
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: SIZE.base_space,
  },
  label: {
    color: colors.primary,
    marginTop: SIZE.base_space,
  },
  iconLeft: {
    marginRight: SIZE.base_space,
  },
  iconRight: {
    marginLeft: SIZE.base_space,
  },
  input: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    color: colors.textPrimary,
    fontSize: SIZE.base_size,
    ...fontFamily.fontWeight400,
    marginTop: 10,
  },
  error: {
    marginTop: 5,
    color: colors.red,
  },
});
