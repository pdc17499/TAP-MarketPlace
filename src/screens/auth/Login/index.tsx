import {AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import {colors, SIZE} from '@util';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';

interface LoginProp {}

interface screenNavigationProp {
  navigate: any;
}

const Login = React.memo((props: LoginProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header back title={'habfjk kjafkhaf kajhflakf alkfhalhf al'} />
      <AppText
        style={{fontSize: SIZE.big_size, paddingHorizontal: SIZE.padding}}>
        {'Sign up'}
      </AppText>
    </View>
  );
});

export {Login};
