import React from 'react';
import {StyleSheet, View, TouchableOpacity, Pressable} from 'react-native';
import {AppText} from '@component';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {
  colors,
  DEVICE,
  fontFamily,
  scaleHeight,
  scaleWidth,
  SIZE,
  STYLE,
} from '@util';
import {IconBack, IconSkip} from '@assets';
import {useNavigation} from '@react-navigation/native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {HeaderProps} from '@interfaces';

interface screenNavigationProp {
  goBack: any;
}

const Header = React.memo((props: HeaderProps) => {
  const {
    customTitleStyle,
    title,
    customContainer,
    back,
    onPressBack,
    iconFillColor,
    iconRight,
    onPressRight,
  } = props;
  const navigation = useNavigation<screenNavigationProp>();
  const goBack = () => {
    if (onPressBack) {
      onPressBack();
    } else {
      navigation.goBack();
    }
  };

  const renderIconRight = () => {
    switch (iconRight) {
      case 'skip':
        return <IconSkip />;
    }

    return null;
  };

  return (
    <View style={[styles.container, customContainer]}>
      <View style={styles.viewRow}>
        {back && (
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={goBack}
            hitSlop={STYLE.hitSlop}>
            <IconBack iconFillColor={iconFillColor} />
          </TouchableOpacity>
        )}
        <AppText style={[styles.txtTitle, customTitleStyle]}>{title}</AppText>
        {iconRight !== 'hide' && (
          <Pressable
            style={styles.buttonRight}
            onPress={onPressRight}
            hitSlop={STYLE.hitSlop}>
            {renderIconRight()}
          </Pressable>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...ifIphoneX(
      {
        paddingTop: scaleHeight(50),
      },
      {
        paddingTop: getStatusBarHeight() + scaleHeight(20),
      },
    ),
    paddingBottom: scaleHeight(20),
    backgroundColor: colors.white,
  },
  txtTitle: {
    fontSize: SIZE.medium_size,
    color: colors.primary,
    flex: 1,
    paddingHorizontal: SIZE.base_space,
    textAlign: 'center',
    ...fontFamily.fontWeight500,
  },
  viewRow: {
    flexDirection: 'row',
    width: DEVICE.width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZE.big_space,
  },
  buttonLeft: {
    left: SIZE.padding,
    position: 'absolute',
  },
  buttonRight: {
    right: SIZE.padding,
    position: 'absolute',
  },
});

export {Header};
