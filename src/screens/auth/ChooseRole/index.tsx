import {list_place, rent_place} from '@assets';
import {AppButton, AppText, Header} from '@component';
import {DataSignupProps} from '@interfaces';
import {useNavigation} from '@react-navigation/core';
import {setDataSignup} from '@redux';
import {ROOM_UNIT_ADDRESS} from '@routeName';
// import {ROOM_UNIT_HOMEOWNER} from '@routeName';
import {fontFamily, SIZE} from '@util';
import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './style';

interface screenNavigationProp {
  navigate: any;
}

const ChooseRole = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (value: any) => {
    const nData: any = {...dataSignUp};
    nData['role_user'] = value;
    dispatch(setDataSignup({data: nData}));
  };

  const role = dataSignUp?.role_user || '';

  const onNext = () => {
    navigation.navigate(ROOM_UNIT_ADDRESS);
  };

  const isHomeowner = role === 'Homeowner' || role === 'Agent';

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.mainContent}>
        <View style={{flex: 1}}>
          <AppText style={styles.heading}>
            {'What are you looking for?'}
          </AppText>
          <AppText
            style={{
              fontSize: SIZE.medium_size,
              ...fontFamily.fontCampWeight600,
            }}>
            {'I want to ...'}
          </AppText>
          <View style={styles.row}>
            <AppButton
              title={'List a place'}
              typeButton={'linear'}
              image={list_place}
              imageStyle={styles.imageStyle}
              customStyleButton={styles.buttonLeft}
              isActive={isHomeowner}
              onPress={() => setData('Homeowner')}
              containerStyle={{opacity: isHomeowner ? 1 : 0.5}}
            />
            <AppButton
              title={'Rent a place'}
              typeButton={'linear'}
              image={rent_place}
              imageStyle={styles.imageStyle}
              customStyleButton={styles.buttonRight}
              isActive={role === 'Tenant'}
              onPress={() => setData('Tenant')}
              containerStyle={{opacity: role === 'Tenant' ? 1 : 0.5}}
            />
          </View>
          {isHomeowner ? (
            <>
              <AppText style={styles.title}>{'I’m a ...'}</AppText>
              <View style={styles.row}>
                <AppButton
                  title={'Agent'}
                  typeButton={'linear'}
                  containerStyle={styles.btnAgent}
                  isActive={role === 'Agent'}
                  onPress={() => setData('Agent')}
                />
                <AppButton
                  title={'Homeowner'}
                  typeButton={'linear'}
                  containerStyle={styles.btnHomeOwner}
                  isActive={role === 'Homeowner'}
                  onPress={() => setData('Homeowner')}
                />
              </View>
            </>
          ) : (
            <View />
          )}
        </View>
        {dataSignUp?.role_user !== '' && (
          <AppButton
            title={'Continue'}
            customStyleButton={{marginBottom: SIZE.medium_space}}
            iconRight={'arNext'}
            onPress={onNext}
          />
        )}
      </View>
    </View>
  );
};

export {ChooseRole};
