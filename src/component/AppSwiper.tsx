import {Header} from '@component';
import {AppSwiperProps, RefAppSwiper} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';

const AppSwiper = forwardRef(
  (props: AppSwiperProps, ref: Ref<RefAppSwiper>) => {
    const navigation = useNavigation();
    const {children, showPagination} = props;
    const refSwiper = useRef<any>();
    const currentIndex = useRef<number>(0);
    const {onSkip} = props;

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

    const handleSkip = () => {
      if (onSkip) onSkip(currentIndex.current);
      onNextButton();
    };

    const onIndexChanged = (index: any) => {
      console.log({index});
      currentIndex.current = index;
    };

    const customPaginationStyle =
      showPagination === 'right-header'
        ? styles.paginationStyle
        : showPagination === 'center-top'
        ? styles.paginationCenterTop
        : styles.hidePagination;

    const activeDotColor =
      showPagination === 'center-top' ? '#2A6B58' : colors.orange;

    const paddingTop =
      showPagination === 'center-top' ? SIZE.big_space + SIZE.padding : 0;

    return (
      <>
        <Header
          back
          onPressBack={onPrevButton}
          iconRight={showPagination === 'center-top' ? 'skip' : 'hide'}
          onPressRight={handleSkip}
          customContainer={styles.customContainerHeader}
        />
        <Swiper
          ref={refSwiper}
          style={[styles.customContainerHeader, {paddingTop: paddingTop}]}
          onIndexChanged={onIndexChanged}
          removeClippedSubviews={false}
          paginationStyle={customPaginationStyle}
          activeDotColor={activeDotColor}
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
  customContainerHeader: {
    backgroundColor: colors.bgSreen,
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
  paginationCenterTop: {
    position: 'absolute',
    top: SIZE.big_space,
    bottom: 'auto',
    justifyContent: 'center',
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
