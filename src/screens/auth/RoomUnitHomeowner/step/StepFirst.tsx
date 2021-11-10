import {list_place, rent_place} from '@assets';
import {AppButton, AppInput, AppText, Header} from '@component';
import {RoomStepProps} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

interface screenNavigationProp {
  navigate: any;
}

const StepFirst = (props: RoomStepProps) => {
  const navigation = useNavigation<screenNavigationProp>();
  const [location, setLocation] = useState('');
  const {onNext} = props;

  const onChangeLocation = (text: string) => {
    setLocation(text);
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

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <AppText style={styles.title}>{'Where’s your place located?'}</AppText>
        <AppInput
          iconRight={location == '' ? 'other' : 'clear'}
          iconLeft="map"
          placeholder={'Search by Address'}
          value={location}
          onValueChange={onChangeLocation}
        />
        {/* <View style={{flex: 1}}>
        <GooglePlacesAutocomplete
          placeholder="Enter Location"
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
            container: {
              backgroundColor: 'red',
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
      <AppButton
        title={'Continue'}
        onPress={onNext}
        containerStyle={styles.customStyleButton}
        iconRight={'arNext'}
      />
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
    marginTop: SIZE.padding,
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
