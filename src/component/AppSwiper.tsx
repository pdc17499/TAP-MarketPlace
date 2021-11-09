import {Header} from '@component';
import {AppSwiperProps, RefAppSwiper} from '@interfaces';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';

const AppSwiper = forwardRef(
  (props: AppSwiperProps, ref: Ref<RefAppSwiper>) => {
    const {children} = props;
    const refSwiper = useRef<any>();

    useImperativeHandle(ref, () => ({
      onNextButton,
    }));

    const onNextButton = () => {
      refSwiper.current.scrollBy(1);
    };

    const onPrevButton = () => {
      refSwiper.current.scrollBy(-1);
    };

    return (
      <>
        <Header back onPressBack={onPrevButton} />
        <Swiper
          ref={refSwiper}
          removeClippedSubviews={false}
          paginationStyle={styles.paginationStyle}
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
  activeDotStyle: {
    width: 16,
    height: 8,
  },
});

export {AppSwiper};
