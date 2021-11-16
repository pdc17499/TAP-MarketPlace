import {AppButton, AppText, Header} from '@component';
import React from 'react';
import {View, Image, FlatList, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import {logoutApp} from '@redux';
import {useSelector} from 'react-redux';
import {
  IconHouseLine,
  IconUser,
  IconThumbsUp,
  IconSetting,
  CaretRight,
  IconShieldCheck,
  IconLogOut,
  null_avatar,
} from '@assets';
import {useNavigation} from '@react-navigation/core';
import {YOUR_LISTING} from '@routeName';

interface ProfileProp {}

interface screenNavigationProp {
  navigate: any;
}

const Profile = React.memo((props: ProfileProp) => {
  const USER = useSelector((state: any) => state.auth.user);
  const navigation: any = useNavigation();
  console.log('INFO', USER);
  const DATA = [
    {
      id: 1,
      title: 'Your Listing',
      icon: <IconHouseLine />,
      screen: YOUR_LISTING,
    },
    {
      id: 2,
      title: 'Basic Infomation',
      icon: <IconUser />,
    },
    {
      id: 3,
      title: 'Lifestyle & Preferences',
      icon: <IconThumbsUp />,
    },
    {
      id: 4,
      title: 'Account Setting',
      icon: <IconSetting />,
    },
    {
      id: 5,
      title: 'Verify my account',
      icon: <IconShieldCheck />,
    },
  ];
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logoutApp());
  };

  const onYourListing = (item: any) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const renderItem = ({item}: any) => (
    <Pressable style={styles.item} onPress={() => onYourListing(item)}>
      {item.icon}
      <AppText style={item.id === 5 ? styles.titleBold : styles.title}>
        {item.title}
      </AppText>
      {item.id !== 5 && <CaretRight />}
    </Pressable>
  );

  const ListHeaderComponent = () => (
    <View>
      <Header />
      <Image source={null_avatar} style={styles.avatar}></Image>
      <View style={styles.infomation}>
        <AppText style={styles.name}>{USER?.name}</AppText>
        <AppText style={styles.email}>{USER?.email}</AppText>
        <AppText style={styles.email}>{'(704) 555-0127'}</AppText>
      </View>
      <View style={styles.borderTopList} />
    </View>
  );

  const ListFooterComponent = () => (
    <>
      <Pressable style={styles.logOut} onPress={logOut}>
        <IconLogOut />
        <AppText style={styles.logOutTxt}>{'Log out'}</AppText>
      </Pressable>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.body}
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
});

export {Profile};
