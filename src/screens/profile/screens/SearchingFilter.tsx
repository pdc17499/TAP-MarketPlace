import {
  AppButton,
  AppModal,
  AppPicker,
  AppSlider,
  AppText,
  Header,
  ModalCheckedBox,
} from '@component';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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
import { Formik } from 'formik';
import { ROOM_UNIT_HOWNER } from '@mocks';
import { pickerProps, RoomProps } from '@interfaces';
import { getRoomTenant, updateRoomTenant } from '@redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IconDola } from '@assets';
import { ROOM_DETAIL_LOCATION } from '@routeName';
import { useNavigation } from '@react-navigation/core';

const SearchingFilter = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const list: any = ROOM_UNIT_HOWNER;
  const dataRoom: any = useSelector((state: any) => state?.rooms?.roomDetail);
  console.log({ dataRoom });

  useEffect(() => {
    dispatch(getRoomTenant());
  }, []);

  const formInitialValues: RoomProps = {
    location: {
      name: dataRoom?.RentalAddress,
      lat: dataRoom?.Location?.Latitude,
      long: dataRoom?.Location?.Longitude,
    },
    kind_place_tenant: dataRoom?.PlaceType,
    lease_your_place: dataRoom?.LeasePeriod?.value,
    min_range_price: dataRoom?.BudgetPrice?.Min,
    max_range_price: dataRoom?.BudgetPrice?.Max,
    room_type: dataRoom?.RoomProperty?.RoomType,
    bedroom_number_tenant: dataRoom?.RoomProperty?.BedroomNumber,
    bathroom_number_tenant: dataRoom?.RoomProperty?.BathroomNumber,
    amenities: dataRoom?.RoomProperty?.KeyWords,
    allow_cooking: dataRoom?.RoomProperty?.AllowCook ? 'Yes' : 'No',
    attached_bathroom: dataRoom?.RoomProperty?.AttachedBathroom ? 'Yes' : 'No',
  };

  const validationForm = yup.object().shape({
    kind_place_tenant: validateForm().common.atLeastOneArray,
    lease_your_place: validateForm().common.atLeastOneArray,
    amenities: validateForm().common.atLeastOneArray,
    allow_cooking: validateForm().common.compareNA,
    room_type: validateForm().common.compareNA,
    bedroom_number_tenant: yup.array().when('room_type', {
      is: 'Entire Home',
      then: validateForm().common.atLeastOneArray,
    }),
    bathroom_number_tenant: yup.array().when('room_type', {
      is: 'Entire Home',
      then: validateForm().common.atLeastOneArray,
    }),
    attached_bathroom: yup.string().when('room_type', {
      is: 'Room',
      then: validateForm().common.selectAtLeast,
    }),
  });

  const onLocation = (props: any) => {
    const locate = props.values.location;
    navigation.navigate(ROOM_DETAIL_LOCATION, {
      locate,
      onChangeValue: (location: any) => onChangeMap(location, props),
    });
  };

  const onChangeMap = (location: any, props: any) => {
    const { setFieldValue } = props;
    setFieldValue('location', location);
  };

  const renderPriceTitle = (values: any) => {
    return (
      <View style={styles.flexRow}>
        <IconDola width={10} height={15} iconFillColor={colors.secondPrimary} />
        <AppText isPrice style={styles.titlePrice}>
          {`${values.min_range_price}`}
        </AppText>
        <AppText>{`  -  `}</AppText>
        <IconDola width={10} height={15} iconFillColor={colors.secondPrimary} />
        <AppText isPrice style={styles.titlePrice}>
          {`${values.max_range_price} `}
        </AppText>
      </View>
    );
  };

  const onValuesChangeFinish = (
    value: any,
    values: any,
    setFieldValue: any,
  ) => {
    console.log({ values });
    if (value[0] !== values.min_range_price) {
      setFieldValue('min_range_price', value[0]);
    }
    if (value[1] !== values.max_range_price) {
      setFieldValue('max_range_price', value[1]);
    }
  };

  const renderAppPicker = (props: any, name: string, label: string) => {
    return (
      <AppPicker
        value={props.values[name]}
        name={name}
        label={label}
        onValueChange={value => props.setFieldValue(name, value)}
        items={list[name]}
        error={props.errors[name]}
        stylePicker={'linear'}
        customStyleInputPicker={styles.valueModal}
      />
    );
  };

  const renderModalCheckbox = (props: any, name: string, label: string) => {
    const { values, errors, setFieldValue } = props;
    const data =
      name === 'bedroom_number_tenant' || name === 'bathroom_number_tenant'
        ? list.bedroom_number
        : list[name];
    return (
      <ModalCheckedBox
        label={label}
        data={data}
        name={name}
        selected={values[name]}
        onPressDone={value => setFieldValue(name, value)}
        viewContent={renderMultipleItem(name, values[name])}
        error={errors[name]}
      />
    );
  };

  const renderMultipleItem = (name: string, data: Array<string>) => {
    console.log('name', name);

    if (data && data?.length > 0) {
      if (name === 'amenities') {
        return (
          <>
            {data.map((item: string) => {
              const index = list.amenities.findIndex(
                (itm: pickerProps) => item === itm.value,
              );

              return (
                <View style={styles.itemAmenity} key={item}>
                  {index !== -1 && list.amenities[index].icon}
                  <AppText>{`    ${item}`}</AppText>
                </View>
              );
            })}
          </>
        );
      } else {
        return <AppText style={styles.valueModal}>{data.join(', ')}</AppText>;
      }
    } else {
      return <AppText style={styles.placeHolder}>{'N/A'}</AppText>;
    }
  };

  const onSubmit = (values: RoomProps) => {
    const isRoom = values?.room_type === 'Room';
    const body: any = {
      roomDesc: {
        RentalAddress: values?.location?.name,
        Location: {
          Latitude: values?.location?.lat,
          Longitude: values?.location?.long,
        },
        PlaceType: values?.kind_place_tenant,
        RoomProperty: {
          RoomType: values?.room_type,
          AllowCook: values?.allow_cooking === 'Yes',
          KeyWords: values?.amenities,
          StayWithGuest: false,
        },
        LeasePeriod: {
          type: false,
          value: values?.lease_your_place,
        },
        BudgetPrice: {
          Min: values?.min_range_price,
          Max: values?.max_range_price,
        },
      },
    };

    if (isRoom) {
      body.roomDesc.RoomProperty.AttachedBathroom = values?.attached_bathroom;
    } else {
      body.roomDesc.RoomProperty.BedroomNumber = values?.bedroom_number_tenant;
      body.roomDesc.RoomProperty.BathroomNumber =
        values?.bathroom_number_tenant;
    }
    console.log('body', body, values);

    dispatch(updateRoomTenant(body));
  };

  const renderFormik = (props: any) => {
    const { values, errors, setFieldValue, handleSubmit } = props;

    console.log({ values, errors });

    return (
      <>
        <View style={styles.formikContainer}>
          <AppText style={styles.title0}>{'Property Details'}</AppText>
          <AppButton
            label={'Property location'}
            typeButton={'underline'}
            title={values.location?.name}
            onPress={() => onLocation(props)}
          />
          {renderModalCheckbox(props, 'kind_place_tenant', 'Property type')}
          {renderModalCheckbox(props, 'lease_your_place', 'Lease type')}
          <AppModal
            label={'Rental Price'}
            customTitle={renderPriceTitle(values)}>
            <>
              <AppSlider
                onValuesChangeFinish={(value: any) =>
                  onValuesChangeFinish(value, values, setFieldValue)
                }
                min_range_value={values.min_range_price}
                max_range_value={values.max_range_price}
                iconLeft={'dolar'}
                sliderLength={DEVICE.width - SIZE.padding * 3}
              />
            </>
          </AppModal>
          <AppText style={styles.title}>{'Room Details'}</AppText>
          {renderAppPicker(props, 'room_type', 'Room type')}
          {values.room_type === 'Room' ? (
            <>
              {renderAppPicker(
                props,
                'attached_bathroom',
                'Do you prefer attached bathroom?',
              )}
            </>
          ) : (
            <>
              {renderModalCheckbox(
                props,
                'bedroom_number_tenant',
                'Bedroom number',
              )}
              {renderModalCheckbox(
                props,
                'bathroom_number_tenant',
                'Bathroom number',
              )}
            </>
          )}

          {renderAppPicker(props, 'allow_cooking', 'Will you be cooking?')}
          {renderModalCheckbox(props, 'amenities', 'Amenities')}
        </View>
        {/* <AppText style={styles.txtBottom1}>
              {'Your lifestyle & preferences also affect matching results '}
            </AppText>
            <View style={styles.item}>
              <AppText style={styles.txtBottom2}>
                {'Change your Lifestyle & Preferences'}
              </AppText>
              <CaretRight />
            </View> */}
        <AppButton
          customStyleButton={styles.button}
          title={'Save change'}
          size={'small'}
          iconRight={'tick'}
          onPress={handleSubmit}
        />
      </>
    );
  };

  const RenderForm = () => (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onSubmit}>
        {(props: any) => renderFormik(props)}
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
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  titlePrice: {
    fontSize: scaleSize(18),
    ...fontFamily.fontWeight500,
    marginLeft: 4,
  },
  formikContainer: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: scaleSize(24),
    ...fontFamily.fontCampWeight600,
    marginTop: SIZE.padding * 2,
    color: colors.primary,
  },
  title0: {
    fontSize: scaleSize(24),
    ...fontFamily.fontCampWeight600,
    color: colors.primary,
  },
  valueModal: {
    fontSize: scaleSize(18),
    ...fontFamily.fontWeight500,
  },
  placeHolder: {
    fontSize: scaleSize(18),
    ...fontFamily.fontWeight500,
    color: colors.textSecondPrimary,
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
  button: {
    marginTop: SIZE.big_space,
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
    alignItems: 'center',
    marginBottom: SIZE.padding,
  },
  // txtBottom1: {
  //   ...fontFamily.fontWeight400,
  //   fontSize: scaleSize(16),
  //   color: colors.textPlace,
  //   lineHeight: scaleSize(25),
  //   marginTop: scaleWidth(48),
  //   marginBottom: SIZE.base_space,
  // },
  // txtBottom2: {
  //   ...fontFamily.fontWeight600,
  //   fontSize: scaleSize(16),
  //   color: colors.primary,
  //   flex: 1,
  // },
});

export { SearchingFilter };
