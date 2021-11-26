import {
  IconClear,
  IconDot,
  IconFilter,
  IconLike,
  IconLiked,
  IconRefresh,
  logo,
  searching,
} from '@assets';
import {
  AppText,
  Header,
  AppSwipperImage,
  AppCardSwipper,
  AppButton,
} from '@component';
import {
  colors,
  DEVICE,
  fontFamily,
  getBaseURL,
  scaleHeight,
  scaleSize,
  scaleWidth,
  SIZE,
} from '@util';
import React, {useRef, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';

interface screenNavigationProp {
  navigate: any;
}

function* range(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const Matches = () => {
  const dispath = useDispatch();
  const [state, setState] = useState({
    cards: [...range(1, 10)],
    swipedAllCards: false,
    swipeDirection: '',
    cardIndex: 0,
    isEmpty: false,
  });

  const swiperRef = useRef<any>();
  const BASE_URL = getBaseURL() + '/v1/file';

  const renderCard = (item: any, index: number) => {
    return (
      <View key={index.toString()} style={styles.card}>
        <View>
          <AppText style={styles.userName}>{'Mai Kim Tai'}</AppText>
          <View style={styles.subTitleView}>
            <AppText style={styles.subTitle}>{'Teacher'}</AppText>
            <IconDot iconFillColor={'white'} style={{marginHorizontal: 6}} />
            <AppText style={styles.subTitle}>{'Singapore'}</AppText>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View>
            <AppText style={styles.age}>{'Age'}</AppText>
            <AppText style={styles.subTitle}>{'29 - 40'}</AppText>
          </View>
          <View style={{width: 1, height: 26, backgroundColor: 'white'}} />
          <View>
            <AppText style={styles.age}>{'Gender'}</AppText>
            <AppText style={styles.subTitle}>{'Male'}</AppText>
          </View>
        </View>

        <FastImage
          style={styles.imageUser}
          source={{
            uri: BASE_URL + '/videos/6c82c7892a2db755abcdd02ef9e11fc1',
            priority: FastImage.priority.normal,
          }}
        />
      </View>
    );
  };

  const onSwiped = (index: number) => {
    console.log(`on swiped ${index}`);
    const count = state.cards.length;
    if (count === index + 1) {
      setState({...state, isEmpty: true});
    }
  };

  const onSwipedLeft = (index: number) => {
    console.log('onSwipedLeft', index);
  };

  const onSwipedRight = (index: number) => {
    console.log('onSwipedRight', index);
  };

  const onDislike = () => {
    swiperRef.current.swipeLeft();
  };

  const onLike = () => {
    swiperRef.current.swipeRight();
  };

  const EmptyView = () => {
    if (state.isEmpty) {
      return (
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: scaleWidth(50),
            marginTop: scaleHeight(90),
          }}>
          <FastImage style={styles.searchingImg} source={searching} />
          <AppText style={styles.emptyTitle}>
            {'You have seen all current matches'}
          </AppText>
          <AppText style={styles.emptySubtitle}>
            {'Check your Liked Matches and see who also likes your places'}
          </AppText>
          <View style={{flexDirection: 'row'}}>
            <IconLike iconFillColor={colors.green} style={styles.emptyLike} />
            <AppText style={styles.emptyTextBottom}>
              {'Liked Matches List '}
            </AppText>
          </View>
        </View>
      );
    }

    return <View />;
  };

  const renderBigTitle = (title: string) => {
    return <AppText style={styles.bigTitle}>{title}</AppText>;
  };

  const renderItemLooking = (label: string, values: Array<string>) => {
    if (values?.length > 0) {
      let title = '';
      values.map((value: string) => (title += ', ' + value));
      title = title.substring(2);
      return (
        <AppButton
          customStyleLabel={styles.customStyleLabel}
          customStyleButton={styles.customStyleButton}
          customStyleTitle={styles.customStyleTitle}
          label={label}
          title={title}
          typeButton={'linear'}
          disabled
        />
      );
    }

    return <View />;
  };

  const UserInformation = () => {
    return (
      <View style={{paddingHorizontal: SIZE.padding}}>
        <AppText style={[styles.bigTitle, {marginTop: 10}]}>
          {'Basic Information'}
        </AppText>
        <View>
          <AppButton
            label={'Occupation'}
            title={'Teacher'}
            typeButton={'linear'}
            disabled
          />
          <AppButton
            label={'Ethnicity'}
            title={'Asian / Pacific Islander'}
            typeButton={'linear'}
            disabled
          />
        </View>
        {/* {renderBigTitle('Lifestyle & Preferences')} */}
        {renderBigTitle('Looking for...')}
        {renderItemLooking('Location', ['D1', 'D2', 'D24', 'D25'])}
        {renderItemLooking('Property type', ['Condo', 'HDB'])}
        {renderItemLooking('Lease Period', ['6 months', '12 months'])}
        {renderItemLooking('Room type', ['Entire Home'])}
        {renderItemLooking('Number of bedrooms', ['3'])}
        {renderItemLooking('Number of bathrooms', ['2'])}
        {renderBigTitle('Your matching room')}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {state.isEmpty ? (
          EmptyView()
        ) : (
          <View>
            <View style={styles.header}>
              <View style={{flex: 1}}>
                <Image source={logo} style={{width: 36, height: 36}} />
              </View>
              <Pressable style={styles.iconFilterView}>
                <IconRefresh />
              </Pressable>
              <Pressable style={styles.iconFilterView}>
                <IconFilter />
              </Pressable>
            </View>
            <View style={{height: scaleHeight(530) + scaleHeight(80)}}>
              <AppSwipperImage
                ref={swiperRef}
                onSwiped={onSwiped}
                cards={state.cards}
                cardIndex={state.cardIndex}
                cardVerticalMargin={0}
                renderCard={renderCard}
                disableTopSwipe
                disableBottomSwipe
                stackSize={2}
                stackSeparation={15}
                containerStyle={{backgroundColor: 'white'}}
                animateOverlayLabelsOpacity
                animateCardOpacity
                swipeBackCard
                marginTop={0}
              />
              {!state.isEmpty && (
                <View style={styles.reactionView}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.dislikeView}
                    onPress={onDislike}>
                    <IconClear width={36} height={36} strokeWidth={1.5} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.likeView}
                    onPress={onLike}>
                    <IconLike />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {!state.isEmpty && UserInformation()}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export {Matches};
