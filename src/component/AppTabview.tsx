import {IconTabActive} from '@assets';
import {AppText} from '@component';
import {colors, fontFamily, scaleWidth, SIZE, STYLE} from '@util';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {TabView} from 'react-native-tab-view';

interface AppTabviewProps {
  renderScene: any;
  routes: any;
}

const AppTabview = React.memo((props: AppTabviewProps) => {
  const {renderScene, routes} = props;
  const [index, setIndex] = React.useState(0);
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
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
});

const styles = StyleSheet.create({
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
});

export {AppTabview};
