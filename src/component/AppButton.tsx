import React, {useCallback} from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {AppText} from './AppText';
import {colors, fontFamily, SIZE} from '@util';
import {debounce} from 'lodash';
import {ButtonProps} from '@interfaces';
import {
  ArrowNext,
  CaretRight,
  IconResetMail,
  IconTakePhoto,
  IconTick,
  IconUpload,
} from '@assets';

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
    containerStyle,
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
    backgroundColor: 'transparent',
    borderWidth: isActive ? 1.5 : 1,
    borderColor: isActive ? colors.orange : colors.borderPrimary,
  };

  const titleLinear = {
    color: isActive ? colors.textPrimary : colors.textSecondPrimary,
    fontFamily: isActive
      ? fontFamily.fontWeight600.fontFamily
      : fontFamily.fontWeight500.fontFamily,
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

  const renderIconRight = () => {
    switch (iconRight) {
      case 'right':
        return <CaretRight />;
      case 'email':
        return <IconResetMail />;
      case 'arNextBlack':
        return <ArrowNext iconFillColor={colors.primary} />;
      case 'arNext':
        return <ArrowNext />;
      case 'upload':
        return <IconUpload />;
      case 'photo':
        return <IconTakePhoto />;
      case 'tick':
        return <IconTick />;
    }

    return null;
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={buttonStyle}
        disabled={disabled}
        onPress={onPressButton}
        activeOpacity={0.75}>
        {image && <Image source={image} style={imageStyle} />}
        {title && <AppText style={titleStyle}>{title}</AppText>}
        {iconRight && <View style={styles.iconRight}>{renderIconRight()}</View>}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZE.base_space,
    backgroundColor: colors.primary,
    marginTop: 16
  },
  txtButton: {
    ...fontFamily.fontWeight500,
    color: colors.white,
    fontSize: SIZE.base_size,
  },
  iconLeft: {
    marginRight: SIZE.base_space,
  },
  iconRight: {
    marginLeft: SIZE.base_space / 2,
  },
});

export {AppButton};
