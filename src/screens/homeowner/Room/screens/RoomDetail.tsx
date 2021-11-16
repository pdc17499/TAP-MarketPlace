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
  IconDola,
  IconEyeCloseFullFill,
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
import {SceneMap, TabView} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/core';
import {Formik} from 'formik';
import {ROOM_UNIT_HOWNER} from '@mocks';
import * as yup from 'yup';
import {Switch} from 'react-native-switch';

const Route = ({props}: any) => {
  const key = props;
  const navigation: any = useNavigation();
  const [room, setRoom] = useState({
    location: '',
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
    name: yup.string(),
    country: validateForm().common.selectAtLeast,
    occupation: validateForm().common.atLeastOnePicker,
    ethnicity: validateForm().common.atLeastOnePicker,
    gender: validateForm().common.atLeastOnePicker,
    ageGroup: validateForm().common.atLeastOnePicker,
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

  const renderPriceTitle = (values: any) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <IconDola width={10} height={15} iconFillColor={colors.secondPrimary} />
        <AppText
          style={{
            fontSize: SIZE.base_space + 1,
            ...fontFamily.fontWeight500,
          }}>{` ${values.min_range_price}`}</AppText>
        <AppText>{` - `}</AppText>
        <IconDola width={10} height={15} iconFillColor={colors.secondPrimary} />
        <AppText
          style={{
            fontSize: SIZE.base_space + 1,
            ...fontFamily.fontWeight500,
          }}>{` ${values.max_range_price} `}</AppText>
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
              {/* <View style={styles.line} />
              <View>
                <AppText>{'Active/Inactive property'}</AppText>
                <IconEyeCloseFullFill />
              </View>
              <View style={styles.line} /> */}
            </View>
            <AppButton
              containerStyle={styles.button}
              title={'Save change'}
              size={'small'}
              iconRight={'tick'}
              onPress={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const RoomDetail = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'general', title: 'General'},
    {key: 'detail', title: 'Room/Unit Details'},
  ]);
  const layout = useWindowDimensions();

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'general':
        return <Route props={'general'} />;
      case 'detail':
        return <Route props={'detail'} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => {
    const {navigationState, jumpTo} = props;
    const {routes, index} = navigationState;

    return (
      <>
        <View style={styles.tabContainer}>
          {routes.map((item: any, idx: number) => {
            const {title, key} = item;
            const isActive = index === idx;
            const tabTitle = isActive ? styles.tabTitleActive : styles.tabTitle;
            return (
              <Pressable
                hitSlop={STYLE.hitSlop}
                key={key}
                onPress={() => jumpTo(key)}
                style={styles.tabView}>
                <AppText style={tabTitle}>{title}</AppText>
                {isActive && <IconTabActive />}
              </Pressable>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header back customContainer={styles.customContainer} />
      <View style={styles.main}>
        <Image source={room_sample} style={styles.bgRoom} />
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingTop: SIZE.base_space,
    paddingBottom: SIZE.medium_space,
  },
  main: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgSreen,
  },
  customContainer: {
    backgroundColor: colors.bgSreen,
  },
  contentContainerStyle: {
    paddingBottom: SIZE.big_space + SIZE.padding,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabView: {
    paddingVertical: scaleWidth(35),
    alignItems: 'center',
  },
  tabTitle: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
    marginBottom: 6,
  },
  tabTitleActive: {
    ...fontFamily.fontCampWeight600,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  bgRoom: {
    width: '100%',
    height: scaleWidth(137),
    borderRadius: 8,
    resizeMode: 'cover',
  },
  roomTitle: {
    ...fontFamily.fontCampWeight500,
    fontSize: scaleSize(18),
  },
  locationView: {
    flexDirection: 'row',
    marginTop: SIZE.base_space / 2,
  },
  location: {
    color: '#65666D',
    ...fontFamily.fontWeight500,
    marginLeft: SIZE.base_space / 2,
  },
  subViewInactive: {
    position: 'absolute',
    left: 8,
    top: 8,
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: SIZE.base_space / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInactive: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
    marginLeft: SIZE.base_space / 2,
  },
  line: {
    height: 1,
    backgroundColor: colors.borderProfileList,
    // marginBottom: SIZE.base_space,
  },
});

export {RoomDetail};
