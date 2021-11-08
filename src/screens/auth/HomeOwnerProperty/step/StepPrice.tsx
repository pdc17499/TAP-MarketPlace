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
    // if (name) {
    const nProperty: any = {...property};
    nProperty['rental_price'] = item;
    setProperty(nProperty);
    // }
  };

  const renderFixedPrice = () => {
    return (
      <AppInput
        value={property.fixed_price}
        name={'fixed_price'}
        iconLeft={'dolar'}
        onValueChange={onSelect}
      />
    );
  };

  const renderPriceRange = () => {
    return (
      <View>
        <AppInput
          value={property.min_range}
          name={'min_range'}
          iconLeft={'dolar'}
          onValueChange={onSelect}
          editable={false}
        />
        <AppInput
          value={property.max_range}
          name={'max_range'}
          iconLeft={'dolar'}
          onValueChange={onSelect}
          editable={false}
        />
      </View>
    );
  };

  const renderChildren = () => {
    if (property.rental_price?.id === 1) {
      return renderFixedPrice();
    } else if (property.rental_price.id === 2) {
      return renderPriceRange();
    }
  };

  return (
    <View style={styles.container}>
      <AppQA
        data={data.rentalPrice}
        title={'What is your rental price?'}
        selected={property.rental_price}
        onSelect={onSelect}
        typeList={'column'}
        children={renderChildren()}
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
