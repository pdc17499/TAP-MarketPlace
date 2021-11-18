import {AppButton, AppText, Header} from '@component';
import React, {useState} from 'react';
import {View, Image, FlatList, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import {
  INITIAL_STATE_AUTH,
  INITIAL_STATE_DATA_SIGN_UP,
  logoutApp,
} from '@redux';
import {useSelector} from 'react-redux';
import {
  IconHouseLine,
  IconUser,
  IconThumbsUp,
  IconSetting,
  CaretRight,
  IconShieldCheck,
  IconLogOut,
  avatar_default,
} from '@assets';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {NavigationUtils} from '@navigation';
import {
  ACCOUNT_SETTING,
  BASIC_INFORMATION,
  PROFILE_LIFE_STYLE,
  YOUR_LISTING,
} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {Screen} from 'react-native-screens';

interface ProfileProp {}

interface screenNavigationProp {
  navigate: any;
}

const Profile = (props: ProfileProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const USER = useSelector((state: any) => state.auth.user);
  // const USER = INITIAL_STATE_DATA_SIGN_UP
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
      screen: BASIC_INFORMATION,
    },
    {
      id: 3,
      title: 'Lifestyle & Preferences',
      icon: <IconThumbsUp />,
      screen: PROFILE_LIFE_STYLE,
    },
    {
      id: 4,
      title: 'Account Setting',
      icon: <IconSetting />,
      screen: ACCOUNT_SETTING,
    },
    {
      id: 5,
      title: 'Verify my account',
      icon: <IconShieldCheck />,
    },
  ];
  const [filePath, setFilePath] = useState();

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logoutApp());
  };

  const openGallery = (callback: (arg0: ImageOrVideo) => void) => {
    ImagePicker.openPicker({
      width: 1024,
      height: 1024,
      cropping: true,
    }).then((image: any) => {
      if (typeof callback === 'function') {
        callback(image);
        console.log(image);
      }
      setFilePath(image.path);
      console.log(image);
    });
  };

  const moveToDetail = (item: any) => {
    if (item?.screen) {
      navigation.navigate(item?.screen);
    }
  };

  const renderItem = ({item}: any) => (
    <Pressable onPress={() => moveToDetail(item)}>
      <View style={styles.item}>
        {item.icon}
        <AppText style={item.id === 5 ? styles.titleBold : styles.title}>
          {item.title}
        </AppText>
        {item.id !== 5 && <CaretRight />}
      </View>
    </Pressable>
  );

  const ListHeaderComponent = () => (
    <View>
      <Header />
      <Pressable onPress={() => openGallery(callback())}>
        <Image
          source={filePath ? {uri: filePath} : avatar_default}
          style={styles.avatar}></Image>
      </Pressable>
      <View style={styles.infomation}>
        <AppText style={styles.name}>{USER?.name || ''}</AppText>
        <AppText style={styles.email}>{USER?.email || ''}</AppText>
        <AppText style={styles.email}>{USER?.contact || ''}</AppText>
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
};

export {Profile};
function callback(): (arg0: ImageOrVideo) => void {
  throw new Error('Function not implemented.');
}
