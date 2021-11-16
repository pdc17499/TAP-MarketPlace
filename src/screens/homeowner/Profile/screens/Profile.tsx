import { AppButton, AppText, Header } from '@component';
import React, { useState } from 'react';
import { View, Image, FlatList, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import { INITIAL_STATE_AUTH, INITIAL_STATE_DATA_SIGN_UP, logoutApp } from '@redux';
import { useSelector } from 'react-redux'
import { IconHouseLine, IconUser, IconThumbsUp, IconSetting, CaretRight, IconShieldCheck, IconLogOut, null_avatar } from '@assets';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { NavigationUtils } from '@navigation';
import { BASIC_INFORMATION, HOME_OWNER_LIFE_STYLE } from '@routeName';
import { useNavigation } from '@react-navigation/native';

interface ProfileProp { }

interface screenNavigationProp {
  navigate: any;
}

const Profile = ((props: ProfileProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const USER = useSelector((state: any) => state.auth.user);
  // const USER = INITIAL_STATE_DATA_SIGN_UP
  console.log('INFO', USER)
  const DATA = [
    {
      id: 1,
      title: 'Your Listing',
      icon: <IconHouseLine />
    },
    {
      id: 2,
      title: 'Basic Infomation',
      icon: <IconUser />
    },
    {
      id: 3,
      title: 'Lifestyle & Preferences',
      icon: <IconThumbsUp />
    },
    {
      id: 4,
      title: 'Account Setting',
      icon: <IconSetting />
    },
    {
      id: 5,
      title: 'Verify my account',
      icon: <IconShieldCheck />
    },
  ]
  const [filePath, setFilePath] = useState();

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logoutApp())
  }

  const openGallery = (callback: (arg0: ImageOrVideo) => void) => {
    ImagePicker.openPicker({
      width: 1024,
      height: 1024,
      cropping: true
    }).then((image: any) => {
      if (typeof callback === 'function') {
        callback(image)
        console.log(image);
      }
      setFilePath(image.path)
      console.log(image);
    })
  }

  const moveToDetail = (title: string) => {
    switch (title) {
      case 'Basic Infomation':
        navigation.navigate(BASIC_INFORMATION)
        break;
      case 'Lifestyle & Preferences':
        navigation.navigate(HOME_OWNER_LIFE_STYLE)
        break;
      default:
        break;
    }
  }

  const renderItem = ({ item }: any) => (
    <Pressable onPress={() => moveToDetail(item.title)}>
      <View style={styles.item}>
        {item.icon}
        <AppText style={item.id === 5 ? styles.titleBold : styles.title}>{item.title}</AppText>
        {
          item.id !== 5 && (
            <CaretRight />
          )
        }
      </View>
    </Pressable>
  )

  const ListHeaderComponent = () => (
    <View>
      <Header />
      <Pressable onPress={() => openGallery(callback())}>
        <Image source={filePath ? { uri: filePath } : null_avatar}
          style={styles.avatar}>
        </Image>
      </Pressable>
      <View style={styles.infomation}>
        <AppText style={styles.name}>{USER.name ? USER.name : 'Harry Porter'}</AppText>
        <AppText style={styles.email}>{USER.email ? USER.email : 'harry01@gmail.com'}</AppText>
        <AppText style={styles.email}>{USER.contact ? USER.contact : null}</AppText>
      </View>
      <View style={styles.borderTopList} />
    </View >
  )

  const ListFooterComponent = () => (
    <>
      <Pressable style={styles.logOut} onPress={logOut}>
        <IconLogOut />
        <AppText style={styles.logOutTxt}>{'Log out'}</AppText>
      </Pressable>
    </>
  )

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

export { Profile };
function callback(): (arg0: ImageOrVideo) => void {
  throw new Error('Function not implemented.');
}

