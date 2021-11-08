import React, {useCallback} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
import {colors, fontFamily, SIZE} from '@util';
import {debounce} from 'lodash';
import {ButtonProps} from '@interfaces';

const AppButton = React.memo((props: ButtonProps) => {
  const {
    title,
    customStyleButton,
    customStyleTitle,
    onPress,
    disabled,
    iconRight,
    size,
    typeButton,
    isActive,
  } = props;

  const onPressButton = useCallback(
    debounce(() => {
      if (onPress) {
        onPress();
      }
    }, 200),
    [onPress],
  );

  const bgLinear = {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: isActive ? colors.orange : colors.borderPrimary,
  };

  const buttonStyle = [
    styles.container,
    typeButton === 'linear' && bgLinear,
    {height: size === 'small' ? SIZE.btn_height_small : SIZE.btn_height},
    customStyleButton,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled}
      onPress={onPressButton}>
      {title && (
        <AppText style={[styles.txtButton, customStyleTitle]}>{title}</AppText>
      )}
      {iconRight && <View>{iconRight}</View>}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZE.base_space,
  },
  txtButton: {
    ...fontFamily.fontWeight600,
    color: colors.white,
    fontSize: SIZE.base_size,
  },
});

export {AppButton};
