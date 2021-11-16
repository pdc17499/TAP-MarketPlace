import {AppButton, AppInput, AppText, Header} from '@component';
import {ROOM_UNIT_KIND_PLACE} from '@routeName';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListLocations} from '@screens';

interface screenNavigationProp {
  navigate: any;
}

const RoomDetailLocation = ({navigation, route}: any) => {
  const {locate, onChangeText} = route.params;
  console.log({locate, route});
  const [location, setLocation] = useState('');

  useEffect(() => {
    setLocation(locate);
  }, [locate]);

  const onChangeLocation = async (text: string) => {
    setLocation(text);
  };

  const onSelectLocation = (location: any) => {
    const nLocation = `${location.name} - ${location.formatted_address}`;
    setLocation(nLocation);
  };

  const onDone = () => {
    onChangeText(location, 'location');
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
            iconRight={location == '' ? 'other' : 'clear'}
            iconLeft="map"
            placeholder={'Search by Address'}
            value={location}
            onValueChange={onChangeLocation}
            onPressRightIcon={() => onChangeLocation('')}
          />
          <ListLocations
            location={{title: location, lat: -1, long: -1}}
            onSelectLocation={onSelectLocation}
          />
        </KeyboardAwareScrollView>
        {location !== '' && (
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
