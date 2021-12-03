import {
  AppButton,
  AppInput,
  AppModal,
  AppPicker,
  AppSlider,
  AppText,
  ModalCheckedBox,
} from '@component';
import React, { useState, useRef } from 'react';
import { View, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import {
  IconDelete,
  IconDola,
  IconEyeCloseFullFill,
  IconEyeOpenFullFill,
} from '@assets';
import { colors, DEVICE, fontFamily, scaleSize, SIZE, validateForm } from '@util';
import { useNavigation } from '@react-navigation/core';
import { Formik, FormikValues } from 'formik';
import { ROOM_UNIT_HOWNER } from '@mocks';
import * as yup from 'yup';
import { ROOM_DETAIL_LOCATION } from '@routeName';
import ToggleSwitch from 'toggle-switch-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, updateRoom } from '@redux';
import { DataSignupProps } from '@interfaces';

const RoomDetailGeneral = ({ props }: any) => {
  const key = props;
  const ROOM: any = useSelector((state: any) => state?.rooms?.roomDetail);
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const isTenant = dataSignUp?.role_user === 'Tenant';
  // console.log('roo', ROOM);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const formRef = useRef<any>();

  const [room, setRoom] = useState({
    location: {
      name: ROOM?.RentalAddress,
      lat: ROOM?.Location?.Latitude,
      long: ROOM?.Location?.Longitude,
    },
    kind_place: ROOM?.PlaceType,
    lease_period: ROOM?.LeasePeriod?.value,
    min_range_price: ROOM?.RentalPrice?.Min,
    max_range_price: ROOM?.RentalPrice?.Max,
    staying_with_guests: ROOM?.RoomDetails?.StayWithGuest ? 'Yes' : 'No',
    room_active: ROOM?.isActive,
    rental_price: ROOM?.RentalPrice?.Price,
    rental_type: ROOM?.RentalPrice?.type,
  });
  const list = ROOM_UNIT_HOWNER;
  const formInitialValues = {
    location: room?.location,
    kind_place: room?.kind_place,
    lease_period: room?.lease_period,
    min_range_price: room?.min_range_price,
    max_range_price: room?.max_range_price,
    staying_with_guests: room?.staying_with_guests,
    room_active: room?.room_active,
    rental_price: room?.rental_price,
    rental_type: room?.rental_type,
  };

  const validationForm = yup.object().shape({
    // location: yup.string(),
    kind_place: validateForm().common.compareNA,
    lease_period: validateForm().common.atLeastOneArray,
    // ethnicity: validateForm().common.atLeastOnePicker,
    staying_with_guests: validateForm().common.selectAtLeast,
    rental_type: validateForm().common.compareNA,
    // room_active: validateForm().common.atLeastOnePicker,
  });

  const onChangeValue = (value: any, name?: string) => {
    // console.log('ss', value, name);

    const nRoom: any = { ...room };
    if (name) {
      nRoom[name] = value;
      setRoom(nRoom);
      console.log({ value });
    }
  };

  const onValuesChangeFinish = (values: any) => {
    console.log({ values });
    const nRoom: any = { ...room };
    nRoom['min_range_price'] = values[0];
    nRoom['max_range_price'] = values[1];
    setRoom(nRoom);
  };

  const onLocation = (locate: string) => {
    navigation.navigate(ROOM_DETAIL_LOCATION, { locate, onChangeValue });
  };

  const renderPriceTitle = (values: any) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconDola width={10} height={15} iconFillColor={colors.secondPrimary} />
        <AppText
          isPrice
          style={{
            fontSize: SIZE.base_space + 1,
            ...fontFamily.fontWeight500,
            marginLeft: 4,
          }}>{`${values.min_range_price}`}</AppText>
        <AppText>{`  -  `}</AppText>
        <IconDola width={10} height={15} iconFillColor={colors.secondPrimary} />
        <AppText
          isPrice
          style={{
            fontSize: SIZE.base_space + 1,
            marginLeft: 4,
            ...fontFamily.fontWeight500,
          }}>{`${values.max_range_price} `}</AppText>
      </View>
    );
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const onDelete = () => {
    dispatch(deleteRoom(ROOM.id));
  };

  const updateRoomInfomation = () => {
    const isPriceRange = room?.rental_type === 'Price range';
    let gallery = ROOM?.PicturesVideo || [];
    const nGallery = gallery.map((item: any) => {
      if (typeof item === 'string') {
        return JSON.parse(item);
      }
      return item;
    });
    const body = {
      roomDesc: {
        RentalAddress: room?.location?.name,
        Location: {
          Latitude: room?.location?.lat,
          Longitude: room?.location?.long,
        },

        PlaceType: room?.kind_place,
        RoomDetails: {
          RoomType: ROOM?.RoomDetails?.RoomType,
          BedroomNumber: ROOM?.RoomDetails?.BedroomNumber
            ? ROOM?.RoomDetails?.BedroomNumber.toString()
            : '',
          BathroomNumber: ROOM?.RoomDetails?.BathroomNumber
            ? ROOM?.RoomDetails?.BathroomNumber.toString()
            : '',
          AttachedBathroom: ROOM?.RoomDetails?.AttachedBathroom,
          StayWithGuest: room?.staying_with_guests === 'Yes',
          AllowCook: ROOM?.RoomDetails?.AllowCook,
          KeyWords: ROOM?.RoomDetails?.KeyWords,
          buildYear: ROOM?.RoomDetails?.builtYear,
          floorLevel: ROOM?.RoomDetails?.floorLevel,
          floorSizeMax: ROOM?.RoomDetails?.floorSizeMax,
          floorSizeMin: ROOM?.RoomDetails?.floorSizeMin,
          roomFurnished: ROOM?.RoomDetails?.roomFurnishing,
        },
        LeasePeriod: {
          type: room?.kind_place?.value === 'HDB',
          value: room?.lease_period,
        },
        PicturesVideo: nGallery,
        RentalPrice: {
          type: room?.rental_type,
          Min: isPriceRange ? room?.min_range_price : 0,
          Max: isPriceRange ? room?.max_range_price : 0,
          Price: isPriceRange ? 0 : room?.rental_price,
        },
        isActive: room?.room_active,
      },
    };
    console.log({ body });
    dispatch(updateRoom(body, ROOM?.id));
  };

  const renderPeriod = (period: Array<string>) => {
    if (period?.length > 0) {
      return (
        <View style={{ flexDirection: 'row' }}>
          {period.map((item: string, index: number) => {
            if (index === 0)
              return <AppText style={styles.period}>{`${item}`}</AppText>;
            else return <AppText style={styles.period}>{` - ${item}`}</AppText>;
          })}
        </View>
      );
    }
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: SIZE.big_space + SIZE.padding }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.line} />
        <Formik
          innerRef={formRef}
          initialValues={formInitialValues}
          validationSchema={validationForm}
          validateOnChange={false}
          enableReinitialize
          onSubmit={updateRoomInfomation}>
          {(propsFormik: any) => {
            const listPlace = list.lease_your_place;
            const months = isTenant
              ? listPlace
              : propsFormik.values.lease_period === 'HDB'
                ? listPlace.filter(item => item.label !== '3 months')
                : listPlace.filter(item => item.label !== '6 months');
            return (
              <>
                <View>
                  <AppButton
                    label={'Property location'}
                    typeButton={'underline'}
                    title={propsFormik.values.location.name}
                    onPress={() => onLocation(propsFormik.values.location)}
                  />
                  <AppPicker
                    value={propsFormik.values.kind_place}
                    name={'kind_place'}
                    label={'Property type'}
                    onValueChange={onChangeValue}
                    items={list.kind_place}
                    error={propsFormik.errors.kind_place}
                    stylePicker={'linear'}
                  />
                  <ModalCheckedBox
                    label={'Lease Period'}
                    data={months}
                    name={'lease_period'}
                    selected={propsFormik.values.lease_period}
                    onPressDone={onChangeValue}
                    viewContent={renderPeriod(propsFormik.values.lease_period)}
                  />
                  {propsFormik.errors.lease_period && (
                    <AppText style={styles.error}>
                      {propsFormik.errors.lease_period}
                    </AppText>
                  )}
                  <AppPicker
                    value={propsFormik.values.rental_type}
                    name={'rental_type'}
                    label={'Rental type'}
                    onValueChange={onChangeValue}
                    items={list.rental_price}
                    error={propsFormik.errors.rental_type}
                    stylePicker={'linear'}
                  // style={{ backgroundColor: 'red', with: '100%' }}
                  />

                  {room?.rental_type === 'Price range' ? (
                    <AppModal
                      label={'Price range'}
                      customTitle={renderPriceTitle(propsFormik.values)}>
                      <>
                        <AppSlider
                          onValuesChangeFinish={onValuesChangeFinish}
                          min_range_value={propsFormik.values.min_range_price}
                          max_range_value={propsFormik.values.max_range_price}
                          iconLeft={'dolar'}
                          sliderLength={DEVICE.width - SIZE.padding * 3}
                        />
                      </>
                    </AppModal>
                  ) : (
                    <AppInput
                      label={'Rental Price'}
                      value={propsFormik.values.rental_price}
                      name={'rental_price'}
                      iconLeft={'dolar'}
                      onValueChange={onChangeValue}
                      keyboardType={'number-pad'}
                      containerStyle={styles.inputStyle}
                      inputStyle={{ fontSize: scaleSize(18) }}
                      typeInput={'price'}
                      error={propsFormik.errors.rental_price}
                    />
                  )}
                  <AppPicker
                    value={propsFormik.values.staying_with_guests}
                    name={'staying_with_guests'}
                    label={'Stay with guests'}
                    onValueChange={onChangeValue}
                    items={list.staying_width_guests}
                    error={propsFormik.errors.staying_with_guests}
                    stylePicker={'linear'}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: SIZE.padding,
                      alignItems: 'center',
                    }}>
                    <AppText
                      style={{
                        flex: 1,
                        ...fontFamily.fontWeight600,
                        color: '#65666D',
                      }}>
                      {'Active/Inactive property'}
                    </AppText>
                    {!propsFormik.values.room_active ? (
                      <IconEyeCloseFullFill />
                    ) : (
                      <IconEyeOpenFullFill />
                    )}

                    <View style={{ marginLeft: 10, marginRight: 3 }}>
                      <ToggleSwitch
                        isOn={propsFormik.values.room_active}
                        onColor="#2A6B58"
                        offColor="#D8D8D8"
                        label=""
                        size="medium"
                        onToggle={isOn => onChangeValue(isOn, 'room_active')}
                      />
                    </View>
                  </View>
                  <View style={styles.line} />
                  <Pressable
                    onPress={onDelete}
                    style={{
                      flexDirection: 'row',
                      paddingVertical: SIZE.padding,
                      alignItems: 'center',
                    }}>
                    <IconDelete />
                    <AppText
                      style={{
                        flex: 1,
                        ...fontFamily.fontWeight600,
                        color: colors.textSecondPrimary,
                        marginLeft: 10,
                      }}>
                      {'Delete property'}
                    </AppText>
                  </Pressable>
                </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>
      <AppButton
        containerStyle={styles.button}
        title={'Save change'}
        size={'small'}
        iconRight={'tick'}
        onPress={handleSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: SIZE.medium_space,
  },
  contentContainerStyle: {
    paddingBottom: SIZE.big_space + SIZE.padding,
  },
  line: {
    height: 1,
    backgroundColor: colors.borderProfileList,
  },
  period: {
    // backgroundColor: 'red'
  },
  inputStyle: {
    marginTop: SIZE.base_space,
    marginBottom: SIZE.padding,
  },
  error: {
    marginTop: 6,
    color: colors.red,
    fontSize: scaleSize(15),
  },
});

export { RoomDetailGeneral };
