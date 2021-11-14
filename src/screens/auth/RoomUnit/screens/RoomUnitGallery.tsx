import {AppButton, AppQA, AppText, Header} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {
  colors,
  FILE_SIZE,
  fontFamily,
  scaleHeight,
  scaleWidth,
  SIZE,
} from '@util';
import React, {createRef, useState} from 'react';
import {View, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import Video from 'react-native-video';
import {bg_room_unit_picture} from '@assets';
import {NavigationUtils} from '@navigation';
import {USER_INFORMATION_NAME} from '@routeName';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RoomUnitGallery = () => {
  const dispatch = useDispatch();
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };
  const files = dataSignUp.list_photo || [];
  // const [files, setFiles] = useState([]);
  const {showActionSheetWithOptions} = useActionSheet();
  const optionPhotos = ['Upload Photos', 'Take a photo', 'Cancel'];
  const optionVideos = ['Upload Video', 'Take a video', 'Cancel'];

  const uploadPhotos = (mediaType: any) => {
    const isPhoto = mediaType === 'photo';
    ImagePicker.openPicker({
      multiple: true,
      cropping: isPhoto,
      mediaType: mediaType,
      compressImageQuality: 0.6,
      compressVideoPreset: 0.6,
    }).then((images: any) => {
      // images.forEach((image: ImageOrVideo) => {
      //   if (image.size > FILE_SIZE.MAX_IMAGE) {
      //     image = ImagePicker.(image);
      //   }
      // });
      const nFiles: any = [...files, ...images];
      validateFile(nFiles);
    });
  };

  const takePhoto = (mediaType: any) => {
    ImagePicker.openCamera({
      cropping: mediaType === 'photo',
      mediaType,
      compressImageQuality: 0.6,
      compressVideoPreset: 0.6,
    }).then((image: any) => {
      const nFiles: any = [...files];
      nFiles.push(image);
      validateFile(nFiles);
      // setFiles(nFiles);
    });
  };

  console.log({files});

  const validateFile = (nFiles: any) => {
    const photos = nFiles.filter((file: ImageOrVideo) =>
      file.mime.includes('image'),
    );
    const videos = nFiles.filter(
      (file: ImageOrVideo) => !file.mime.includes('image'),
    );

    // console.log({nFiles, photos, videos});

    if (photos.length > 10) {
      Alert.alert('You can only upload up to 10 photos');
    } else if (videos.length > 1) {
      Alert.alert('You can only upload up to 1 video');
    } else {
      const nData = {...dataSignUp};
      nData.list_photo = nFiles;
      setData(nData);
      // setFiles(nFiles);
    }
  };

  const removeFile = (index: number) => {
    Alert.alert('Do you want remove this image', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const nFiles = files.filter(
            (file: ImageOrVideo, idx: number) => index !== idx,
          );
          const nData = {...dataSignUp};
          nData.list_photo = nFiles;
          setData(nData);
        },
      },
    ]);
  };

  const onDone = () => {
    NavigationUtils.navigate(USER_INFORMATION_NAME);
  };

  const addFile = (mediaType: any) => {
    const options = mediaType == 'photo' ? optionPhotos : optionVideos;
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
          uploadPhotos(mediaType);
        } else {
          takePhoto(mediaType);
        }
      },
    );
  };

  const renderImage = (file: ImageOrVideo, index: number) => {
    const isPhoto = file.mime.includes('image');
    return (
      <TouchableOpacity
        onPress={() => removeFile(index)}
        activeOpacity={0.8}
        key={index}
        style={{marginBottom: SIZE.padding, marginRight: SIZE.padding}}>
        {isPhoto ? (
          <Image source={{uri: file.path}} style={styles.itemImage} />
        ) : (
          <Video source={{uri: file.path}} style={styles.itemImage} />
        )}
        {index === 0 && (
          <View style={styles.viewProfile}>
            <AppText style={styles.profilePhoto}>{'Profile photo'}</AppText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderListImage = () => {
    return (
      <>
        {files.length > 0 ? (
          <>
            <View style={styles.viewSubtitle}>
              <AppText style={styles.subTitle}>
                {'Hold and drag to reorder'}
              </AppText>
              <AppText style={styles.subTitle}>{'Tap to remove'}</AppText>
            </View>

            <View style={styles.listImage}>
              {files.map((file: ImageOrVideo, index: number) =>
                renderImage(file, index),
              )}
            </View>
          </>
        ) : (
          <>
            <View style={{paddingBottom: scaleWidth(400)}}>
              <Image source={bg_room_unit_picture} style={styles.bgImage} />
            </View>
            <AppText style={styles.title}>
              {'Finally, let’s add some photos of your place'}
            </AppText>
          </>
        )}
      </>
    );
  };

  const isHasFile = files.length > 0;

  return (
    <View style={styles.container}>
      <Header
        back
        iconFillColor={isHasFile ? 'black' : 'white'}
        customContainer={{
          position: isHasFile ? 'static' : 'absolute',
          zIndex: 9,
          backgroundColor: 'transparent',
        }}
      />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {renderListImage()}
        <View style={styles.padding}>
          <AppButton
            onPress={() => addFile('photo')}
            title={'Add photos'}
            typeButton={'linear'}
            iconRight={'addPhoto'}
            customStyleTitle={styles.customStyleTitle}
          />
          <AppButton
            onPress={() => addFile('video')}
            title={'Add videos'}
            typeButton={'linear'}
            iconRight={'addVideo'}
            customStyleTitle={styles.customStyleTitle}
          />
        </View>
      </ScrollView>
      {files.length > 0 && (
        <AppButton
          title={'Done'}
          onPress={onDone}
          iconRight={'tick'}
          containerStyle={styles.padding}
        />
      )}
    </View>
  );
};

export {RoomUnitGallery};

const styles = StyleSheet.create({
  viewSubtitle: {
    marginTop: SIZE.base_space,
    marginBottom: SIZE.big_space,
  },
  listImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: -SIZE.padding,
    paddingHorizontal: SIZE.padding,
  },
  bgImage: {
    width: scaleWidth(375),
    height: scaleWidth(390),
    resizeMode: 'contain',
    position: 'absolute',
  },
  customStyleTitle: {color: colors.primary},
  itemImage: {
    width: scaleWidth(93),
    height: scaleWidth(93),
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
  padding: {
    marginHorizontal: SIZE.padding,
    paddingBottom: SIZE.medium_space,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgSreen,
    // paddingHorizontal: SIZE.padding,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.semi_size,
    lineHeight: scaleWidth(36),
    marginBottom: SIZE.padding,
    marginTop: SIZE.padding,
    textAlign: 'center',
    color: colors.secondPrimary,
  },
  subTitle: {
    lineHeight: SIZE.base_size * 1.3,
    textAlign: 'center',
    color: colors.textSecondPrimary,
  },
});
