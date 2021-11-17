import {
  AppButton,
  AppModal,
  AppPicker,
  AppSlider,
  AppText,
  Header,
} from '@component';
import React, {useState} from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
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
import {useNavigation} from '@react-navigation/core';
import {Formik} from 'formik';
import {ROOM_UNIT_HOWNER} from '@mocks';
import * as yup from 'yup';
import {ROOM_DETAIL_LOCATION} from '@routeName';
import ToggleSwitch from 'toggle-switch-react-native';

const RoomDetailGeneral = ({props}: any) => {
  const key = props;
  const navigation: any = useNavigation();
  const [room, setRoom] = useState({
    location: 'Singapore',
    kind_place: 'Condo',
    lease_period: '3 months',
    min_range_price: 10000,
    max_range_price: 20000,
    staying_with_guests: 'Yes',
    room_active: false,
  });

  const list = ROOM_UNIT_HOWNER;

  const formInitialValues = {
    location: room.location,
    kind_place: room.kind_place,
    lease_period: room.lease_period,
    min_range_price: room.min_range_price,
    max_range_price: room.max_range_price,
    staying_with_guests: room.staying_with_guests,
    room_active: room.room_active,
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
    const nRoom: any = {...room};
    if (name) {
      nRoom[name] = value;
      setRoom(nRoom);
      console.log({value});
    }
  };

  const onSubmit = (values: any) => {};

  const onValuesChangeFinish = (values: any) => {
    console.log({values});
    const nRoom: any = {...room};
    nRoom['min_range_price'] = values[0];
    nRoom['max_range_price'] = values[1];
    setRoom(nRoom);
  };

  const onLocation = (locate: string) => {
    navigation.navigate(ROOM_DETAIL_LOCATION, {locate, onChangeText});
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

  return (
    <>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: SIZE.big_space + SIZE.padding}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.line} />
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationForm}
          validateOnChange={false}
          enableReinitialize
          onSubmit={onSubmit}>
          {(props: any) => (
            <>
              <View>
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
                  items={list.kind_place}
                  error={props.errors.kind_place}
                  stylePicker={'linear'}
                />
                <AppPicker
                  value={props.values.lease_period}
                  name={'lease_period'}
                  label={'Lease period'}
                  onValueChange={onChangeText}
                  items={
                    props.values.kind_place === 'HDB'
                      ? list.lease_your_place_hdb
                      : list.lease_your_place
                  }
                  error={props.errors.lease_period}
                  stylePicker={'linear'}
                />
                <AppModal
                  label={'Rental price'}
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
                <AppPicker
                  value={props.values.staying_with_guests}
                  name={'staying_with_guests'}
                  label={'Stay with guests'}
                  onValueChange={onChangeText}
                  items={list.staying_width_guests}
                  error={props.errors.staying_with_guests}
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
                  {!props.values.room_active ? (
                    <IconEyeCloseFullFill />
                  ) : (
                    <IconEyeOpenFullFill />
                  )}

                  <View style={{marginLeft: 10, marginRight: 3}}>
                    <ToggleSwitch
                      isOn={props.values.room_active}
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
        onPress={props.handleSubmit}
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
});

export {RoomDetailGeneral};
