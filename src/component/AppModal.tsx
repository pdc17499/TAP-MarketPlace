import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {AppText} from './AppText';
import {colors, fontFamily, scaleSize, SIZE} from '@util';
import {debounce} from 'lodash';
import {AppModalProps} from '@interfaces';
import Modal from 'react-native-modal';
import {AppButton} from '@component';

const AppModal = React.memo((props: AppModalProps) => {
  const [visible, setVisible] = useState(false);
  const {
    title,
    customStyleButton,
    customStyleTitle,
    customStyleContainer,
    label,
    children,
    customTitle,
    onPressDone,
    error,
  } = props;

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const onDone = () => {
    closeModal();
    if (onPressDone) onPressDone();
  };

  const containerStyle = [styles.container, customStyleContainer];
  const buttonStyle = [styles.button, customStyleButton];
  const titleStyle = [
    styles.txtButton,
    {color: !title ? colors.textSecondPrimary : colors.textPrimary},
    customStyleTitle,
  ];

  return (
    <>
      <View style={containerStyle}>
        <Pressable onPress={openModal}>
          {label && <AppText style={styles.label}>{label}</AppText>}
          <View style={buttonStyle}>
            {customTitle ? (
              customTitle
            ) : (
              <AppText style={titleStyle}>{title || 'N/A'}</AppText>
            )}
          </View>
        </Pressable>
        <Modal
          isVisible={visible}
          backdropOpacity={0.3}
          animationOutTiming={400}
          animationInTiming={400}>
          <Pressable style={styles.modal} onPress={closeModal} />
          <View style={styles.modalBox}>
            {children}
            <AppButton
              onPress={onDone}
              title={'Done'}
              size={'small'}
              iconRight={'tick'}
            />
          </View>
        </Modal>
      </View>
      {error && <AppText style={styles.error}>{error}</AppText>}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZE.padding,
    borderBottomColor: colors.borderProfileList,
    borderBottomWidth: 1,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  modalBox: {
    backgroundColor: 'white',
    padding: SIZE.padding,
    borderRadius: 10,
  },
  label: {
    color: colors.secondPrimary,
    fontSize: scaleSize(14.5),
    ...fontFamily.fontCampWeight500,
  },
  button: {
    marginTop: SIZE.base_space / 2,
    paddingBottom: SIZE.padding,
  },
  txtButton: {
    ...fontFamily.fontWeight500,
    fontSize: SIZE.base_size + 1,
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
  error: {
    marginTop: 6,
    color: colors.red,
    fontSize: scaleSize(15),
  },
});

export {AppModal};
