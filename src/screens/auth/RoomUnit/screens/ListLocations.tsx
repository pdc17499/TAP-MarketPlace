import {IconMapPin} from '@assets';
import {AppText} from '@component';
import {getListLocation, getPlaceLocation} from '@services';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

interface ListLocationProps {
  location: any;
  onSelectLocation: (location: any) => void;
}

const ListLocations = ({location, onSelectLocation}: ListLocationProps) => {
  const [listLocation, setListLocation] = useState([]);
  useEffect(() => {
    async function getLocation() {
      const response: any = await getListLocation(location?.title);
      if (response && response?.data?.results) {
        const list = response?.data?.results;
        const nList = list?.length > 7 ? list.slice(0, 7) : list;
        setListLocation(nList);
      }
    }

    getLocation();
  }, [location]);

  const getMyLocation = async () => {
    const response: any = await getPlaceLocation();
    console.log({response});
    if (response && response?.data?.results) {
      const location = response?.data?.results[0];
      onSelectLocation(location);
    }
  };

  return (
    <>
      {location?.lat === -1 && listLocation?.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {listLocation.map((locate: any) => (
            <Pressable
              key={locate.geometry.location.lat}
              onPress={() => onSelectLocation(locate)}
              style={styles.locationItem}>
              <IconMapPin />
              <AppText style={styles.textLocation} numberOfLines={2}>
                {`${locate.name} - ${locate.formatted_address}`}
              </AppText>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {location?.title === '' && (
        <>
          <TouchableOpacity
            style={styles.btnYourLocation}
            onPress={getMyLocation}>
            <AppText style={styles.textYourLocation}>
              {'Use your current location'}
            </AppText>
          </TouchableOpacity>
          <View style={styles.line} />
        </>
      )}
    </>
  );
};

export {ListLocations};

const styles = StyleSheet.create({
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
