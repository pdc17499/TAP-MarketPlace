import {AppButton, AppQA, AppText, Header} from '@component';
import {RoomStepProps} from '@interfaces';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {setDataSignup} from '@redux';
import {colors, fontFamily, scaleHeight, scaleWidth, SIZE} from '@util';
import React, {createRef, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import Video from 'react-native-video';
import {bg_room_unit_picture} from '@assets';
import {NavigationUtils} from '@navigation';
import {SIGNUP_PROPERTY} from '@routeName';

const RoomUnitPicture = (props: RoomStepProps) => {
  const {onNext} = props;
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataSignUp = useSelector((state: any) => state?.auth?.dataSignup);
  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };
  const [files, setFiles] = useState([]);
  const {showActionSheetWithOptions} = useActionSheet();
  const optionPhotos = ['Upload Photos', 'Take a photo', 'Cancel'];
  const optionVideos = ['Upload Video', 'Take a video', 'Cancel'];

  const uploadPhotos = (mediaType: any) => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: mediaType === 'photo',
      mediaType: mediaType,
    }).then((images: any) => {
      const nFiles: any = [...files, ...images];
      setFiles(nFiles);
      console.log({images});
    });
  };

  const takePhoto = (mediaType: any) => {
    ImagePicker.openCamera({
      cropping: mediaType === 'photo',
      mediaType,
    }).then((image: any) => {
      const nFiles: any = [...files];
      nFiles.push(image);
      setFiles(nFiles);
      console.log({image});
    });
  };

  console.log({files});

  const onDone = () => {
    NavigationUtils.navigate(SIGNUP_PROPERTY);
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
      <View
        key={index}
        style={{marginBottom: SIZE.padding, marginRight: SIZE.padding}}>
        {isPhoto ? (
          <Image
            source={{uri: file.path}}
            style={{
              width: scaleWidth(93),
              height: scaleWidth(93),
              borderRadius: 8,
            }}
          />
        ) : (
          <Video
            source={{uri: file.path}} // Can be a URL or a local file.
            // ref={ref => {
            //   this.player = ref;
            // }} // Store reference
            // onBuffer={this.onBuffer} // Callback when remote video is buffering
            // onError={this.videoError} // Callback when video cannot be loaded
            style={{
              width: scaleWidth(93),
              height: scaleWidth(93),
              borderRadius: 8,
            }}
          />
        )}
        {index === 0 && (
          <View
            style={{
              position: 'absolute',
              top: -scaleWidth(44),
              left: -SIZE.padding / 2,
              right: -SIZE.padding / 2,
              bottom: -SIZE.padding / 2,
              alignItems: 'center',
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.google,
            }}>
            <AppText
              style={{
                fontSize: SIZE.small_size,
                marginTop: SIZE.base_space,
                color: colors.textThirdPrimary,
                ...fontFamily.fontWeight500,
              }}>
              {'Profile photo'}
            </AppText>
          </View>
        )}
      </View>
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
        {files.length > 0 ? (
          <>
            <View
              style={{
                marginTop: SIZE.base_space,
                marginBottom: SIZE.big_space,
              }}>
              <AppText style={styles.subTitle}>
                {'Hold and drag to reorder'}
              </AppText>
              <AppText style={styles.subTitle}>{'Tap to remove'}</AppText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginRight: -SIZE.padding,
                paddingHorizontal: SIZE.padding,
              }}>
              {files.map((file: ImageOrVideo, index: number) =>
                renderImage(file, index),
              )}
            </View>
          </>
        ) : (
          <>
            <View style={{paddingBottom: scaleWidth(410)}}>
              <Image
                source={bg_room_unit_picture}
                style={{
                  width: scaleWidth(375),
                  height: scaleWidth(390),
                  resizeMode: 'contain',
                  // marginHorizontal: -SIZE.padding,
                  position: 'absolute',
                  // top: -100,
                }}
              />
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
            iconRight={'upload'}
            customStyleTitle={{color: colors.primary}}
          />
          <AppButton
            onPress={() => addFile('video')}
            title={'Add videos'}
            typeButton={'linear'}
            iconRight={'photo'}
            customStyleTitle={{color: colors.primary}}
          />
        </View>
      </ScrollView>
      {files.length > 0 && (
        <AppButton
          title={'Done'}
          onPress={onDone}
          iconRight={'tick'}
          customStyleButton={styles.padding}
        />
      )}
    </View>
  );
};

export {RoomUnitPicture};

const styles = StyleSheet.create({
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
