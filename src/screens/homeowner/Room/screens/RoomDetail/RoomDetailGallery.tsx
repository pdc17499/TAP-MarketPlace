import {AppButton, AppText, Header} from '@component';
import {
  colors,
  fontFamily,
  scaleWidth,
  SIZE,
  OPTIONS_GALLERY,
  STYLE,
} from '@util';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Pressable,
  LayoutAnimation,
} from 'react-native';
import {useDispatch} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import Video from 'react-native-video';
import {bg_room_unit_picture, IconAddVideos, IconClear} from '@assets';
import {NavigationUtils} from '@navigation';
import {ADD_SUCCESS, USER_INFORMATION_NAME} from '@routeName';
import {
  DraxDragWithReceiverEventData,
  DraxProvider,
  DraxView,
} from 'react-native-drax';

const RoomDetailGallery = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const gallery = route.params.gallery;
  const [files, setFiles] = useState(gallery);
  const {showActionSheetWithOptions} = useActionSheet();
  const {optionPhotos, optionVideos} = OPTIONS_GALLERY;

  const uploadPhotos = (mediaType: any) => {
    const isPhoto = mediaType === 'photo';
    ImagePicker.openPicker({
      multiple: true,
      cropping: isPhoto,
      mediaType: mediaType,
      compressImageQuality: 0.6,
      maxFiles: 10,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
    }).then((images: any) => {
      console.log({images});
      const nFiles: any = [...files, ...images];
      validateFile(nFiles);
    });
  };

  const takePhoto = (mediaType: any) => {
    ImagePicker.openCamera({
      cropping: mediaType === 'photo',
      mediaType,
      compressImageQuality: 0.6,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
    }).then((image: any) => {
      const nFiles: any = [...files];
      nFiles.push(image);
      validateFile(nFiles);
    });
  };

  console.log({files});

  const validateFile = (nFiles: any) => {
    const photos = nFiles.filter((file: any) => {
      const typeFile = checkVideo(file);
      return typeFile === 1 || typeFile === 3;
    });
    const videos = nFiles.filter((file: any) => {
      const typeFile = checkVideo(file);
      return typeFile === 2 || typeFile === 4;
    });

    console.log({nFiles, photos, videos});

    if (photos.length > 10) {
      Alert.alert('You can only upload up to 10 photos');
    } else if (videos.length > 1) {
      Alert.alert('You can only upload up to 1 video');
    } else {
      setFiles(nFiles);
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
            (file: any, idx: number) => index !== idx,
          );
          setFiles(nFiles);
        },
      },
    ]);
  };

  const onDone = () => {
    NavigationUtils.navigate(ADD_SUCCESS);
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
        } else if (buttonIndex === 1) {
          takePhoto(mediaType);
        }
      },
    );
  };

  const typesVideo = ['mp4'];

  // 1 - image local, 2 - video local, 3 - image server, 4 - video server
  const checkVideo = (file: any) => {
    if (file.hasOwnProperty('mime')) {
      const isImage = file.mime.includes('image');
      return isImage ? 1 : 2;
    } else {
      var parts = file.split('.');
      var extension = parts[parts.length - 1];
      const isImage = typesVideo.indexOf(extension) === -1;
      return isImage ? 3 : 4;
    }
  };

  const move = (array: any, from: number, to: number) => {
    array.splice(to, 0, array.splice(from, 1)[0]);
    return [...array];
  };

  const onReceiveDragDrop = (event: DraxDragWithReceiverEventData) => {
    console.log({event});
    const {dragged, receiver} = event;
    const idDragged = parseInt(dragged.id);
    const idReceiver = parseInt(receiver.id);
    let nFiles: any = [...files];
    nFiles = move(nFiles, idDragged, idReceiver);
    const firstFile = nFiles[0];
    const typeFile = checkVideo(firstFile);
    if (typeFile === 2 || typeFile === 4) {
      Alert.alert('Profile photo must be an image');
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setTimeout(() => {
        setFiles(nFiles);
      }, 100);
    }
  };

  const renderImage = (file: any, index: number) => {
    const typeFile = checkVideo(file);
    const uri = typeFile === 1 || typeFile === 2 ? file.path : file;
    const styleView =
      index === 1 || index % 3 == 1
        ? {marginBottom: SIZE.padding, marginHorizontal: SIZE.padding - 1}
        : {marginBottom: SIZE.padding};
    return (
      <>
        <View style={styleView}>
          <Pressable
            onPress={() => removeFile(index)}
            style={styles.remove}
            hitSlop={STYLE.hitSlop}>
            <IconClear iconFillColor={colors.white} width={14} height={14} />
          </Pressable>
          <DraxView
            id={index.toString()}
            draggingStyle={styles.dragging}
            dragReleasedStyle={styles.dragging}
            dragPayload={'R'}
            longPressDelay={0}
            onReceiveDragDrop={onReceiveDragDrop}>
            {typeFile === 1 || typeFile === 3 ? (
              <Image source={{uri}} style={styles.itemImage} />
            ) : (
              <>
                <Video
                  source={{uri}}
                  style={styles.itemImage}
                  resizeMode={'cover'}
                  muted
                />
                <View style={styles.videoSubView}>
                  <IconAddVideos iconFillColor={colors.white} />
                </View>
              </>
            )}
          </DraxView>
        </View>
        {index === 0 && (
          <View style={styles.viewProfile}>
            <AppText style={styles.profilePhoto}>{'Profile photo'}</AppText>
          </View>
        )}
      </>
    );
  };

  const renderListImage = () => {
    return (
      <DraxProvider>
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
        <View style={styles.padding}>
          <AppButton
            onPress={() => addFile('photo')}
            title={'Add photos'}
            typeButton={'linear'}
            iconRight={'addPhoto'}
            customStyleTitle={styles.customStyleTitle}
          />

          {files.length > 0 && (
            <AppButton
              onPress={() => addFile('video')}
              title={'Add videos'}
              typeButton={'linear'}
              iconRight={'addVideo'}
              customStyleTitle={styles.customStyleTitle}
            />
          )}
        </View>
        {files.length > 0 && (
          <AppButton
            title={'Done'}
            onPress={onDone}
            iconRight={'tick'}
            containerStyle={styles.padding}
          />
        )}
      </DraxProvider>
    );
  };

  const isHasFile = files.length > 0;

  return (
    <View style={styles.container}>
      <Header
        back
        iconFillColor={isHasFile ? 'black' : 'white'}
        customContainer={{
          position: isHasFile ? 'relative' : 'absolute',
          zIndex: 9,
          backgroundColor: 'transparent',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderListImage()}
      </ScrollView>
    </View>
  );
};

export {RoomDetailGallery};

const styles = StyleSheet.create({
  viewSubtitle: {
    marginTop: SIZE.base_space,
    marginBottom: SIZE.big_space,
  },
  listImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginRight: -SIZE.padding,
    paddingHorizontal: SIZE.padding,
    marginTop: SIZE.padding,
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
    left: SIZE.padding / 2,
    width: scaleWidth(93) + SIZE.padding,
    height: scaleWidth(93) + scaleWidth(44) + SIZE.padding / 2,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.google,
    zIndex: -1,
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
  videoSubView: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
    right: 0,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
  },

  dragging: {
    opacity: 0.2,
  },
  remove: {
    position: 'absolute',
    right: -8,
    zIndex: 1,
    top: -6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 3,
  },
});
