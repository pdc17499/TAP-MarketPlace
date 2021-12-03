import {AppButton, AppQA, AppText} from '@component';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutApp} from '@redux';
import {
  colors,
  fontFamily,
  mergeArrayServer,
  scaleSize,
  scaleWidth,
  SIZE,
} from '@util';
import {ROOM_UNIT_HOWNER, TENANT_PROPERTY} from '@mocks';
import {
  avatar_default,
  IconAllowCooking,
  IconBathrooms,
  IconBedrooms,
  IconBuiltYear,
  IconFloorLevel,
  IconFloorSize,
  IconFloorSize2,
  IconHandShake,
  IconRoomFurnishing,
  IconRoomType,
} from '@assets';

interface MatchesRoomDetailProps {
  room: any;
}

export const MatchesRoomDetail = (props: MatchesRoomDetailProps) => {
  const {room} = props;

  const renderItem = (SourceIcon: any, label: string, value: any) => {
    if (value && value !== '') {
      return (
        <View style={styles.itemContainter}>
          <SourceIcon />
          <AppText style={styles.labelItem}>{label}</AppText>
          <AppText style={styles.valueItem}>{value}</AppText>
        </View>
      );
    }

    return null;
  };
  const renderFloorSize = (
    SourceIcon: any,
    label: string,
    minValue: any,
    maxValue: any,
  ) => {
    if (minValue && maxValue && minValue !== '' && maxValue !== '') {
      return (
        <View style={styles.itemContainter}>
          <SourceIcon />
          <View style={styles.flexRow}>
            <AppText style={styles.labelFloorSize}>{label}</AppText>
            <AppText style={styles.labelFloorSize}>{' ('}</AppText>
            <IconFloorSize width={18} height={11} />
            <AppText style={styles.labelFloorSize}>{')'}</AppText>
          </View>
          <AppText
            style={styles.valueItem}>{`${minValue} - ${maxValue}`}</AppText>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {renderItem(IconRoomType, 'Property type', room.RoomType)}
      {renderItem(IconBedrooms, 'Bedrooms', room.BedroomNumber)}
      {renderItem(IconBathrooms, 'Bathrooms', room.BathroomNumber)}
      {renderItem(IconRoomFurnishing, 'Room furnishing', room.roomFurnished)}
      {renderItem(IconFloorLevel, 'Floor level', room.floorLevel)}
      {renderItem(IconAllowCooking, 'Allow cooking', room.AllowCook)}
      {renderFloorSize(
        IconFloorSize2,
        'Floor size',
        room.floorSizeMin,
        room.floorSizeMax,
      )}
      {renderItem(IconBuiltYear, 'Built', room.buildYear)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftColor: colors.borderProfileList,
    borderTopColor: colors.borderProfileList,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    marginTop: SIZE.big_space,
  },
  itemContainter: {
    padding: scaleWidth(20),
    borderRightColor: colors.borderProfileList,
    borderBottomColor: colors.borderProfileList,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    width: '50%',
  },
  labelItem: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
    fontSize: scaleSize(14),
    marginTop: SIZE.base_space / 2,
    marginBottom: SIZE.padding / 2,
  },
  labelFloorSize: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
    fontSize: scaleSize(14),
  },
  valueItem: {
    ...fontFamily.fontWeight600,
    color: colors.textFouthPrimary,
    fontSize: scaleSize(18),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE.base_space / 2,
    marginBottom: SIZE.padding / 2,
  },
});
