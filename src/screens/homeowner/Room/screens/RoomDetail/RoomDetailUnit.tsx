import {
  AppButton,
  AppModal,
  AppPicker,
  AppSlider,
  AppText,
  Header,
  ModalCheckedBox,
} from '@component';
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import {
  IconBack,
  IconClear,
  IconDola,
  IconEdit,
  IconFloorSize,
  room_sample,
} from '@assets';
import {
  colors,
  DEVICE,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  SLIDER,
  STYLE,
  validateForm,
  YEARS,
} from '@util';
import { useNavigation } from '@react-navigation/core';
import { Formik, FormikValues } from 'formik';
import { ROOM_UNIT_HOWNER } from '@mocks';
import * as yup from 'yup';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import { ImageServerProps, pickerProps } from '@interfaces';
import { ROOM_DETAIL_GELLERY, ROOM_UNIT_GALLERY } from '@routeName';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoom } from '@redux';

const state = {
  activeIndex: 0,
  carouselItems: [
    {
      title: 'Item 1',
      text: 'Text 1',
    },
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
    {
      title: 'Item 5',
      text: 'Text 5',
    },
  ],
};

const RoomDetailUnit = ({ props }: any) => {
  const key = props;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const ROOM: any = useSelector((state: any) => state?.rooms?.roomDetail);
  // console.log('2222', ROOM);
  const inRoomUnit = true;
  const typeUser: any = useSelector((state: any) => state?.auth?.typeUser);
  const isHomeowner = typeUser === 'Homeowner'

  const formRef: any = useRef<FormikValues>();
  const [room, setRoom] = useState({
    room_type: ROOM?.RoomDetails?.RoomType,
    bedroom_number: ROOM?.RoomDetails?.BedroomNumber,
    bathroom_number: ROOM?.RoomDetails?.BathroomNumber,
    allow_cooking: ROOM?.RoomDetails?.AllowCook ? 'Yes' : 'No',
    amenities: ROOM?.RoomDetails?.KeyWords,
    gallery: ROOM?.PicturesVideo,
    room_furnishing: ROOM?.RoomDetails?.roomFurnished,
    floor_size_min: ROOM?.RoomDetails?.floorSizeMin,
    floor_size_max: ROOM?.RoomDetails?.floorSizeMax,
    floor_level: ROOM?.RoomDetails?.floorLevel,
    built_year: ROOM?.RoomDetails?.buildYear,
    attached_bathroom: ROOM?.RoomDetails?.AttachedBathroom ? 'Yes' : 'No',
  });
  const [visible, setVisible] = useState(false);

  const isRoomType = room?.room_type === 'Room';

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const list: any = ROOM_UNIT_HOWNER;

  const list_attached = isHomeowner
    ? list.attached_bathroom.filter((item: any) => item.label !== 'Any') : list.attached_bathroom

  const formInitialValues = {
    room_type: room.room_type,
    bedroom_number: room.bedroom_number,
    bathroom_number: room.bathroom_number,
    room_furnishing: room.room_furnishing,
    floor_size_min: room.floor_size_min,
    floor_size_max: room.floor_size_max,
    floor_level: room.floor_level,
    built_year: room.built_year,
    allow_cooking: room.allow_cooking,
    amenities: room.amenities,
    gallery: room.gallery,
    attached_bathroom: room.attached_bathroom,
  };

  const validationForm = yup.object().shape({
    room_type: validateForm().common.selectAtLeast,
    // bedroom_number: validateForm().common.selectAtLeast,
    // bathroom_number: validateForm().common.selectAtLeast,
    // room_furnishing: validateForm().common.selectAtLeast,
    // floor_size_min: room.floor_size_min,
    // floor_size_max: room.floor_size_max,
    // floor_level: room.floor_level,
    // built_year: room.built_year,
    // allow_cooking: room.allow_cooking,
    // amenities: room.amenities,
    // gallery: room.gallery,
    // attached_bathroom: room.attached_bathroom,
  });

  const onChangeValue = (value: any, name?: string) => {
    const nRoom: any = { ...room };
    if (name) {
      nRoom[name] = value;
      setRoom(nRoom);
      console.log({ value });
    }
  };

  const onSubmit = (values: any) => { };

  const onValuesChangeFinish = (values: any) => {
    console.log({ values });
    const nRoom: any = { ...room };
    nRoom['floor_size_min'] = values[0];
    nRoom['floor_size_max'] = values[1];
    setRoom(nRoom);
  };

  const renderFloorSizeContent = (values: any) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconFloorSize iconFillColor={colors.secondPrimary} />
        <AppText
          isPrice
          style={{
            fontSize: SIZE.base_space + 1,
            ...fontFamily.fontWeight500,
            marginLeft: 4,
          }}>
          {values.floor_size_min ? `${values.floor_size_min}` : '0'}
        </AppText>
        <AppText>{`  -  `}</AppText>
        <IconFloorSize iconFillColor={colors.secondPrimary} />
        <AppText
          isPrice
          style={{
            fontSize: SIZE.base_space + 1,
            marginLeft: 4,
            ...fontFamily.fontWeight500,
          }}>
          {values.floor_size_max ? `${values.floor_size_max} ` : '0'}
        </AppText>
      </View>
    );
  };

  const renderAppPicker = (props: any, name: string, label: string) => {
    return (
      <AppPicker
        value={props.values[name]}
        name={name}
        label={label}
        onValueChange={onChangeValue}
        items={name === 'built_year' ? YEARS() : list[name]}
        error={props.errors[name]}
        stylePicker={'linear'}
      />
    );
  };

  const onGallery = (gallery: Array<string>) => {
    const nGallery = gallery.map(item => convertFile(item));
    // console.log({nGallery});
    navigation.navigate(ROOM_UNIT_GALLERY, {
      gallery: nGallery,
      onChangeValue,
    });
  };

  const convertFile = (file: any) => {
    console.log({ file });
    if (file && typeof file === 'string') {
      return JSON.parse(file);
    }

    return file;
  };

  const renderGallery = (gallery: Array<any>) => {
    const length = gallery?.length || 0;
    const styleList = length > 4 ? styles.row : styles.rowNotBetween;
    const styleFile =
      length > 4 ? styles.smallImage : styles.smallImageWidthSpace;

    return (
      <View style={{ paddingTop: SIZE.padding, marginBottom: 50 }}>
        <View style={styles.row}>
          <AppText style={styles.label}>{'Gallery'}</AppText>
          <Pressable
            style={styles.buttonEdit}
            onPress={() => onGallery(gallery)}>
            <IconEdit />
          </Pressable>
        </View>
        {length > 0 && (
          <Pressable onPress={openModal}>
            <Image
              source={{ uri: convertFile(gallery[0])?.imagePath }}
              style={styles.firstImage}
            />
            <View style={styleList}>
              {gallery.map((item: ImageServerProps, index: number) => {
                const file = convertFile(item);
                const isVideo = file?.format?.includes('videos');
                const uri = file?.imagePath;
                if (index > 0 && index < 5) {
                  return (
                    <View key={index.toString()}>
                      {isVideo ? (
                        <Video
                          source={{ uri }}
                          style={styleFile}
                          resizeMode={'cover'}
                        // controls
                        // paused
                        />
                      ) : (
                        <Image source={{ uri }} style={styleFile} />
                      )}
                      {index === 4 && (
                        <View style={styles.shadowGallery}>
                          <AppText style={styles.textMoreFile}>
                            {`+${length - index - 1}`}
                          </AppText>
                        </View>
                      )}
                    </View>
                  );
                }

                return null;
              })}
            </View>
          </Pressable>
        )}

        <Modal
          isVisible={visible}
          backdropOpacity={1}
          animationOutTiming={400}
          animationInTiming={400}>
          <Pressable hitSlop={STYLE.hitSlop} onPress={closeModal}>
            <IconClear iconFillColor={colors.white} width={25} height={25} />
          </Pressable>
          <View style={styles.modal}>
            <Carousel
              layout={'default'}
              data={gallery}
              renderItem={_renderFile}
              sliderWidth={DEVICE.width}
              itemWidth={DEVICE.width - SIZE.padding}
              contentContainerCustomStyle={{
                alignItems: 'center',
                marginTop: -40,
              }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  var typesVideo = ['mp4'];

  const _renderFile = ({ item }: { item: ImageServerProps }) => {
    console.log({ item });
    const file = convertFile(item);
    const isVideo = file?.format?.includes('videos');
    const uri = file?.imagePath;

    return (
      <View key={item.toString()}>
        {isVideo ? (
          <Video source={{ uri }} style={styles.gallery} resizeMode={'contain'} />
        ) : (
          <Image source={{ uri }} style={styles.gallery} />
        )}
      </View>
    );
  };

  const renderAmenities = (amenities: Array<string>) => {
    if (amenities?.length > 0) {
      return (
        <>
          {amenities.map((item: string) => {
            const index = list.amenities.findIndex(
              (itm: pickerProps) => item === itm.value,
            );
            return (
              <View style={styles.itemAmenity}>
                {index !== -1 && list.amenities[index].icon}
                <AppText>{`    ${item}`}</AppText>
              </View>
            );
          })}
        </>
      );
    }
    return <View />;
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const updateRoomInfomation = () => {
    // console.log('room', room);
    // console.log('ROOM', ROOM);
    let gallery = room.gallery || [];
    const nGallery = gallery.map((item: any) => {
      if (typeof item === 'string') {
        return JSON.parse(item);
      }

      return item;
    });

    const body = {
      roomDesc: {
        RentalAddress: ROOM?.RentalAddress,
        Location: {
          Latitude: ROOM?.Location?.Latitude,
          Longitude: ROOM?.Location?.Longitude,
        },
        PlaceType: ROOM?.PlaceType,
        RoomDetails: {
          RoomType: room?.room_type,
          BedroomNumber: isRoomType ? '0' : room?.bedroom_number,
          BathroomNumber: isRoomType ? '0' : room?.bathroom_number,
          AttachedBathroom: isRoomType
            ? room?.attached_bathroom === 'Yes'
            : false,
          StayWithGuest: ROOM?.RoomDetails?.StayWithGuest,
          AllowCook: room?.allow_cooking === 'Yes',
          KeyWords: room?.amenities,
          buildYear: room?.built_year,
          floorLevel: room?.floor_level,
          floorSizeMax: room?.floor_size_max,
          floorSizeMin: room?.floor_size_min,
          roomFurnished: room?.room_furnishing,
        },
        LeasePeriod: ROOM?.LeasePeriod,
        PicturesVideo: nGallery,
        RentalPrice: ROOM?.RentalPrice,
        isActive: ROOM?.isActive,
      },
    };
    dispatch(updateRoom(body, ROOM?.id));
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.line} />
        <Formik
          innerRef={formRef}
          initialValues={formInitialValues}
          validationSchema={validationForm}
          validateOnChange={false}
          enableReinitialize
          onSubmit={updateRoomInfomation}>
          {(props: any) => (
            <>
              <View>
                {renderAppPicker(props, 'room_type', 'Rental type')}
                {room.room_type === 'Room' ? (
                  <AppPicker
                    value={props.values.attached_bathroom}
                    name={'attached_bathroom'}
                    label={'Attached Bathroom'}
                    onValueChange={onChangeValue}
                    items={list_attached}
                    error={props.errors.attached_bathroom}
                    stylePicker={'linear'}
                  />
                ) : (
                  <>
                    {renderAppPicker(
                      props,
                      'bedroom_number',
                      'Number of Bedrooms',
                    )}
                    {renderAppPicker(
                      props,
                      'bathroom_number',
                      'Number of Bathrooms',
                    )}
                  </>
                )}

                <AppModal
                  label={'Floor size'}
                  customTitle={renderFloorSizeContent(props.values)}>
                  <AppSlider
                    onValuesChangeFinish={onValuesChangeFinish}
                    min_range_value={props.values.floor_size_min}
                    max_range_value={props.values.floor_size_max}
                    min_range={SLIDER.MIN_FLOOR_SIZE}
                    max_range={SLIDER.MAX_FLOOR_SIZE}
                    iconLeft={'dolar'}
                    sliderLength={DEVICE.width - SIZE.padding * 3}
                  />
                </AppModal>
                {renderAppPicker(props, 'room_furnishing', 'Room furnishing')}
                {renderAppPicker(props, 'floor_level', 'Floor level')}
                {renderAppPicker(props, 'allow_cooking', 'Allow cooking')}
                {renderAppPicker(props, 'built_year', 'Built year')}

                <ModalCheckedBox
                  label={'Amenities'}
                  data={list.amenities}
                  name={'amenities'}
                  selected={props.values.amenities}
                  onPressDone={onChangeValue}
                  viewContent={renderAmenities(props.values.amenities)}
                />
                {renderGallery(props.values.gallery)}
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
    paddingBottom: scaleWidth(90),
  },
  line: {
    height: 1,
    backgroundColor: colors.borderProfileList,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowNotBetween: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonEdit: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.bgInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.secondPrimary,
    fontSize: scaleSize(14.5),
    marginBottom: SIZE.base_space / 2,
    ...fontFamily.fontCampWeight500,
  },
  firstImage: {
    width: '100%',
    height: scaleWidth(210),
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: SIZE.padding,
    marginBottom: SIZE.base_space,
  },
  gallery: {
    width: DEVICE.width - SIZE.padding,
    height: scaleWidth(230),
    resizeMode: 'cover',
    borderRadius: 4,
  },
  shadowGallery: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(8),
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMoreFile: {
    ...fontFamily.fontCampWeight600,
    fontSize: scaleSize(18),
    color: colors.white,
  },
  smallImage: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(8),
  },
  smallImageWidthSpace: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(8),
    marginRight: SIZE.base_space,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemAmenity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZE.padding / 2,
  },
});

export { RoomDetailUnit };
