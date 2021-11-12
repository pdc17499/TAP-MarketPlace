import {list_place, rent_place} from '@assets';
import {AppButton, AppInput, AppText, Header} from '@component';
import {DataSignupProps, RoomStepProps} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import {colors, DEVICE, fontFamily, scaleWidth, SIZE} from '@util';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch, useSelector} from 'react-redux';

interface screenNavigationProp {
  navigate: any;
}

const StepFirst = (props: RoomStepProps) => {
  const {onNext} = props;
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const location = dataSignUp?.location;
  const setData = (value: any) => {
    const nData: any = {...dataSignUp};
    nData['role_user'] = value;
    dispatch(setDataSignup({data: nData}));
  };

  const onChangeLocation = (text: string) => {
    // setLocation(text);
  };

  const getMyLocation = () => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     console.log(position);
    //   },
    //   error => {
    //     // See error code charts below.
    //     console.log(error.code, error.message);
    //   },
    //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    // );
  };

  const googleAPIKey = DEVICE.isIos
    ? 'AIzaSyC-Och0tCHZLWEe5ALdE6p036YVSFHCDhc'
    : 'AIzaSyA1HRVR1VdkTgTBtah_EaPAf1EwY9wEdvs';

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <AppText style={styles.title}>{'Where’s your place located?'}</AppText>
        <AppInput
          iconRight={location.title == '' ? 'other' : 'clear'}
          iconLeft="map"
          placeholder={'Search by Address'}
          value={location.title}
          onValueChange={onChangeLocation}
        />
        {/* <View style={{flex: 1}}>
          <GooglePlacesAutocomplete
            query={{
              key: googleAPIKey,
              language: 'en',
            }}
            placeholder="Enter Location"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => console.log({data})}
            onFail={error => console.log({error})}
            styles={{
              container: {
                // backgroundColor: 'red',
              },
              textInputContainer: {
                backgroundColor: 'grey',
              },
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        </View> */}
        <TouchableOpacity style={styles.btnYourLocation}>
          <AppText style={styles.textYourLocation} onPress={getMyLocation}>
            {'Use your current location'}
          </AppText>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
      {/* {location.title !== '' && ( */}
      <AppButton
        title={'Continue'}
        onPress={onNext}
        containerStyle={styles.customStyleButton}
        iconRight={'arNext'}
      />
      {/* )} */}
    </View>
  );
};

export {StepFirst};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
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
    paddingTop: SIZE.base_space,
    paddingBottom: SIZE.medium_space,
  },
});
