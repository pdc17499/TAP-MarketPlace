import {
  bg_room_unit_picture,
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
import {ROOM_UNIT_HOWNER} from '@mocks';
import {mockProps} from '@interfaces';

interface screenNavigationProp {
  navigate: any;
}

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

  const swiperRef = useRef<any>();
  const BASE_URL = getBaseURL() + '/v1/file';

  const renderCard = (item: any, index: number) => {
    return (
      <View key={index.toString()} style={styles.card}>
        <View>
          <AppText style={styles.userName}>{'Amber Park'}</AppText>
          <View style={styles.subTitleView}>
            <IconPickLocation
              iconFillColor={'white'}
              style={{marginRight: 6}}
            />
            <AppText style={styles.subTitle}>{'1 Wallich St'}</AppText>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View>
            <AppText style={styles.age}>{'Age'}</AppText>
            <AppText style={styles.subTitle}>{'29 - 40'}</AppText>
          </View>
          <View>
            <AppText style={styles.age}>{'Gender'}</AppText>
            <AppText style={styles.subTitle}>{'Male'}</AppText>
          </View>
        </View>

        <FastImage
          style={styles.imageUser}
          source={{
            uri: 'https://tap-marketplace.s3.ap-southeast-1.amazonaws.com/0780d6638c564c402591136ac5bea57a',
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

  const renderLifeStyle = (title: string, list: Array<any>) => {
    return (
      <View style={styles.viewLifestyle}>
        <AppQA
          title={title}
          data={list}
          showIconLeft
          typeList={'wrap'}
          widthLeftIcon={22}
          heightLeftIcon={22}
          fillColorIcon={colors.primary}
          customStyleTitle={styles.titleLifestyle}
          customStyleTitleButton={styles.titleButtonLifestyle}
          customStyleButton={styles.buttonLifestyle}
        />
      </View>
    );
  };

  const renderMatchingRoom = () => {
    return (
      <View
        style={{
          padding: SIZE.base_space,
          backgroundColor: colors.bgInput,
          borderRadius: 8,
          marginTop: SIZE.padding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={bg_room_unit_picture}
          style={{width: 80, height: 80, borderRadius: 8, marginRight: 10}}
        />
        <View style={{flex: 1}}>
          <View style={styles.subTitleView}>
            <AppText style={styles.titleRoom}>{'Condo'}</AppText>
            <IconDot style={{marginHorizontal: 6}} />
            <AppText style={styles.titleRoom}>{'Entire Home'}</AppText>
          </View>
          <View style={styles.subTitleView}>
            <IconPickLocation />
            <AppText style={styles.location}>{'12 Kallang Avenue'}</AppText>
          </View>
        </View>
      </View>
    );
  };

  const renderListAmenities = () => {
    return (
      <View style={styles.viewAmenities}>
        <AppText style={[styles.labelAmenities]}>
          {'Amenities expected'}
        </AppText>
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
        {renderBigTitle('Basic Information')}
        <View>
          <AppButton
            label={'Occupation'}
            title={'Teacher'}
            typeButton={'underline'}
            disabled
            customStyleLabel={styles.customStyleLabel}
          />
          <AppButton
            label={'Ethnicity'}
            title={'Asian / Pacific Islander'}
            typeButton={'underline'}
            disabled
            customStyleLabel={styles.customStyleLabel}
          />
        </View>
        {renderBigTitle('Lifestyle & Preferences')}
        {renderLifeStyle('Lifestyle', list.life_style)}
        {renderLifeStyle('Preferences', list.preferences)}
        {renderBigTitle('Looking for...')}
        {renderItemLooking('Location', ['D1', 'D2', 'D24', 'D25'])}
        {renderItemLooking('Property type', ['Condo', 'HDB'])}
        {renderItemLooking('Lease Period', ['6 months', '12 months'])}
        {renderItemLooking('Room type', ['Entire Home'])}
        {renderItemLooking('Number of bedrooms', ['3'])}
        {renderItemLooking('Number of bathrooms', ['2'])}
        {renderListAmenities()}
        {renderBigTitle('Your matching room')}
        {renderMatchingRoom()}
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
                // overlayLabels={{
                //   right: {
                //     title: 'BLEAH',
                //     style: {
                //       label: {
                //         backgroundColor: 'black',
                //         borderColor: 'black',
                //         color: 'white',
                //         borderWidth: 1,
                //       },
                //       wrapper: {
                //         flexDirection: 'column',
                //         alignItems: 'center',
                //         justifyContent: 'center',
                //       },
                //     },
                //   },
                // }}
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
            <IconClear width={36} height={36} strokeWidth={1.5} />
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
