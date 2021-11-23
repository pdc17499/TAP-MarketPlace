import {DownIcon, IconClear} from '@assets';
import {AppText} from '@component';
import {AppModalCountryProps} from '@interfaces';
import {
  colors,
  countryDial,
  DEVICE,
  fontFamily,
  scaleSize,
  SIZE,
  STYLE,
} from '@util';
import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, View, TextInput} from 'react-native';
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
    type,
    typeButton,
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
    if (type === 'country') {
      onValueChange(country.name, name);
    } else {
      onValueChange(country.dial_code, name);
    }
    closeModal();
  };

  const isLinear = typeButton === 'linear';
  const containerStyle = [
    isLinear ? styles.containerLinear : styles.container,
    customStyleContainer,
  ];
  const buttonStyle = [
    isLinear ? styles.button : styles.buttonBase,
    customStyleButton,
  ];
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
          <AppText numberOfLines={2}>
            {type === 'country'
              ? `${item.flag}  ${item.name}`
              : `(${item.dial_code})   ${item.name}`}
          </AppText>
        </Pressable>
      );
    }

    return <View />;
  };

  return (
    <>
      <Pressable onPress={openModal} style={containerStyle}>
        {label && (
          <AppText style={isLinear ? styles.label : styles.labelBase}>
            {label}
          </AppText>
        )}
        <View style={buttonStyle}>
          <AppText style={titleStyle}>{value || 'N/A'}</AppText>
          {typeButton === 'base' && (
            <View style={{marginLeft: 5}}>
              <DownIcon />
            </View>
          )}
        </View>
      </Pressable>
      <Modal
        isVisible={visible}
        backdropOpacity={0.3}
        animationOutTiming={400}
        animationInTiming={400}
        style={{marginHorizontal: 0, marginBottom: 0}}>
        <View style={styles.modal}>
          <View style={styles.searchView}>
            <Pressable onPress={closeModal} hitSlop={STYLE.hitSlop}>
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
  containerLinear: {
    paddingTop: SIZE.padding,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
  },
  container: {
    paddingTop: SIZE.padding,
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
  labelBase: {
    color: colors.primary,
    fontSize: scaleSize(15),
    ...fontFamily.fontWeight500,
  },
  button: {
    marginTop: SIZE.base_space / 2,
    paddingBottom: SIZE.padding,
  },
  buttonBase: {
    marginTop: SIZE.base_space,
    backgroundColor: colors.bgInput,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0,
    minHeight: SIZE.input_height,
    alignItems: 'center',
    paddingHorizontal: SIZE.base_space,
    borderRadius: 8,
    paddingTop: 5,
  },
  txtButton: {
    ...fontFamily.fontWeight500,
    fontSize: scaleSize(17),
    color: colors.textPrimary,
  },
  txtPlaceholder: {
    ...fontFamily.fontWeight400,
    fontSize: scaleSize(17),
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
  searchView: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
});
