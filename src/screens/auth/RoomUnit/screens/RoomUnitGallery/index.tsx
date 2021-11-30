import {AppButton, AppText, Header} from '@component';
import {addNewRoom, setDataSignup} from '@redux';
import {
  colors,
  DEVICE,
  FILE_SIZE,
  getBaseURL,
  OPTIONS_GALLERY,
  scaleWidth,
  SIZE,
  STYLE,
} from '@util';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  Alert,
  LayoutAnimation,
  Pressable,
  UIManager,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import Video from 'react-native-video';
import {bg_room_unit_picture, IconAddVideos, IconClear} from '@assets';
import {NavigationUtils} from '@navigation';
import {
  ADD_SUCCESS,
  AGENCY_BASIC_INFORMATION,
  USER_INFORMATION_NAME,
} from '@routeName';
import {
  DraxDragWithReceiverEventData,
  DraxProvider,
  DraxView,
} from 'react-native-drax';
import {GlobalService, uploadFileApi, uploadFile} from '@services';
import {styles} from './styles';
import axios from 'axios';

const RoomUnitGallery = React.memo(() => {
  const dispatch = useDispatch();
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const token = useSelector((state: any) => state?.auth?.token);
  const room: any = useSelector((state: any) => state?.rooms?.roomDetail);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };
  const [files, setFiles] = useState([]);
  const {showActionSheetWithOptions} = useActionSheet();
  const BASE_URL = getBaseURL() + '/v1/file';
  const numPhotos = useRef(0);
  const numVideos = useRef(0);
  if (DEVICE.isAndroid) {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  useEffect(() => {
    numPhotos.current = 0;
    numVideos.current = 0;
    files.map((file: any) => {
      if (file.uri.includes('images')) {
        numPhotos.current += 1;
      } else {
        numVideos.current += 1;
      }
    });
  }, [files]);

  const uploadPhotos = (mediaType: any) => {
    const isPhoto = mediaType === 'photo';
    const maxFiles = isPhoto
      ? FILE_SIZE.MAX_IMAGE_COUNT - numPhotos.current
      : FILE_SIZE.MAX_VIDEO_COUNT - numVideos.current;
    ImagePicker.openPicker({
      multiple: true,
      cropping: isPhoto,
      mediaType: mediaType,
      compressImageQuality: 0.6,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      maxFiles: maxFiles,
    }).then((nFiles: any) => {
      validateFile(nFiles, isPhoto);
    });
  };

  const takePhoto = (mediaType: any) => {
    const isPhoto = mediaType === 'photo';
    ImagePicker.openCamera({
      cropping: true,
      mediaType,
      compressImageQuality: 0.6,
      compressImageMaxWidth: 1000,
      compressImageMaxHeighte: 1000,
    }).then(async (file: ImageOrVideo) => {
      validateFile([file], isPhoto);
    });
  };

  const validateFile = async (nFiles: any, isPhoto: boolean) => {
    if (
      isPhoto &&
      nFiles.length + numPhotos.current > FILE_SIZE.MAX_IMAGE_COUNT
    ) {
      Alert.alert('You can only upload up to 10 photos');
    } else if (
      !isPhoto &&
      nFiles.length + numVideos.current > FILE_SIZE.MAX_IMAGE_COUNT
    ) {
      Alert.alert('You can only upload up to 1 video');
    } else {
      const arrFile: any = [];
      nFiles.forEach(async (file: ImageOrVideo) => {
        if (
          (isPhoto && file.size < FILE_SIZE.MAX_IMAGE_SIZE) ||
          (!isPhoto && file.size < FILE_SIZE.MAX_VIDEO_SIZE)
        ) {
          const response = await getUrlFile(file);
          if (response) {
            arrFile.push({
              format: response.format,
              uri: BASE_URL + response.imagePath,
            });
            showFiles(arrFile);
          }
        }
      });
    }
  };

  const showFiles = (nFiles: any) => {
    const listFile: any = [...files, ...nFiles];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setFiles(listFile);
  };

  const getUrlFile = async (image: any) => {
    // let formData = new FormData();
    // formData.append('file', {
    //   name: '202111212135080000.mp4',
    //   uri: '/Users/ad-m7/Downloads/202111212135080000.mp4',
    //   type: 'video/mp4',
    // });
    // fetch('http://bdb8-222-252-30-49.ngrok.io/video_upload', {
    //   method: 'POST',
    //   headers: {
    //     // 'X-Requested-With': 'XMLHttpRequest',
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formData,
    // })
    //   .then(async (response: any) => {
    //     console.log(111, await response.json());
    //   })
    //   .then(async res => {
    //     console.log({res});
    //     // this.setState({loading: false});
    //     // console.log(res);
    //     // if (res.error == 0) {
    //     //   this.props.navigation.navigate('Feed');
    //     // }
    //   })
    //   .catch(error => {
    //     console.log({error});
    //     // this.setState({loading: false});
    //   });

    // console.log(1111);
    // let formData = new FormData();
    // formData.append('file', {
    //   name: image?.path.replace(/^.*[\\\/]/, ''),
    //   uri: image?.path.replace('file://', ''),
    //   type: image?.mime,
    // });
    // console.log({formData});
    // axios
    //   .post('https://31a2-222-252-30-49.ngrok.io/upload', formData, {
    //     responseType: 'json',
    //     timeout: 30000,
    //     headers: {
    //       'X-Requested-With': 'XMLHttpRequest',
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(response => {
    //     console.log({response});
    //   })
    //   .catch(error => {
    //     console.log({error});
    //   });
    const result = await uploadFile(image);
    console.log({result});
    return result;
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
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setTimeout(() => {
            setFiles(nFiles);
          }, 100);
        },
      },
    ]);
  };

  const onDone = () => {
    const nData = {...dataSignUp};
    nData.list_photo = files;
    setData(nData);
    if (token) {
      const state = nData;
      const ImageVideo: Array<string> = state?.list_photo.map(
        (item: any) => item.uri,
      );
      // console.log('nData', ImageVideo);
      const body = {
        roomDesc: {
          RentalAddress: state?.location.title,
          PlaceType: state?.kind_place?.value,
          RoomDetails: {
            RoomType: state?.room_type?.value,
            BedroomNumber: state?.bedroom_number?.value,
            BathroomNumber: state?.bathroom_number?.value,
            AttachedBathroom: state?.attached_bathroom?.value === 'Yes',
            AllowCook: state?.allow_cooking?.value === 'Yes',
            StayWithGuest: state?.staying_with_guests?.value === 'Yes',
            KeyWords: state?.key_your_place,
          },
          LeasePeriod: {
            type: state?.kind_place?.value === 'HDB',
            value: state?.lease_your_place,
          },
          PicturesVideo: ImageVideo,
          RentalPrice: {
            type: state?.rental_price?.value,
            Min: state?.min_range_price,
            Max: state?.max_range_price,
            Price: parseInt(state?.negotiable_price || '0'),
          },
        },
      };
      console.log({body});

      dispatch(addNewRoom({body}));
    } else {
      if (dataSignUp?.role_user === 'Agent') {
        NavigationUtils.navigate(AGENCY_BASIC_INFORMATION);
      } else {
        NavigationUtils.navigate(USER_INFORMATION_NAME);
      }
    }
  };

  const addFile = (mediaType: any) => {
    const options =
      mediaType == 'photo'
        ? OPTIONS_GALLERY.optionPhotos
        : OPTIONS_GALLERY.optionVideos;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        console.log({buttonIndex});
        if (buttonIndex === 0) {
          uploadPhotos(mediaType);
        } else if (buttonIndex === 1) {
          takePhoto(mediaType);
        }
      },
    );
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
    if (!firstFile.uri.includes('images')) {
      Alert.alert('Profile photo must be an image');
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setTimeout(() => {
        setFiles(nFiles);
      }, 100);
    }
  };

  const renderImage = (file: any, index: number) => {
    const isPhoto = file.uri.includes('images');

    const styleView =
      index === 1 || index % 3 == 1
        ? {marginBottom: SIZE.padding, marginHorizontal: SIZE.padding - 1}
        : {marginBottom: SIZE.padding};
    return (
      <>
        <View style={styleView} key={index.toString()}>
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
            <View style={styles.remove}>
              <IconClear iconFillColor={colors.white} width={14} height={14} />
            </View>
            {isPhoto ? (
              <Image source={{uri: file.uri}} style={styles.itemImage} />
            ) : (
              <>
                <Video
                  source={{uri: file.uri}}
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
    console.log({files});
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
              {files.map((uri: string, index: number) =>
                renderImage(uri, index),
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
        {token && <AppText style={styles.textGallery}>{'Gallery'}</AppText>}
        {renderListImage()}
      </ScrollView>
    </View>
  );
});

export {RoomUnitGallery};
