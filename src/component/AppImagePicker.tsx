import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
// import {ImageItemProps} from '@interfaces';
import {launchImageLibrary} from 'react-native-image-picker';
// import {CrossIcon, PlusIcon} from '@assets';
// import {SIZE, colors} from '@utils';
import {ITEM_SIZE} from './DragDrop/Config';

interface ImageItemProps {
  filePath?: any;
  chooseFile?: any;
  index: number;
  removeImage?: (index: number) => void;
  setImage?: (asset: any, index: number) => void;
  onPressImg?: (index: number) => void;
  imageCount?: number;
  id?: any;
}

export const AppImagePicker = React.memo((props: ImageItemProps) => {
  const {
    filePath,
    index,
    setImage,
    removeImage,
    onPressImg,
    imageCount = 6,
  } = props;
  const chooseFile = (typeMedia: string, index: number) => {
    const options: any = {
      mediaType: typeMedia,
      quality: 0.3,
      selectionLimit: imageCount,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        return;
      } else if (response.errorCode == 'permission') {
        return;
      } else if (response.errorCode == 'others') {
        return;
      }
      if (response.assets) {
        setImage &&
          setImage(
            response.assets.map((item: any) => ({
              ...item,
              url: item.uri,
            })),
            index,
          );
      }
    });
  };
  return (
    <TouchableOpacity
      style={styles.addImage}
      onPress={() => {
        if (filePath && !!filePath.uri) {
          onPressImg && onPressImg(index);
        } else {
          chooseFile('photo', index);
        }
      }}>
      {(filePath && !!filePath.uri) || (
        <View style={styles.imageWrapper}>
          {/* <PlusIcon style={styles.plusIcon} /> */}
        </View>
      )}
      {filePath && !!filePath.uri && (
        <View style={styles.imageWrapper}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => removeImage && removeImage(index)}>
            {/* <CrossIcon /> */}
          </TouchableOpacity>
          <Image
            source={{uri: filePath.uri}}
            style={styles.imageStyle}
            resizeMode="cover"
          />
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  addImage: {
    borderRadius: 4,
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
  imageWrapper: {
    margin: 8,
    width: ITEM_SIZE - 16,
    height: ITEM_SIZE - 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF3F8',
    flex: 1,
    borderRadius: 5,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  plusIcon: {
    alignSelf: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 2,
    right: 2,
    // backgroundColor: COLOR.BG_TRANSPARENT_20,
    borderRadius: 20,
    // borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});
