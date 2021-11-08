import {list_place, rent_place} from '@assets';
import {AppButton, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import {colors, scaleWidth, SIZE} from '@util';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';

interface screenNavigationProp {
  navigate: any;
}

const ChooseRole = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispath = useDispatch();
  const [role, setRole] = useState(0);

  const onNext = () => {};

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.mainContent}>
        <View style={{flex: 1}}>
          <AppText style={styles.heading}>
            {'What are you looking for?'}
          </AppText>
          <AppText style={{fontSize: SIZE.medium_size}}>
            {'I want to ...'}
          </AppText>
          <View style={styles.row}>
            <AppButton
              title={'List a place'}
              typeButton={'linear'}
              image={list_place}
              imageStyle={styles.imageStyle}
              customStyleButton={styles.buttonLeft}
              isActive={role === 1 || role === 2}
              onPress={() => setRole(1)}
            />
            <AppButton
              title={'Rent a place'}
              typeButton={'linear'}
              image={rent_place}
              imageStyle={styles.imageStyle}
              customStyleButton={styles.buttonRight}
              isActive={role === 3}
              onPress={() => setRole(3)}
            />
          </View>
          {role === 1 || role === 2 ? (
            <>
              <AppText style={styles.title}>{'I’m a ...'}</AppText>
              <View style={styles.row}>
                <AppButton
                  title={'Agent'}
                  typeButton={'linear'}
                  customStyleButton={styles.btnAgent}
                  isActive={role === 2}
                  onPress={() => setRole(2)}
                />
                <AppButton
                  title={'Homeowner'}
                  typeButton={'linear'}
                  customStyleButton={styles.btnHomeOwner}
                  isActive={role === 1}
                  onPress={() => setRole(1)}
                />
              </View>
            </>
          ) : (
            <View />
          )}
        </View>
        <AppButton
          title={'Continue'}
          customStyleButton={{marginBottom: SIZE.medium_space}}
        />
      </View>
    </View>
  );
};

export {ChooseRole};
