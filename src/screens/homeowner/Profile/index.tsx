import { AppButton, AppText, Header } from '@component';
import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import { logoutApp } from '@redux';
import { useSelector } from 'react-redux'
import { IconHouseLine, IconUser, IconThumbsUp, IconSetting, CaretRight, IconShieldCheck, IconLogOut } from '@assets';
import { scaleWidth } from '@util';

interface ProfileProp { }

interface screenNavigationProp {
  navigate: any;
}

const Profile = React.memo((props: ProfileProp) => {
  const USER = useSelector((state: any) => state.auth.user);
  console.log('INFO', USER)
  const DATA = [
    {
      id: 1,
      title: 'Your Listing',
      icon: <IconHouseLine />
    },
    {
      id: 2,
      title: 'Basic Infomation',
      icon: <IconUser />
    },
    {
      id: 3,
      title: 'Lifestyle & Preferences',
      icon: <IconThumbsUp />
    },
    {
      id: 4,
      title: 'Account Setting',
      icon: <IconSetting />
    },

  ]
  const dispath = useDispatch();
  const logOut = () => {
    dispath(logoutApp())
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      {item.icon}
      <AppText style={styles.title}>{item.title}</AppText>
      <CaretRight />
    </View>
  )

  const ListHeaderComponent = () => (
    <View>
      <Header />
      <Image source={{ uri: 'https://www.thecellartrust.org/wp-content/uploads/2017/04/Trustees.jpg' }}
        style={styles.avatar}>
      </Image>
      <View style={styles.infomation}>
        <AppText style={styles.name}>{USER.name}</AppText>
        <AppText style={styles.email}>{USER.email}</AppText>
        <AppText style={styles.email}>{'(704) 555-0127'}</AppText>
      </View>
      <View style={styles.borderTopList} />
    </View>
  )

  const ListFooterComponent = () => (
    <>
      {/* <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <IconShieldCheck />
          <AppText style={styles.verify}>{'Verify my account'}</AppText>
        </View>
        <View style={styles.borderBottom} />
      </View> */}
      <View style={styles.logOut}>
        <IconLogOut />
        <AppText style={styles.logOutTxt}>{'Log out'}</AppText>
      </View>
    </>
  )



  return (
    <View style={styles.container}>

      <FlatList
        style={styles.body}
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />

    </View>
  );
});

export { Profile };
