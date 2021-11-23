import {IconCheckedBox, IconClear, IconUncheckedBox} from '@assets';
import {AppButton, AppModal, AppText} from '@component';
import {AppModalCountryProps, AppModalProps} from '@interfaces';
import {
  colors,
  countryDial,
  DEVICE,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
} from '@util';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

export const AppModalCountry = (props: AppModalCountryProps) => {
  const [visible, setVisible] = useState(false);
  const {
    value,
    customStyleButton,
    customStyleTitle,
    customStyleContainer,
    label,
    onValueChange,
    name,
  } = props;

  const [search, setSearch] = useState('');

  // console.log({value});

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const onSelectCountry = (country: any) => {
    onValueChange(country, name);
    closeModal();
  };

  const containerStyle = [styles.container, customStyleContainer];
  const buttonStyle = [styles.button, customStyleButton];
  const titleStyle = [
    value ? styles.txtButton : styles.txtPlaceholder,
    customStyleTitle,
  ];

  const renderCountry = ({item, index}: any) => {
    if (item.name.includes(search)) {
      return (
        <Pressable
          style={styles.countryView}
          onPress={() => onSelectCountry(item)}>
          <AppText>{`${item.flag}   ${item.name}`}</AppText>
        </Pressable>
      );
    }

    return <View />;
  };

  return (
    <>
      <View style={containerStyle}>
        <Pressable onPress={openModal}>
          {label && <AppText style={styles.label}>{label}</AppText>}
          <View style={buttonStyle}>
            <AppText style={titleStyle}>{value || 'N/A'}</AppText>
          </View>
        </Pressable>
      </View>
      <Modal
        isVisible={visible}
        backdropOpacity={0.3}
        animationOutTiming={400}
        animationInTiming={400}
        style={{marginHorizontal: 0, marginBottom: 0}}>
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <Pressable onPress={closeModal}>
              <IconClear />
            </Pressable>
            <TextInput
              placeholder={'Search country'}
              style={styles.inputSearch}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <FlatList
            data={countryDial}
            renderItem={renderCountry}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZE.padding,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    width: DEVICE.width,
    left: 0,
    top: 0,
    paddingHorizontal: SIZE.base_space,
    paddingTop: 10,
  },
  label: {
    color: colors.secondPrimary,
    fontSize: scaleSize(15),
    ...fontFamily.fontCampWeight500,
  },
  button: {
    marginTop: SIZE.base_space / 2,
    paddingBottom: SIZE.padding,
  },
  txtButton: {
    ...fontFamily.fontWeight500,
    fontSize: SIZE.base_size + 1,
    color: colors.textPrimary,
  },
  txtPlaceholder: {
    ...fontFamily.fontWeight400,
    fontSize: SIZE.base_size + 1,
    color: '#A7A7A7',
  },
  bgUnderline: {
    backgroundColor: 'transparent',
    minHeight: 'auto',
    alignItems: 'flex-end',
    alignSelf: 'center',
    borderRadius: 0,
    marginTop: SIZE.medium_space - 4,
  },
  titleUnderline: {
    color: colors.textSecondPrimary,
    ...fontFamily.fontCampWeight500,
    lineHeight: SIZE.base_size * 1.6,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.textSecondPrimary,
  },
  inputSearch: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 15,
    ...fontFamily.fontWeight500,
    fontSize: SIZE.base_size,
  },
  countryView: {
    borderTopWidth: 1,
    borderTopColor: colors.borderProfileList,
    paddingVertical: 8,
  },
});
