import {AppButton, AppText} from '@component';
import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import {logoutApp} from '@redux';

interface HomeProp {}

interface screenNavigationProp {
  navigate: any;
}

const Chat = (props: HomeProp) => {
  const dispath = useDispatch();
  const logOut = () => {
    dispath(logoutApp());
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{'Home Screen'}</AppText>
      <AppButton title={'Log out'} size={'small'} onPress={logOut} />
    </View>
  );
};

export {Chat};
