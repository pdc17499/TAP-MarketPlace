import {AppButton, AppInput, AppText, Header} from '@component';
import {DataSignupProps} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import {ROOM_UNIT_KIND_PLACE} from '@routeName';
import {ListLocations} from '@screens';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

interface screenNavigationProp {
  navigate: any;
}

const RoomUnitAddress = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const location = dataSignUp?.location;

  const onChangeLocation = async (text: string) => {
    const nData: DataSignupProps = {...dataSignUp};
    nData.location = {
      title: text,
      lat: -1,
      long: -1,
    };
    dispatch(setDataSignup({data: nData}));
  };

  const onSelectLocation = (location: any) => {
    const nData: DataSignupProps = {...dataSignUp};
    const nLocation = `${location.name} - ${location.formatted_address}`;
    nData.location = {
      title: nLocation,
      lat: location.geometry.location.lat,
      long: location.geometry.location.lng,
    };
    dispatch(setDataSignup({data: nData}));
  };

  const onNext = () => {
    navigation.navigate(ROOM_UNIT_KIND_PLACE);
  };

  const title =
    dataSignUp?.role_user === 'Tenant'
      ? 'Where are you planning to stay'
      : 'Where’s your place located?';

  return (
    <>
      <Header back />
      <View style={styles.container}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <AppText style={styles.title}>{title}</AppText>
          <AppInput
            iconRight={location?.title == '' ? 'other' : 'clear'}
            iconLeft="map"
            placeholder={'Search by Address'}
            value={location?.title}
            onValueChange={onChangeLocation}
            onPressRightIcon={() => onChangeLocation('')}
          />
          <ListLocations
            location={location}
            onSelectLocation={onSelectLocation}
          />
        </KeyboardAwareScrollView>
        {location?.title !== '' && (
          <AppButton
            title={'Continue'}
            onPress={onNext}
            containerStyle={styles.customStyleButton}
            iconRight={'arNext'}
            size={'small'}
          />
        )}
      </View>
    </>
  );
};

export {RoomUnitAddress};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    backgroundColor: colors.white,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding,
    marginTop: SIZE.padding - SIZE.base_space,
    maxWidth: scaleWidth(240),
  },
  btnYourLocation: {
    padding: scaleWidth(20),
    paddingLeft: SIZE.base_space,
  },
  textYourLocation: {
    ...fontFamily.fontWeight600,
    color: colors.primary,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.borderPrimary,
  },
  customStyleButton: {
    paddingTop: SIZE.base_space / 2,
    paddingBottom: SIZE.medium_space,
  },
  locationItem: {
    paddingVertical: SIZE.padding - 2,
    borderBottomColor: colors.borderPrimary,
    borderBottomWidth: 1,
    paddingLeft: SIZE.base_space,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLocation: {marginLeft: SIZE.base_space, flex: 1},
});
