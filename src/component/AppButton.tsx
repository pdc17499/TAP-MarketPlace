import React, {useCallback} from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
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
    image,
    imageStyle,
  } = props;

  const onPressButton = useCallback(
    debounce(() => {
      if (onPress) {
        onPress();
      }
    }, 250),
    [onPress],
  );

  const bgLinear = {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: isActive ? colors.orange : colors.borderPrimary,
  };

  const titleLinear = {
    color: isActive ? colors.textPrimary : colors.textSecondPrimary,
    ...fontFamily.fontWeight500,
  };

  const buttonStyle = [
    styles.container,
    typeButton === 'linear' && bgLinear,
    {minHeight: size === 'small' ? SIZE.btn_height_small : SIZE.btn_height},
    customStyleButton,
  ];

  const titleStyle = [
    styles.txtButton,
    typeButton === 'linear' && titleLinear,
    customStyleTitle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled}
      onPress={onPressButton}
      activeOpacity={0.75}>
      {image && <Image source={image} style={imageStyle} />}
      {title && <AppText style={titleStyle}>{title}</AppText>}
      {iconRight && <View>{iconRight}</View>}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: SIZE.base_space,
    backgroundColor: colors.primary,
  },
  txtButton: {
    ...fontFamily.fontWeight600,
    color: colors.white,
    fontSize: SIZE.base_size,
  },
});

export {AppButton};
