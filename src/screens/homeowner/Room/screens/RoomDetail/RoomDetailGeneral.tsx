import {
  AppButton,
  AppModal,
  AppPicker,
  AppQA,
  AppSlider,
  AppText,
  Header,
  ModalCheckedBox,
} from '@component';
import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {
  IconDelete,
  IconDola,
  IconEyeCloseFullFill,
  IconEyeOpenFullFill,
  IconTabActive,
  room_sample,
} from '@assets';
import {
  colors,
  DEVICE,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  STYLE,
  validateForm,
} from '@util';
import { useNavigation } from '@react-navigation/core';
import { Formik, FormikValues } from 'formik';
import { ROOM_UNIT_HOWNER } from '@mocks';
import * as yup from 'yup';
import { ROOM_DETAIL_LOCATION } from '@routeName';
import ToggleSwitch from 'toggle-switch-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, updateRoom } from '@redux';

const RoomDetailGeneral = ({ props }: any) => {
  const key = props;
  const ROOM: any = useSelector((state: any) => state?.rooms?.roomDetail);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const formRef = useRef<FormikValues>()

  const [room, setRoom] = useState({
    location: ROOM?.RentalAddress,
    kind_place: ROOM?.PlaceType,
    lease_period: ROOM?.LeasePeriod?.value,
    min_range_price: ROOM?.RentalPrice?.Min,
    max_range_price: ROOM?.RentalPrice?.Max,
    staying_with_guests: ROOM?.StayWithGuest ? 'Yes' : 'No',
    room_active: ROOM?.isActive,
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
  };

  const validationForm = yup.object().shape({
    // location: yup.string(),
    // kind_place: validateForm().common.selectAtLeast,
    // lease_period: validateForm().common.atLeastOnePicker,
    // ethnicity: validateForm().common.atLeastOnePicker,
    // staying_with_guests: validateForm().common.atLeastOnePicker,
    // room_active: validateForm().common.atLeastOnePicker,
  });

  const onChangeText = (value: any, name?: string) => {
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
    navigation.navigate(ROOM_DETAIL_LOCATION, { locate, onChangeText });
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
      formRef.current.handleSubmit()
    }
  }

  const onDelete = () => {
    dispatch(deleteRoom(ROOM.id))
  }

  const updateRoomInfomation = () => {
    console.log('erro', room);
    console.log('ROOM', ROOM);

    const body = {
      "roomDesc": {
        "RentalAddress": room?.location,
        "PlaceType": room?.kind_place,
        "RoomDetails": {
          "RoomType": ROOM?.RoomType,
          "BedroomNumber": ROOM?.BedroomNumber,
          "BathroomNumber": ROOM?.BathroomNumber,
          "AttachedBathroom": ROOM?.AttachedBathroom,
          "StayWithGuest": room?.staying_with_guests === 'Yes',
          "AllowCook": ROOM?.AllowCook,
          "KeyWords": ROOM?.KeyWords,
          // "builtYear": ROOM?.builtYear,
          // "floorLevel": ROOM?.floorLevel,
          // "floorSizeMax": ROOM?.floorSizeMax,
          // "floorSizeMin": ROOM?.floorSizeMin,
          // "roomFurnishing": ROOM?.roomFurnishing,
        },
        "LeasePeriod": {
          "type": room?.kind_place?.value === 'HDB',
          "value": room?.lease_period,
        },
        "PicturesVideo": ROOM?.PicturesVideo || [],
        "RentalPrice": {
          "type": ROOM?.RentalPrice?.type,
          "Min": room?.min_range_price,
          "Max": room?.max_range_price,
          "Price": ROOM?.RentalPrice?.Price
        },
        "isActive": room?.room_active
      }
    }
    console.log('helo', { body })
    dispatch(updateRoom(body, ROOM?.id))
  }

  const renderPeriod = (period: Array<string>) => {
    if (period?.length > 0) {
      return (
        <View style={{ flexDirection: 'row' }} >
          {period.map((item: string, index: number) => {
            if (index === 0) return <AppText style={styles.period}>{`${item} months`}</AppText>
            else
              return (
                <AppText style={styles.period}>{` - ${item} months`}</AppText>
              );
          })}
        </View>
      );
    }
  }

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
          onSubmit={updateRoomInfomation}
        >
          {(propsFormik: any) => (
            <>
              <View>
                <AppButton
                  label={'Property location'}
                  typeButton={'underline'}
                  title={propsFormik.values.location}
                  onPress={() => onLocation(propsFormik.values.location)}
                />
                <AppPicker
                  value={propsFormik.values.kind_place}
                  name={'kind_place'}
                  label={'Property type'}
                  onValueChange={onChangeText}
                  items={list.kind_place}
                  error={propsFormik.errors.kind_place}
                  stylePicker={'linear'}
                />
                <ModalCheckedBox
                  label={'Lease Period'}
                  data={propsFormik.values.kind_place === 'HDB'
                    ? list.lease_your_place_hdb_new
                    : list.lease_your_place_new}
                  name={'lease_period'}
                  selected={propsFormik.values.lease_period}
                  onPressDone={onChangeText}
                  viewContent={renderPeriod(propsFormik.values.lease_period)}
                />
                <AppModal
                  label={'Rental price'}
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
                <AppPicker
                  value={propsFormik.values.staying_with_guests}
                  name={'staying_with_guests'}
                  label={'Stay with guests'}
                  onValueChange={onChangeText}
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
                      onToggle={isOn => onChangeText(isOn, 'room_active')}
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
          )}

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
  }
});

export { RoomDetailGeneral };
