import { AppText, Header } from '@component';
import React, { useEffect, useMemo } from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { IconTabActive, room_sample } from '@assets';
import { colors, fontFamily, scaleSize, scaleWidth, SIZE, STYLE } from '@util';
import { SceneMap, TabView } from 'react-native-tab-view';
import { RoomDetailGeneral } from './RoomDetailGeneral';
import { RoomDetailUnit } from './RoomDetailUnit';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomDetail } from '@redux';
import Video from 'react-native-video';
import { ImageServerProps } from '@interfaces';
import { RoomDetailHomeowner } from '@screens';

const RoomDetail = (route: any) => {
  console.log('paa', route);
  const roomId = route.route.params.id;
  const dispatch = useDispatch();
  const ROOM: any = useSelector((state: any) => state?.rooms?.roomDetail);
  const typeUser: any = useSelector((state: any) => state?.auth?.typeUser);
  const isAgent = typeUser === 'Agent'
  const [routes] = React.useState([
    { key: 'general', title: 'General' },
    { key: 'detail', title: isAgent ? 'Details' : 'Room/Unit Details' },
    // isAgent ? { key: 'homeowner', title: 'Homeowner' } : null
  ]);

  useEffect(() => {
    isAgent ? routes.push({ key: 'homeowner', title: 'Homeowner' }) : null
    dispatch(getRoomDetail(roomId));
  }, []);

  const [index, setIndex] = React.useState(0);

  const layout = useWindowDimensions();

  // const checkVideo = (file: any) => {
  //   return
  // };

  // const renderScene = useMemo(
  //   ({route}: any) => {
  //     // first: () => renderLifeStyle(list.life_style, 'lifestyle'),
  //     // second: () => renderLifeStyle(list.preferences, 'preferences'),
  //     switch (route.key) {
  //       case 'general':
  //         return <RoomDetailGeneral props={'general'} />;
  //       case 'detail':
  //         return <RoomDetailUnit props={'detail'} />;
  //       default:
  //         return <View />;
  //     }
  //   },
  //   [ROOM],
  // );

  const renderScene = SceneMap({
    general: () => <RoomDetailGeneral props={'general'} />,
    detail: () => <RoomDetailUnit props={'detail'} />,
    homeowner: () => <RoomDetailHomeowner props={'homeowner'} />
  });

  const renderImage = (file: ImageServerProps) => {
    const isPhoto = file?.format?.includes('images');
    // console.log('typleFuile', file);
    const uri = file?.imagePath;
    return (
      <>
        {isPhoto ? (
          <Image source={{ uri }} style={styles.itemImage} />
        ) : (
          <>
            <Video
              source={{ uri }}
              style={styles.itemImage}
              resizeMode={'cover'}
            />
          </>
        )}
      </>
    );
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

  let firstImage: any = ROOM?.PicturesVideo[0];
  // console.log(ROOM);
  if (firstImage && typeof firstImage === 'string') {
    firstImage = JSON.parse(firstImage);
  }

  return (
    <View style={styles.container}>
      <Header back customContainer={styles.customContainer} />
      <View style={styles.main}>
        {firstImage ? (
          renderImage(firstImage)
        ) : (
          <Image source={room_sample} style={styles.itemImage} />
        )}
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
  itemImage: {
    width: scaleWidth(327),
    height: scaleWidth(130),
    borderRadius: 8,
  },
  viewProfile: {
    position: 'absolute',
    top: -scaleWidth(44),
    left: -SIZE.padding / 2,
    right: -SIZE.padding / 2,
    bottom: -SIZE.padding / 2,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.google,
  },
  profilePhoto: {
    fontSize: SIZE.small_size,
    marginTop: SIZE.base_space,
    color: colors.textThirdPrimary,
    ...fontFamily.fontWeight500,
  },
});

export { RoomDetail };
