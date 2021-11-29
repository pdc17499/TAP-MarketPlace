import {
  AppButton,
  AppModal,
  AppPicker,
  AppSlider,
  AppText,
  Header,
  ModalCheckedBox,
} from '@component';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  colors,
  DEVICE,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {pickerProps} from '@interfaces';
import {getRoomTenant} from '@redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CaretRight, IconDola} from '@assets';
import {ROOM_DETAIL_LOCATION} from '@routeName';
import {useNavigation} from '@react-navigation/core';

const SearchingFilter = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const list: any = ROOM_UNIT_HOWNER;
  const dataRoom: any = useSelector((state: any) => state?.rooms?.roomDetail);
  const [room, setRoom] = useState({
    location: dataRoom?.RentalAddress,
    kind_place: dataRoom?.PlaceType,
    lease_period: dataRoom?.LeasePeriod?.value,
    min_range_price: dataRoom?.BudgetPrice?.Min,
    max_range_price: dataRoom?.BudgetPrice?.Max,
    room_type: dataRoom?.RoomProperty?.RoomType,
    bedroom_number: dataRoom?.RoomProperty?.BedroomNumber,
    bathroom_number: dataRoom?.RoomProperty?.BathroomNumber,
    amenities: dataRoom?.RoomProperty?.KeyWords,
    allow_cooking: dataRoom?.RoomProperty?.AllowCook ? 'Yes' : 'No',
  });
  console.log('222', room);
  useEffect(() => {
    dispatch(getRoomTenant());
    // setRoom(dataRoom)
  }, []);

  const formInitialValues = {
    location: room.location,
    kind_place: room.kind_place,
    lease_period: room.lease_period,
    min_range_price: room.min_range_price,
    max_range_price: room.max_range_price,
    room_type: room.room_type,
    bedroom_number: room.bedroom_number,
    bathroom_number: room.bathroom_number,
    amenities: room.amenities,
    allow_cooking: room.allow_cooking,
  };

  const validationForm = yup.object().shape({
    location: yup.string(),
    kind_place: validateForm().common.selectAtLeast,
    lease_period: validateForm().common.atLeastOneArray,
    room_type: validateForm().common.selectAtLeast,
  });

  const onLocation = (locate: string) => {
    navigation.navigate(ROOM_DETAIL_LOCATION, {locate, onChangeText});
  };

  const onChangeText = (value: any, name?: string) => {
    console.log('ss', value, name);
    const nRoom: any = {...room};
    if (name) {
      nRoom[name] = value;
      setRoom(nRoom);
      console.log({value});
    }
  };

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...room};
      nData[name] = item;
      setRoom(nData);
    }
  };

  const renderPeriod = (period: Array<string>) => {
    if (period?.length > 0) {
      return (
        <View style={{flexDirection: 'row'}}>
          {period.map((item: string, index: number) => {
            if (index === 0) return <AppText>{`${item} months`}</AppText>;
            else return <AppText>{` - ${item} months`}</AppText>;
          })}
        </View>
      );
    }
  };

  const renderPriceTitle = (values: any) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

  const onValuesChangeFinish = (values: any) => {
    console.log({values});
    const nRoom: any = {...room};
    nRoom['min_range_price'] = values[0];
    nRoom['max_range_price'] = values[1];
    setRoom(nRoom);
  };

  const renderAppPicker = (props: any, name: string, label: string) => {
    return (
      <AppPicker
        value={props.values[name]}
        name={name}
        label={label}
        onValueChange={onChangeValue}
        items={list[name]}
        error={props.errors[name]}
        stylePicker={'linear'}
      />
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

  const onSubmit = () => {
    const body = {
      roomDesc: {
        RentalAddress: room.location,
        PlaceType: room.kind_place,
        RoomDetails: {
          RoomType: room?.room_type,
          BedroomNumber: room?.bedroom_number,
          BathroomNumber: room?.bathroom_number,
          AllowCook: room?.allow_cooking === 'Yes',
          KeyWords: room?.amenities,
          AttachedBathroom: false,
          StayWithGuest: false,
        },
        LeasePeriod: {
          type: room?.kind_place?.value === 'HDB',
          value: room?.lease_period,
        },
        BudgetPrice: {
          Min: room?.min_range_price,
          Max: room?.max_range_price,
        },
      },
    };
    console.log('body', body);

    // dispatch(updateUserInfo({ body, id: user?.id }));
  };

  const RenderForm = () => (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onSubmit}>
        {(props: any) => (
          <>
            <View style={styles.formikContainer}>
              <AppText style={styles.title0}>{'Property Details'}</AppText>
              <AppButton
                label={'Property location'}
                typeButton={'underline'}
                title={props.values.location}
                onPress={() => onLocation(props.values.location)}
              />

              <AppPicker
                value={props.values.kind_place}
                name={'kind_place'}
                label={'Property type'}
                onValueChange={onChangeText}
                items={list.kind_place_tenant}
                error={props.errors.kind_place}
                stylePicker={'linear'}
              />
              <AppText style={styles.title}>{'Rental Details'}</AppText>
              <ModalCheckedBox
                label={'Lease Period'}
                data={
                  props.values.kind_place === 'HDB'
                    ? list.lease_your_place_hdb_new
                    : list.lease_your_place_new
                }
                name={'lease_period'}
                selected={props.values.lease_period}
                onPressDone={onChangeText}
                viewContent={renderPeriod(props.values.lease_period)}
              />
              {props.errors.lease_period && (
                <AppText style={styles.error}>
                  {props.errors.lease_period}
                </AppText>
              )}
              <AppModal
                label={'Rental Price'}
                customTitle={renderPriceTitle(props.values)}>
                <>
                  <AppSlider
                    onValuesChangeFinish={onValuesChangeFinish}
                    min_range_value={props.values.min_range_price}
                    max_range_value={props.values.max_range_price}
                    iconLeft={'dolar'}
                    sliderLength={DEVICE.width - SIZE.padding * 3}
                  />
                </>
              </AppModal>
              <AppText style={styles.title}>{'Room Details'}</AppText>
              {renderAppPicker(props, 'room_type', 'Room type')}
              {renderAppPicker(props, 'bedroom_number', 'Number of beds')}
              {renderAppPicker(props, 'bathroom_number', 'Number of baths')}
              {renderAppPicker(props, 'allow_cooking', 'Will you be cooking?')}
              <ModalCheckedBox
                label={'Amenities'}
                data={list.amenities}
                name={'amenities'}
                selected={props.values.amenities}
                onPressDone={onChangeValue}
                viewContent={renderAmenities(props.values.amenities)}
              />
            </View>
            <AppText style={styles.txtBottom1}>
              {'Your lifestyle & preferences also affect matching results '}
            </AppText>
            <View style={styles.item}>
              <AppText style={styles.txtBottom2}>
                {'Change your Lifestyle & Preferences'}
              </AppText>
              <CaretRight />
            </View>
            <AppButton
              customStyleButton={styles.button}
              title={'Save change'}
              size={'small'}
              iconRight={'tick'}
              onPress={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>{RenderForm()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  formikContainer: {
    flex: 1,
    // borderTopWidth: 1,
    // borderTopColor: colors.borderProfileList,
    paddingTop: 10,
  },
  title: {
    fontSize: scaleSize(24),
    ...fontFamily.fontCampWeight600,
    marginTop: scaleSize(48),
    marginBottom: SIZE.padding,
    color: colors.textPrimary,
  },
  title0: {
    fontSize: scaleSize(24),
    ...fontFamily.fontCampWeight600,
    // marginTop: scaleSize(10),
    marginBottom: SIZE.padding,
    color: colors.textPrimary,
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    color: colors.textPrimary,
  },
  text: {
    fontSize: scaleSize(15),
    ...fontFamily.fontWeight500,
    lineHeight: scaleWidth(15),
    marginBottom: scaleWidth(10),
    color: colors.primary,
  },
  input: {},

  button: {
    marginTop: SIZE.medium_space,
    marginBottom: SIZE.medium_space,
  },
  error: {
    marginTop: 6,
    color: colors.red,
    fontSize: scaleSize(15),
  },
  itemAmenity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZE.padding / 2,
  },
  item: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZE.padding,
  },
  txtBottom1: {
    ...fontFamily.fontWeight400,
    fontSize: scaleSize(16),
    color: colors.textPlace,
    lineHeight: scaleSize(25),
    marginTop: scaleWidth(48),
    marginBottom: SIZE.base_space,
  },
  txtBottom2: {
    ...fontFamily.fontWeight600,
    fontSize: scaleSize(16),
    color: colors.primary,
    flex: 1,
  },
});

export {SearchingFilter};
