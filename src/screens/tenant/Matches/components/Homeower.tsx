import {AppButton, AppText} from '@component';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutApp} from '@redux';

interface HomeownerProp {
  homeower: any;
}

interface screenNavigationProp {
  navigate: any;
}

export const Homeowner = (props: HomeownerProp) => {
  const {homeower} = props;
  const dispath = useDispatch();
  const logOut = () => {
    dispath(logoutApp());
  };

  return (
    <View style={{}}>
      <View>
        <AppText>{homeower.user_name}</AppText>
      </View>
      <View>
        <View>
          <AppText>{'Age'}</AppText>
          <AppText>{homeower.age_group}</AppText>
        </View>
        <View>
          <AppText>{'Gender'}</AppText>
          <AppText>{homeower.gender}</AppText>
        </View>
        <View>
          <AppText>{'From'}</AppText>
          <AppText>{homeower.nationality}</AppText>
        </View>
      </View>
      <AppText style={styles.title}>{'Home Screen'}</AppText>
      <AppButton title={'Log out'} size={'small'} onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({});
