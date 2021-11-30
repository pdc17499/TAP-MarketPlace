import {AppButton, AppInput, AppText, Header} from '@component';
import {ROOM_UNIT_KIND_PLACE} from '@routeName';
import {colors, fontFamily, INIT_LOCATION_DATA, scaleWidth, SIZE} from '@util';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListLocations} from '@screens';

interface screenNavigationProp {
  navigate: any;
}

const RoomDetailLocation = ({navigation, route}: any) => {
  const {locate, onChangeValue} = route.params;
  const [location, setLocation] = useState(INIT_LOCATION_DATA);

  useEffect(() => {
    const nLocate = {
      name: locate.name,
      lat: locate.lat,
      long: locate.long,
    };
    console.log({nLocate});
    setLocation(nLocate);
  }, [locate]);

  const onChangeLocation = async (text: string) => {
    const nLocate = {...location, name: text};
    setLocation(nLocate);
  };

  const onSelectLocation = (nlocation: any) => {
    const nLocation = {
      name: `${nlocation.name} - ${nlocation.formatted_address}`,
      lat: nlocation?.geometry?.location?.lat,
      long: nlocation?.geometry?.location?.lng,
    };
    setLocation(nLocation);
  };

  const onClear = () => {
    setLocation(INIT_LOCATION_DATA);
  };

  const onDone = () => {
    onChangeValue(location, 'location');
    navigation.goBack();
  };

  return (
    <>
      <Header back />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <AppText style={styles.title}>{'Property location'}</AppText>
          <AppInput
            iconRight={location.name == '' ? 'other' : 'clear'}
            iconLeft="map"
            placeholder={'Search by Address'}
            value={location.name}
            onValueChange={onChangeLocation}
            onPressRightIcon={onClear}
          />
          <ListLocations
            location={{title: location.name, lat: -1, long: -1}}
            onSelectLocation={onSelectLocation}
          />
        </KeyboardAwareScrollView>
        {location.lat !== -1 && (
          <AppButton
            title={'Done'}
            onPress={onDone}
            containerStyle={styles.customStyleButton}
            iconRight={'tick'}
            size={'small'}
          />
        )}
      </View>
    </>
  );
};

export {RoomDetailLocation};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
    backgroundColor: colors.white,
  },
  title: {
    ...fontFamily.fontCampWeight500,
    fontSize: SIZE.base_size - 1,
    marginBottom: SIZE.base_space,
    marginTop: SIZE.base_space,
    color: colors.primary,
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
