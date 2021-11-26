import {AppText} from '@component';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Chat, Liked, Matches, Profile} from '@screens';
import * as React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, fontFamily, scaleHeight, scaleSize, scaleWidth} from '@util';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {IconChat, IconLiked, IconMatches, IconProfile} from '@assets';

type routeType = {
  name: string;
  key: string;
};

interface typeProps {
  state: any;
  descriptors: any;
  navigation: any;
}
const CustomTab = (props: typeProps) => {
  const {state, descriptors, navigation} = props;

  const renderLable = (key: string) => {
    console.log('key', key);
    switch (key) {
      case 'Matches':
        return 'Matches';
      case 'Liked':
        return 'Liked';
      case 'Chat':
        return 'Chat';
      default:
        return 'Profile';
    }
  };

  const onPress = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.flexRow} key={state.key}>
      {state.routes.map((route: routeType, index: Number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const labelStyle = isFocused ? styles.labelActive : styles.label;

        let SourceName;
        switch (route.name) {
          case 'Matches':
            SourceName = IconMatches;
            break;
          case 'Liked':
            SourceName = IconLiked;
            break;
          case 'Chat':
            SourceName = IconChat;
            break;
          default:
            SourceName = IconProfile;
            break;
        }
        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            activeOpacity={0.85}
            onPress={() => onPress(route.name)}
            style={[styles.contain]}>
            <SourceName isActive={isFocused} />
            <AppText style={labelStyle}>{renderLable(route.name)}</AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTab {...props} />}>
      <Tab.Screen name="Matches" component={Matches} />
      <Tab.Screen name="Liked" component={Liked} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    borderTopColor: colors.borderProfileList,
    borderTopWidth: 1,
    backgroundColor: colors.white,
    ...ifIphoneX(
      {
        paddingTop: 10,
        height: scaleHeight(100),
        maxHeight: 100,
      },
      {
        paddingTop: 10,
        height: scaleHeight(95),
        maxHeight: 100,
      },
    ),
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    position: 'relative',
  },
  line: {
    height: 2,
    position: 'absolute',
    top: -1.5,
  },
  label: {
    color: colors.icTabbar,
    ...fontFamily.fontCampWeight500,
    fontSize: scaleSize(12),
    lineHeight: scaleSize(15),
    marginTop: 5,
  },
  labelActive: {
    color: colors.textPlace,
    ...fontFamily.fontCampWeight500,
    fontSize: scaleSize(12),
    lineHeight: scaleSize(15),
    marginTop: 5,
  },
});
