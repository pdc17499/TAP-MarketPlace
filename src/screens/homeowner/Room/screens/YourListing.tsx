import {AppButton, AppText, Header} from '@component';
import React, {useEffect} from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  SectionList,
} from 'react-native';
import {
  IconDot,
  IconEyeCloseFullFill,
  IconPickLocation,
  IconTabActive,
  room_sample,
} from '@assets';
import {colors, fontFamily, scaleSize, scaleWidth, SIZE, STYLE} from '@util';
import {SceneMap, TabView} from 'react-native-tab-view';
import {ImageServerProps, ListingRoomProps, ListRooms} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {ROOM_DETAIL, ROOM_UNIT_ADDRESS} from '@routeName';
import {useDispatch, useSelector} from 'react-redux';
import {getListRooms, resetDataSignup} from '@redux';

interface itemProps {
  item: ListRooms;
  index: number;
  section: any;
}

const Route = React.memo(({props}: any) => {
  const rooms: [] = useSelector((state: any) => state?.rooms?.listRooms);
  const data1 = rooms.filter((item: any) => item?.isActive === true);
  const data2 = rooms.filter((item: any) => item?.isActive === false);

  const DATA1 = [
    {
      key: 'active',
      data: data1,
    },
    {
      key: 'inactive',
      data: data2,
    },
  ];

  const key = props;
  const navigation: any = useNavigation();

  const onRoomDetail = (id: number) => {
    navigation.navigate(ROOM_DETAIL, {id: id});
  };

  const renderItem = ({item, section}: itemProps) => {
    const {isActive} = item;
    const hide =
      (key === 'active' && !isActive) || (key === 'inactive' && isActive);
    if (hide) {
      return <View />;
    }
    let firstImage: any = item?.PicturesVideo[0];
    if (typeof firstImage === 'string') {
      firstImage = JSON.parse(firstImage);
    }

    console.log({firstImage});

    return (
      <Pressable
        onPress={() => onRoomDetail(item.id)}
        style={{
          marginBottom: SIZE.medium_space,
          opacity: isActive ? 1 : 0.5,
        }}>
        {item?.PicturesVideo ? (
          <Image source={{uri: firstImage.imagePath}} style={styles.bgRoom} />
        ) : (
          <Image source={room_sample} style={styles.bgRoom} />
        )}
        <AppText style={styles.roomTitle}>
          {item?.PlaceType + '  '}
          <IconDot style={{marginBottom: 4}} />
          <AppText style={styles.roomTitle}>
            {'  ' + item?.RoomDetails?.RoomType}
          </AppText>
        </AppText>
        {!isActive && (
          <View style={styles.subViewInactive}>
            <IconEyeCloseFullFill />
            <AppText style={styles.textInactive}>{'Inactive'}</AppText>
          </View>
        )}
        <View style={styles.locationView}>
          <IconPickLocation iconFillColor={'black'} width={16} height={16} />
          <AppText numberOfLines={3} style={styles.location}>
            {item?.RentalAddress}
          </AppText>
        </View>
      </Pressable>
    );
  };

  const renderSectionHeader = (keySection: string) => {
    if (keySection == 'inactive' && key === 'all') {
      return <View style={styles.line} />;
    }
    return <View />;
  };

  return (
    <>
      <SectionList
        style={{
          paddingTop: SIZE.base_space,
        }}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        sections={DATA1}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({section: {key}}) => renderSectionHeader(key)}
      />
    </>
  );
});

const renderScene = ({route}: any) => {
  switch (route.key) {
    case 'active':
      return <Route props={'active'} />;
    case 'inactive':
      return <Route props={'inactive'} />;
    case 'all':
      return <Route props={'all'} />;
    default:
      return null;
  }
};

const YourListing = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  // const room: [] = useSelector((state: any) => state?.rooms?.listRooms);
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    dispatch(getListRooms());
  }, []);

  const [routes] = React.useState([
    {key: 'all', title: 'All'},
    {key: 'active', title: 'Active'},
    {key: 'inactive', title: 'Inactive'},
  ]);
  const layout = useWindowDimensions();

  const moveToRoomUnit = () => {
    dispatch(resetDataSignup());
    navigation.navigate(ROOM_UNIT_ADDRESS);
  };

  const renderTabBar = (props: any) => {
    const {navigationState, jumpTo} = props;
    const {routes, index} = navigationState;

    return (
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
    );
  };

  return (
    <View style={styles.container}>
      <Header back customContainer={styles.customContainer} />
      <AppText style={styles.heading}>{'Your Listing'}</AppText>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        sceneContainerStyle={{paddingHorizontal: SIZE.padding}}
        renderTabBar={renderTabBar}
      />
      <AppButton
        title={'Add New Place'}
        size={'small'}
        containerStyle={styles.button}
        iconRight={'plus'}
        onPress={() => moveToRoomUnit()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: SIZE.padding,
    right: SIZE.padding,
    bottom: SIZE.medium_space,
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
  heading: {
    ...fontFamily.fontCampWeight500,
    fontSize: SIZE.medium_size,
    lineHeight: scaleSize(28),
    paddingLeft: SIZE.padding,
    marginTop: SIZE.base_space,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabView: {
    paddingVertical: scaleWidth(35),
    paddingBottom: scaleWidth(20),
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
    marginBottom: SIZE.padding,
  },
  roomTitle: {
    ...fontFamily.fontCampWeight500,
    fontSize: scaleSize(18),
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: colors.borderPrimary,
    marginBottom: SIZE.medium_space,
  },
});

export {YourListing};
