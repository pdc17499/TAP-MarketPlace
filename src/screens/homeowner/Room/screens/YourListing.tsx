import {AppButton, AppText, Header} from '@component';
import React from 'react';
import {
  View,
  Image,
  FlatList,
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
import {ListingRoomProps} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {ROOM_DETAIL} from '@routeName';

const DATA = [
  {
    key: 'active',
    data: [
      {
        id: 1,
        type: 'Condo',
        title: 'Entire Home',
        image: room_sample,
        location: '12 Kallang Avenue',
        active: true,
      },
      {
        id: 2,
        type: 'HDB',
        title: 'Room',
        image: room_sample,
        location: '69 Robinson Rd',
        active: true,
      },
      {
        id: 3,
        type: 'Shophouse',
        title: 'Entire Home',
        image: room_sample,
        location: '47 Jln Pemimpin',
        active: true,
      },
    ],
  },
  {
    key: 'inactive',
    data: [
      {
        id: 4,
        type: 'Shophouse',
        title: 'Entire Home',
        image: room_sample,
        location: '12 Kallang Avenue',
        active: false,
      },
      {
        id: 5,
        type: 'Landed',
        title: 'Entire Home',
        image: room_sample,
        location: '12 Kallang Avenue',
        active: false,
      },
    ],
  },
];

interface itemProps {
  item: ListingRoomProps;
  index: number;
  section: any;
}

const Route = React.memo(({props}: any) => {
  const key = props;
  const navigation: any = useNavigation();

  const onRoomDetail = () => {
    navigation.navigate(ROOM_DETAIL);
  };

  const renderItem = ({item, section}: itemProps) => {
    const {active} = item;
    const hide =
      (key === 'active' && !active) || (key === 'inactive' && active);
    if (hide) {
      return <View />;
    }

    return (
      <Pressable
        onPress={onRoomDetail}
        style={{
          marginBottom: SIZE.medium_space,
          opacity: active ? 1 : 0.5,
        }}>
        <Image source={item.image} style={styles.bgRoom} />
        <AppText style={styles.roomTitle}>
          {item.type + '  '}
          <IconDot style={{marginBottom: 4}} />
          <AppText style={styles.roomTitle}>{'  ' + item.title}</AppText>
        </AppText>
        {!active && (
          <View style={styles.subViewInactive}>
            <IconEyeCloseFullFill />
            <AppText style={styles.textInactive}>{'Inactive'}</AppText>
          </View>
        )}
        <View style={styles.locationView}>
          <IconPickLocation iconFillColor={'black'} width={16} height={16} />
          <AppText style={styles.location}>{item.location}</AppText>
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
        sections={DATA}
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
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'all', title: 'All'},
    {key: 'active', title: 'Active'},
    {key: 'inactive', title: 'Inactive'},
  ]);
  const layout = useWindowDimensions();

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
