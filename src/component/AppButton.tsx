import React, {useCallback} from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {AppText} from './AppText';
import {colors, fontFamily, scaleSize, SIZE} from '@util';
import {debounce} from 'lodash';
import {ButtonProps} from '@interfaces';
import {
  ArrowNext,
  CaretRight,
  IconAddPhotos,
  IconAddVideos,
  IconPlus,
  IconResetMail,
  IconTick,
} from '@assets';

const AppButton = React.memo((props: ButtonProps) => {
  const {
    title,
    label,
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
    iconLeft,
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
    typeButton === 'linear' ? bgLinear : {},
    {minHeight: size === 'small' ? SIZE.btn_height_small : SIZE.btn_height},
    typeButton === 'link' ? styles.bgLink : {},
    typeButton === 'underline' ? styles.bgUnderline : {},
    customStyleButton,
  ];

  const titleStyle = [
    styles.txtButton,
    typeButton === 'linear' && titleLinear,
    typeButton === 'link' ? styles.titleLink : {},
    typeButton === 'underline' ? styles.titleUnderline : {},
    size === 'small' && {...fontFamily.fontWeight600},
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
      case 'addPhoto':
        return <IconAddPhotos />;
      case 'addVideo':
        return <IconAddVideos />;
      case 'tick':
        return <IconTick />;
      case 'plus':
        return <IconPlus />;
    }

    return null;
  };

  return (
    <View style={containerStyle}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <TouchableOpacity
        style={buttonStyle}
        disabled={disabled}
        onPress={onPressButton}
        activeOpacity={0.75}>
        {iconLeft && <>{iconLeft}</>}
        {image && <Image source={image} style={imageStyle} />}
        {title && <AppText style={titleStyle}>{title}</AppText>}
        {iconRight && <View style={styles.iconRight}>{renderIconRight()}</View>}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZE.base_space,
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.secondPrimary,
    fontSize: scaleSize(14.5),
    ...fontFamily.fontCampWeight500,
    paddingTop: SIZE.padding,
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
    marginRight: -SIZE.base_space / 2,
  },
  bgLink: {
    backgroundColor: 'transparent',
    minHeight: 'auto',
    alignItems: 'flex-end',
    alignSelf: 'center',
    borderRadius: 0,
    marginTop: SIZE.medium_space - 4,
  },
  titleLink: {
    color: colors.textSecondPrimary,
    ...fontFamily.fontCampWeight500,
    lineHeight: SIZE.base_size * 1.6,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.textSecondPrimary,
  },
  bgUnderline: {
    backgroundColor: 'transparent',
    minHeight: 'auto',
    justifyContent: 'flex-start',
    borderRadius: 0,
    paddingTop: SIZE.base_space / 2,
    marginTop: 0,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
  },
  titleUnderline: {
    textAlign: 'left',
    color: colors.textPrimary,
    fontSize: SIZE.base_size + 1,
    ...fontFamily.fontCampWeight500,
    paddingBottom: SIZE.padding,
  },
});

export {AppButton};
