import {AppText} from '@component';
import React from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import {colors, fontFamily, DEVICE, scaleWidth, SIZE} from '@util';
import {
  EyeIconClose,
  EyeIconOpen,
  IconClear,
  IconPickLocation,
  Key,
  IconEmail,
  IconDola,
} from '@assets';
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
    iconRight,
    name,
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

  const renderIconLeft = () => {
    switch (iconLeft) {
      case 'map':
        return <IconPickLocation />;
      case 'email':
        return <IconEmail />;
      case 'key':
        return <Key />;
      case 'dolar':
        return <IconDola />;
    }

    return null;
  };

  const renderIconRight = () => {
    switch (iconRight) {
      case 'clear':
        return <IconClear />;
    }

    return null;
  };

  const onChangeText = (text: string) => {
    onValueChange(text, name);
  };

  return (
    <>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View style={viewStyle}>
        {iconLeft && <View style={styles.iconLeft}>{renderIconLeft()}</View>}
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
          onChangeText={onChangeText}
          secureTextEntry={hidePasssWord && secureTextEntry}
          keyboardType={keyboardType}
        />
        {showEye && (
          <TouchableOpacity onPress={onShowPassWord} style={styles.iconRight}>
            {hidePasssWord ? <EyeIconOpen /> : <EyeIconClose />}
          </TouchableOpacity>
        )}
        {iconRight && <View style={styles.iconRight}>{renderIconRight()}</View>}
      </View>
      {!!error && <AppText style={styles.error}>{error}</AppText>}
    </>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    minHeight: SIZE.input_height,
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
    marginBottom: 10,
  },
  iconLeft: {
    marginRight: SIZE.base_space,
  },
  iconRight: {
    marginLeft: SIZE.base_space,
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.textPrimary,
    fontSize: SIZE.base_size,
    ...fontFamily.fontWeight400,
  },
  error: {
    marginTop: 5,
    color: colors.red,
  },
});
