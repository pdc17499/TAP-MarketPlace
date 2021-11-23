import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, SIZE} from '@util';
import {AppImagePicker} from './AppImagePicker';
import {useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import _ from 'lodash';

import ImageView from 'react-native-image-viewing';
import {useEffect} from 'react';
import AppDrag from './DragDrop/AppDrag';
import {ITEM_SIZE} from './DragDrop/Config';

export const AppListImage = React.memo(
  ({
    onChangeListImg,
    images,
    onRemoveImage,
    imageCount = 6,
    isEdit = true,
  }: any) => {
    const [listImage, setListImage] = React.useState(images);
    const [indexImageSelected, setImageSelected] = useState(-1);

    const setImage = (asset: any, index: number) => {
      const tempListImg = [...listImage];
      const tempPath = asset.slice(0, tempListImg.length - index);
      tempListImg.splice(index, tempPath.length, ...tempPath);
      const newListImg = orderAndFill(tempListImg);
      setListImage(newListImg);
      onChangeListImg && onChangeListImg(newListImg);
    };

    const orderAndFill = (tempListImg: any) => {
      tempListImg = tempListImg.filter((item: any) => item);
      for (let i = tempListImg.length; i < imageCount; i++) {
        tempListImg.push(null);
      }
      return tempListImg;
    };

    const removeImage = (index: number) => {
      let tempListImg = [...listImage];
      tempListImg.splice(index, 1, null);
      const newListImg = orderAndFill(tempListImg);
      setListImage(newListImg);
      onChangeListImg && onChangeListImg(newListImg);
      onRemoveImage && onRemoveImage(listImage[index] && listImage[index].id);
    };

    useEffect(() => {
      if (images) {
        setListImage(images);
      }
    }, [images]);

    const onDragFinish = (positions: any) => {
      const newImg: Array<any> = [];
      for (let i = 0; i <= 5; i++) {
        newImg.push(listImage[positions[i]]);
      }
      onChangeListImg && onChangeListImg(newImg);
    };

    return (
      <>
        <View style={styles.imageBox}>
          <AppDrag isEdit={isEdit} onDragFinish={onDragFinish}>
            {listImage?.map((image: any, index: number) => (
              <AppImagePicker
                key={index}
                id={index.toString()}
                index={index}
                filePath={image}
                setImage={setImage}
                removeImage={removeImage}
                onPressImg={(index: number) => setImageSelected(index)}
                imageCount={imageCount}
              />
            ))}
          </AppDrag>
        </View>
        <ImageView
          images={listImage?.filter((item: any) => item)}
          imageIndex={indexImageSelected}
          visible={indexImageSelected !== -1}
          onRequestClose={() => setImageSelected(-1)}
        />
      </>
    );
  },
);

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    // width: SIZE.device_width * 0.92,
    // marginHorizontal: SIZE.marginHorizontal,
    // marginBottom: SIZE.marginVertical * 2,
  },
  container: {
    paddingBottom: SIZE.padding * 3,
    backgroundColor: colors.white,
  },
  heading: {
    marginTop: SIZE.base_space * 1.25,
    marginBottom: 24,
    // marginTop: SIZE.marginVertical * 1.25,
  },
  headingTxt: {
    // fontSize: SIZE.,
    fontWeight: '700',
  },
  title: {
    marginTop: SIZE.base_space * 1.25,
    // marginBottom: SIZE.marginVertical,
  },
  titleTxt: {
    fontSize: SIZE.base_size,
    color: colors.primary,
    fontWeight: '700',
  },
  description: {},
  imageBox: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    marginVertical: SIZE.padding,
    // backgroundColor: 'red',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgDes: {
    fontSize: SIZE.base_size,
    fontWeight: '500',
    color: colors.primary,
    marginTop: hp('0.86%'),
  },
  starItem: {
    marginRight: SIZE.base_space,
    marginTop: 9,
    marginBottom: hp('6.15%'),
  },
});

export default AppListImage;
