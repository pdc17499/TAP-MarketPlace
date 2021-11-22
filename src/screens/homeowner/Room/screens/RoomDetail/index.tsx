import { AppText, Header } from '@component';
import React, { useEffect } from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { IconTabActive, room_sample } from '@assets';
import { colors, fontFamily, scaleSize, scaleWidth, SIZE, STYLE } from '@util';
import { TabView } from 'react-native-tab-view';
import { RoomDetailGeneral } from './RoomDetailGeneral';
import { RoomDetailUnit } from './RoomDetailUnit';
import { useDispatch } from 'react-redux';
import { getRoomDetail } from '@redux';

const RoomDetail = (route: any) => {
  console.log('paa', route.route.params.id);
  const roomId = route.route.params.id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoomDetail(roomId))
  }, [])

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'general', title: 'General' },
    { key: 'detail', title: 'Room/Unit Details' },
  ]);
  const layout = useWindowDimensions();

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'general':
        return <RoomDetailGeneral props={'general'} />;
      case 'detail':
        return <RoomDetailUnit props={'detail'} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => {
    const { navigationState, jumpTo } = props;
    const { routes, index } = navigationState;

    return (
      <>
        <View style={styles.tabContainer}>
          {routes.map((item: any, idx: number) => {
            const { title, key } = item;
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
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export { RoomDetail };
