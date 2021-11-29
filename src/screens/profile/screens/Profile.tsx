import {AppText} from '@component';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  Pressable,
  DeviceEventEmitter,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getProfileUser, logoutApp, updateUserInfo} from '@redux';
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
  IconFilter,
} from '@assets';
import ImagePicker from 'react-native-image-crop-picker';
import {
  ACCOUNT_SETTING,
  BASIC_INFORMATION,
  PROFILE_LIFE_STYLE,
  SEARCHING_FILTER,
  YOUR_LISTING,
} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {
  colors,
  fontFamily,
  getBaseURL,
  OPTIONS_GALLERY,
  scaleHeight,
  scaleSize,
  scaleWidth,
  SIZE,
} from '@util';
import {StyleSheet} from 'react-native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {GlobalService, uploadFile} from '@services';
interface ProfileProp {}

interface screenNavigationProp {
  navigate: any;
}
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
  // {
  //   id: 5,
  //   title: 'Verify my account',
  //   icon: <IconShieldCheck />,
  // },
];

const DATA2 = [
  {
    id: 1,
    title: 'Basic Infomation',
    icon: <IconUser />,
    screen: BASIC_INFORMATION,
  },
  {
    id: 2,
    title: 'Lifestyle & Preferences',
    icon: <IconThumbsUp />,
    screen: PROFILE_LIFE_STYLE,
  },
  {
    id: 3,
    title: 'Searching Filter',
    icon: <IconFilter />,
    screen: SEARCHING_FILTER,
  },
  {
    id: 4,
    title: 'Account Setting',
    icon: <IconSetting />,
    screen: ACCOUNT_SETTING,
  },
  // {
  //   id: 5,
  //   title: 'Verify my account',
  //   icon: <IconShieldCheck />,
  // },
];

const Profile = (props: ProfileProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const USER = useSelector((state: any) => state.auth.user);
  const TYPE_USER = useSelector((state: any) => state.auth.typeUser);
  console.log('TYPE', TYPE_USER);
  console.log('INFO', USER);
  const dispatch = useDispatch();
  const {showActionSheetWithOptions} = useActionSheet();

  useEffect(() => {
    DeviceEventEmitter.addListener('UNAUTHENTICATION', logOut);
    getProfile();
    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  const logOut = () => {
    dispatch(logoutApp());
  };

  const getProfile = () => {
    dispatch(getProfileUser());
  };

  const openGallery = () => {
    const options = OPTIONS_GALLERY.optionPhotos;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        // Do something here depending on the button index selected
        console.log({buttonIndex});
        if (buttonIndex === 0) {
          uploadPhotos();
        } else if (buttonIndex === 1) {
          takePhoto();
        }
      },
    );
  };

  const uploadPhotos = () => {
    ImagePicker.openPicker({
      compressImageMaxHeight: 1200,
      compressImageMaxWidth: 1200,
      cropping: true,
    }).then((image: any) => {
      getUrlFile(image);
    });
  };

  const takePhoto = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: 'photo',
      ompressImageMaxHeight: 1200,
      compressImageMaxWidth: 1200,
    }).then((image: any) => {
      getUrlFile(image);
    });
  };

  const getUrlFile = async (image: any) => {
    GlobalService.showLoading();
    const result = await uploadFile(image);
    const base_url = getBaseURL();
    if (result.imagePath) {
      const url: string = base_url + '/v1/file' + result?.imagePath;
      const body = {
        image: url,
      };
      dispatch(updateUserInfo({body, id: USER?.id}));
    }
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
  console.log({USER});
  const ListHeaderComponent = () => (
    <>
      <Pressable onPress={openGallery}>
        <Image
          source={USER?.image ? {uri: USER?.image} : avatar_default}
          style={styles.avatar}
        />
      </Pressable>
      <View style={styles.infomation}>
        <AppText style={styles.name}>{USER?.name || ''}</AppText>
        <AppText style={styles.email}>{USER?.email || ''}</AppText>
        <AppText style={styles.email}>{USER?.contact || ''}</AppText>
      </View>
      <View style={styles.borderTopList} />
    </>
  );

  const ListFooterComponent = () => (
    <>
      <Pressable style={styles.logOut} onPress={logOut}>
        <IconLogOut />
        <AppText style={styles.logOutTxt}>{'  Log out'}</AppText>
      </Pressable>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.body}
        contentContainerStyle={{paddingBottom: scaleHeight(100)}}
        showsVerticalScrollIndicator={false}
        data={TYPE_USER === 'Tenant' ? DATA2 : DATA}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F8',
  },
  body: {
    paddingTop: scaleWidth(70),
    paddingHorizontal: scaleWidth(24),
    flex: 1,
  },

  avatar: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: 16,
    alignSelf: 'center',
  },
  name: {
    ...fontFamily.fontCampWeight600,
    fontSize: scaleSize(20),
    marginBottom: scaleWidth(12),
    marginTop: SIZE.base_space,
  },
  email: {
    fontSize: scaleSize(14),
    color: colors.textThirdPrimary,
    marginBottom: scaleWidth(12),
  },
  infomation: {
    alignItems: 'center',
    marginVertical: SIZE.base_space / 2,
  },
  txtStyle: {
    ...fontFamily.fontWeight400,
    fontSize: SIZE.base_size,
    color: colors.textPrimary,
  },
  title: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.textFouthPrimary,
    marginLeft: scaleWidth(20),
    flex: 1,
  },

  borderBottom: {
    height: 1,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
    marginTop: scaleWidth(25),
  },
  titleBold: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.primary,
    marginLeft: scaleWidth(20),
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderProfileList,
    paddingVertical: scaleWidth(20),
  },
  borderTopList: {
    height: 1,
    backgroundColor: colors.borderProfileList,
  },
  logOutTxt: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(15),
    color: colors.textSecondPrimary,
    marginLeft: 8,
  },
  logOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZE.big_space,
    marginBottom: SIZE.medium_space,
  },
});

export {Profile};
