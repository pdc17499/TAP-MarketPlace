import { AppButton, AppText, Header } from '@component';
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
import { colors, fontFamily, scaleHeight, scaleSize, scaleWidth, SIZE, STYLE } from '@util';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { ListingRoomProps, ProfileLifeStyleProps } from '@interfaces';
import { useNavigation } from '@react-navigation/core';
import { ROOM_DETAIL, ROOM_UNIT_ADDRESS } from '@routeName';
import { QAHomeOwnerLifeStyle, QAHomeOwnerPreferences } from '@screens';


interface itemProps {
  item: ProfileLifeStyleProps;
  index: number;
  section: any;
}

const FirstRoute = () => (
  <QAHomeOwnerLifeStyle />
);

const SecondRoute = () => (
  <QAHomeOwnerPreferences />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});


const ProfileLifeStyle = () => {
  const layout = useWindowDimensions();
  const navigation: any = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Lifestyle' },
    { key: 'second', title: 'Preferences' },
  ]);

  const renderTabBar = (props: any) => {
    const { navigationState, jumpTo } = props;
    const { routes, index } = navigationState;

    return (
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
    );
  };


  return (
    <View style={styles.container}>
      <Header back></Header>
      <AppText style={styles.heading}>{'Lifestyle & Preferences'}</AppText>

      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 300 }}

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
    backgroundColor: colors.white,
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

export { ProfileLifeStyle };
