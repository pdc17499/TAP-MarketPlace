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
  AGENT_INFORMATION,
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
    notRole: 'Tenant',
  },
  {
    id: 2,
    title: 'Basic Infomation',
    icon: <IconUser />,
    screen: BASIC_INFORMATION,
    notRole: 'Agent',
  },
  {
    id: 3,
    title: 'Agent Infomation',
    icon: <IconUser />,
    screen: AGENT_INFORMATION,
    notRole: 'Tenant, Homeowner',
  },
  {
    id: 4,
    title: 'Lifestyle & Preferences',
    icon: <IconThumbsUp />,
    screen: PROFILE_LIFE_STYLE,
    notRole: 'Agent',
  },
  {
    id: 5,
    title: 'Searching Filter',
    icon: <IconFilter iconFillColor={colors.textFouthPrimary} />,
    screen: SEARCHING_FILTER,
    notRole: 'Agent, Homeowner',
  },
  {
    id: 6,
    title: 'Account Setting',
    icon: <IconSetting />,
    screen: ACCOUNT_SETTING,
    notRole: '',
  },
];

const Profile = (props: ProfileProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const USER = useSelector((state: any) => state.auth.user);
  const role = useSelector((state: any) => state.auth.role);
  const dispatch = useDispatch();
  const {showActionSheetWithOptions} = useActionSheet();
  const [message, setMessage] = useState(0);

  useEffect(() => {
    DeviceEventEmitter.addListener('UNAUTHENTICATION', logOut);
    getProfile();
    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  const logOut = () => {
    dispatch(logoutApp());
  };

  const checkMessage = () => {
    let num = 0;
    if (USER?.ethnicity === null) num = num + 1;
    if (USER?.ageGroup === null) num = num + 1;
    if (USER?.occupation === null) num = num + 1;
    if (USER?.nationality === null) num = num + 1;
    if (USER?.gender === null) num = num + 1;
    return num;
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

  const renderItem = ({item}: any) => {
    const idType = role?.idType || '';
    if (item.notRole.includes(idType)) {
      return <View />;
    }

    return (
      <Pressable onPress={() => moveToDetail(item)}>
        <View style={styles.item}>
          {item.icon}
          <AppText style={styles.title}>{item.title}</AppText>
          {item.id === 2 && checkMessage() > 0 ? (
            <View style={styles.circle}>
              <AppText style={styles.messTxt}>
                {checkMessage().toString()}
              </AppText>
            </View>
          ) : null}
          <CaretRight />
        </View>
      </Pressable>
    );
  };

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
        data={DATA}
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
  circle: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(10),
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: scaleWidth(160),
  },
  messTxt: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: scaleSize(13),
  },
});

export {Profile};
