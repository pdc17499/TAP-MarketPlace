import {Header} from '@component';
import {AppSwiperProps, RefAppSwiper} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';

const AppSwiper = forwardRef(
  (props: AppSwiperProps, ref: Ref<RefAppSwiper>) => {
    const navigation = useNavigation();
    const {children, showPagination} = props;
    const refSwiper = useRef<any>();
    const currentIndex = useRef<number>(0);

    useImperativeHandle(ref, () => ({
      onNextButton,
    }));

    const onNextButton = () => {
      refSwiper.current.scrollBy(1);
    };

    const onPrevButton = () => {
      if (currentIndex.current === 0) {
        navigation.goBack();
      } else {
        refSwiper.current.scrollBy(-1);
      }
    };

    const customPaginationStyle = showPagination
      ? styles.paginationStyle
      : styles.hidePagination;

    const onIndexChanged = (index: any) => {
      console.log({index});
      currentIndex.current = index;
    };

    return (
      <>
        <Header back onPressBack={onPrevButton} />
        <Swiper
          ref={refSwiper}
          onIndexChanged={onIndexChanged}
          removeClippedSubviews={false}
          paginationStyle={customPaginationStyle}
          activeDotColor={colors.orange}
          activeDotStyle={styles.activeDotStyle}
          scrollEnabled={false}>
          {children}
        </Swiper>
      </>
    );
  },
);

const styles = StyleSheet.create({
  txtStyle: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.base_size,
    color: colors.textPrimary,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  paginationStyle: {
    position: 'absolute',
    top: -scaleWidth(30),
    bottom: 'auto',
    right: SIZE.padding,
    justifyContent: 'flex-end',
  },
  hidePagination: {
    display: 'none',
  },
  activeDotStyle: {
    width: 16,
    height: 8,
  },
});

export {AppSwiper};
