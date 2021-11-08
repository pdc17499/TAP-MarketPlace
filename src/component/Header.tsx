import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {AppText} from '@component';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {colors, DEVICE, fontFamily, scaleWidth, SIZE} from '@util';
import {IconBack} from '@assets';
import {useNavigation} from '@react-navigation/native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

interface HeaderProp {
  customTitleStyle?: any;
  title?: string;
  customContainer?: any;
  back?: any;
  btnCountine?: boolean;
  onPressCountine?: () => void;
  btnRight?: any;
  iconRight?: any;
}
interface screenNavigationProp {
  goBack: any;
}

const Header = React.memo((props: HeaderProp) => {
  const {customTitleStyle, title, customContainer, back} = props;
  const navigation = useNavigation<screenNavigationProp>();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container, customContainer]}>
      <View style={styles.viewRow}>
        {back && (
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={goBack}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <IconBack />
          </TouchableOpacity>
        )}
        <AppText style={[styles.txtTitle, customTitleStyle]}>{title}</AppText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...ifIphoneX(
      {
        paddingTop: scaleWidth(50),
      },
      {
        paddingTop: getStatusBarHeight() + 20,
      },
    ),
    paddingBottom: 15,
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
  iconRight: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
  buttonLeft: {
    left: SIZE.padding,
    position: 'absolute',
  },
});

export {Header};
