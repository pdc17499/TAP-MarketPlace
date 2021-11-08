import {AppButton, AppInput, AppText, Header} from '@component';
import {mockProps} from '@interfaces';
import {HOME_OWNER_PROPERTY} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

interface screenNavigationProp {
  navigate: any;
}

const StepRoomDetail = (props: any) => {
  const navigation = useNavigation<screenNavigationProp>();
  const [location, setLocation] = useState('');

  const onChangeLocation = (text: string) => {
    setLocation(text);
  };

  const getMyLocation = () => {
    props.onNext();
  };

  const data = HOME_OWNER_PROPERTY;

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {'What kind of place will you host?'}
      </AppText>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginRight: -16}}>
        {data.place.map((item: mockProps) => {
          return (
            <AppButton
              typeButton={'linear'}
              title={item.value}
              customStyleButton={{
                paddingHorizontal: 24,
                marginRight: 16,
                marginBottom: 16,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export {StepRoomDetail};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  title: {
    ...fontFamily.fontCampWeight600,
    fontSize: SIZE.medium_size,
    lineHeight: SIZE.medium_size * 1.3,
    marginBottom: SIZE.padding,
    marginTop: SIZE.padding,
    maxWidth: scaleWidth(240),
  },
});
