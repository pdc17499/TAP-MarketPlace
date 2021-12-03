import {
  bg_room_unit_picture,
  IconBedrooms,
  IconChatFull,
  IconClear,
  IconDot,
  IconFilter,
  IconLike,
  IconMapPin,
  IconPickLocation,
  IconRefresh,
  logo,
  searching,
} from '@assets';
import {AppText, Header, AppSwipperImage, AppButton, AppQA} from '@component';
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
import {
  Image,
  Pressable,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import FastImage from 'react-native-fast-image';
import {ROOM_UNIT_HOWNER, TENANT_PROPERTY} from '@mocks';
import {ImageServerProps, mockProps} from '@interfaces';
import Video from 'react-native-video';
import {MatchesHomeowner} from './components/MatchesHomeowner';
import {MatchesRoomDetail} from './components/MatchesRoomDetail';
import MapView, {MarkerAnimated, PROVIDER_GOOGLE} from 'react-native-maps';

function* range(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const MatchesTenant = () => {
  const dispath = useDispatch();
  const [state, setState] = useState({
    cards: [...range(1, 10)],
    swipedAllCards: false,
    swipeDirection: '',
    cardIndex: 0,
    isEmpty: false,
  });

  const list = ROOM_UNIT_HOWNER;
  const dataTenant = TENANT_PROPERTY;
  const files = dataTenant.list_photo;
  const matches = dataTenant.matches;
  const swiperRef = useRef<any>();

  const renderCard = (item: any, index: number) => {
    return (
      <View key={index.toString()} style={styles.card}>
        <View>
          <AppText style={styles.userName}>{'Amber Park'}</AppText>
          <View style={styles.subTitleView}>
            <IconPickLocation iconFillColor={'white'} />
            <AppText style={styles.subTitle}>{'1 Wallich St'}</AppText>
          </View>
        </View>
        <View style={styles.bottomView}>
          <AppText style={styles.userName}>{'$10,000 - $20,000'}</AppText>
          <View style={[styles.subTitleView, {marginTop: SIZE.base_space / 2}]}>
            <IconBedrooms iconFillColor={'white'} />
            <AppText style={styles.subTitle}>{'3 Beds'}</AppText>
          </View>
        </View>

        <FastImage
          style={styles.imageUser}
          source={{
            uri: files[0].imagePath,
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
          typeButton={'underline'}
          disabled
        />
      );
    }

    return <View />;
  };

  const renderListAmenities = () => {
    return (
      <View style={styles.viewAmenities}>
        {list.amenities.map((item: mockProps) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZE.base_space / 2,
              }}>
              {item.icon}
              <AppText>{`    ${item.value}`}</AppText>
            </View>
          );
        })}
      </View>
    );
  };

  const UserInformation = () => {
    return (
      <View style={{paddingHorizontal: SIZE.padding}}>
        <MatchesRoomDetail room={matches.room} />
        {renderBigTitle('Homeowner')}
        <MatchesHomeowner homeower={matches.homeowner} />
        {renderBigTitle('Rental details')}
        {renderItemLooking('Lease Period', ['6 months', '12 months'])}
        {renderBigTitle('Amenities')}
        {renderListAmenities()}
        {renderBigTitle('Location')}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            width: '100%',
            height: scaleWidth(170),
            marginTop: SIZE.base_space,
            borderRadius: 8,
          }}
          initialRegion={{
            latitude: 1.3139961,
            longitude: 103.7041657,
            latitudeDelta: 0.0099,
            longitudeDelta: 0.0099,
          }}>
          <MarkerAnimated
            coordinate={{
              latitude: 1.3139961,
              longitude: 103.7041657,
            }}
          />
        </MapView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: SIZE.big_space * 2}}>
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
            <View style={{height: scaleHeight(530)}}>
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
                // animateOverlayLabelsOpacity
                // animateCardOpacity
                swipeBackCard
                marginTop={0}
              />
            </View>
            {!state.isEmpty && UserInformation()}
          </View>
        )}
      </ScrollView>
      {!state.isEmpty && (
        <View style={styles.reactionView}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.dislikeView}
            onPress={onDislike}>
            <IconClear width={25} height={25} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.likeView}
            onPress={onLike}>
            <IconLike />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.chatView}
            onPress={onLike}>
            <IconChatFull />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export {MatchesTenant};
