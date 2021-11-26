import {Header} from '@component';
import React from 'react';
import {Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';

interface screenNavigationProp {
  navigate: any;
}

const Matches = () => {
  const dispath = useDispatch();

  return (
    <View style={styles.container}>
      <Header />
      <View>{/* <Image source={IconHome} /> */}</View>
    </View>
  );
};

export {Matches};
