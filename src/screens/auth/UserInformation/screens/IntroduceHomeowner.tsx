import { AppButton, AppText, Header } from '@component';
import { DataSignupProps } from '@interfaces';
import { useNavigation } from '@react-navigation/core';
import { ROOM_UNIT_ADDRESS } from '@routeName';
import { colors, fontFamily, scaleWidth, SIZE } from '@util';
import React, { } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface screenNavigationProp {
  navigate: any;
}

const IntroduceHomeowner = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();

  const onNext = () => {
    navigation.navigate(ROOM_UNIT_ADDRESS);
  };

  return (
    <>
      <Header back />
      <View style={styles.container}>
        <AppText style={styles.title}>
          {"Let's introduce your first homeowner's property"}
        </AppText>

        <AppText style={styles.miniTxt}>
          {"You can update more properties later."}
        </AppText>

        <AppButton
          title={'Start'}
          onPress={onNext}
          containerStyle={styles.customStyleButton}
          iconRight={'arNext'}
          size={'small'}
        />
      </View>
    </>
  );
};

export { IntroduceHomeowner };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    backgroundColor: colors.white,
    justifyContent: 'center'

  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding,
    // marginTop: SIZE.padding - SIZE.base_space,
    // maxWidth: scaleWidth(240),
  },
  customStyleButton: {
    paddingTop: SIZE.base_space / 2,
    paddingBottom: SIZE.medium_space,
    marginTop: scaleWidth(80)
  },
  miniTxt: {
    ...fontFamily.fontCampWeight500,
    color: colors.textThirdPrimary,
    fontSize: SIZE.base_size
  }

});
