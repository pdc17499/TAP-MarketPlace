import {AppButton, AppInput, AppQA, AppText, Header} from '@component';
import {homePropertyProps, mockProps} from '@interfaces';
import {HOME_OWNER_PROPERTY} from '@mocks';
import {useNavigation} from '@react-navigation/core';
import {colors, fontFamily, scaleWidth, SIZE} from '@util';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

interface screenNavigationProp {
  navigate: any;
}

interface stepProps {
  onNext: () => void;
  property: homePropertyProps;
  setProperty: any;
}

const StepPrice = (props: stepProps) => {
  const navigation = useNavigation<screenNavigationProp>();
  const [location, setLocation] = useState('');
  const {onNext, property, setProperty} = props;

  const data = HOME_OWNER_PROPERTY;

  const onSelect = (item: mockProps, name?: string) => {
    if (name) {
      const nProperty: any = {...property};
      nProperty[name] = item;
      setProperty(nProperty);
    }
  };

  const renderFixedPrice = () => {
    return (
      <AppInput
        value={property.fixed_price}
        name={'fixed_price'}
        onValueChange={onSelect}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppQA
        data={data.place}
        title={'What kind of place will you host?'}
        selected={property.kind_place}
        onSelect={onSelect}
        typeList={'row'}
      />

      <AppQA
        data={data.rentalPrice}
        title={'What is your rental price?'}
        selected={property.rental_price}
        onSelect={onSelect}
        typeList={'column'}
        customStyleTitle={{maxWidth: 'auto'}}
      />
    </View>
  );
};

export {StepPrice};

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
