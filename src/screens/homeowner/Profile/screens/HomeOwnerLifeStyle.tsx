import {
  AppButton,
  AppInput,
  AppModal,
  AppPicker,
  AppSlider,
  AppText,
  Header,
  ModalCheckedBox,
  PropertyChoices,
} from '@component';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  colors,
  DEVICE,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  validateForm,
} from '@util';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {UserInfo} from '@interfaces';
import {saveDataUser} from '@redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import {IconCheckedBox, IconTick, IconUncheckedBox} from '@assets';
import {values} from 'lodash';

interface HomeOwnerLifeStyleProp {}

interface screenNavigationProp {
  navigate: any;
}

const HomeOwnerLifeStyle = (props: HomeOwnerLifeStyleProp) => {
  const dispatch = useDispatch();
  const list = ROOM_UNIT_HOWNER;
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);
  const [users, setUsers] = useState<UserInfo>();
  const [showButton, setShowButton] = useState(false);

  console.log({users});

  useEffect(() => {
    setUsers(dataUser);
    console.log('dulieu', dataUser);
  }, [dataUser]);

  const formInitialValues = {
    place: users?.lifestyle?.Friendliness,
    pet: users?.lifestyle?.Pets,
    smoking: users?.lifestyle?.Smoking,
    diet: users?.lifestyle?.DietRestriction,
    religion: users?.lifestyle?.religion,
  };

  const validationForm = yup.object().shape({
    // place: validateForm().common.selectAtLeast,
    // pet: validateForm().common.atLeastOnePicker,
    // smoking: validateForm().common.atLeastOnePicker,
    // diet: validateForm().common.atLeastOnePicker,
    // religion: validateForm().common.atLeastOnePicker,
  });

  const onChangeText = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...dataUser};
      nData[name] = item;
      setData(nData);
    }
    setShowButton(true);
  };

  const setData = (data: any) => {
    // dispatch(saveDataUser(data));
  };

  const onSubmit = () => {};

  const RenderForm = () => (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize
        onSubmit={onSubmit}>
        {(props: any) => (
          <>
            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: colors.borderProfileList,
                paddingTop: 10,
              }}>
              {/* <AppModal
                label={'My place is'}
                customTitle={<PropertyChoices data={props.values.place} />}
                customStyleContainer={styles.modal}>
                <ModalCheckedBox data={list.your_place} />
              </AppModal> */}

              <ModalCheckedBox label={'My place is'} data={list.your_place} />

              <AppPicker
                value={props.values.pet}
                name={'pet'}
                label={'Pets'}
                onValueChange={onChangeText}
                items={list.have_pets}
                error={props.errors.pet}
                stylePicker={'linear'}
              />

              <AppPicker
                value={props.values.smoking}
                name={'smoking'}
                label={'Smoking'}
                onValueChange={onChangeText}
                items={list.smoking}
                error={props.errors.smoking}
                stylePicker={'linear'}
              />

              {/* <AppModal
                label={'Diet-choices'}
                // customTitle={<PropertyChoices data={props.values.diet} />}
                customStyleContainer={styles.modal}>
                <ModalCheckedBox data={list.diet_choices} />
              </AppModal>

              <AppModal
                label={'Religion'}
                customTitle={<AppText>{'Religions'}</AppText>}
                customStyleContainer={styles.modal}>
                <ModalCheckedBox data={list.religions} />
              </AppModal> */}
            </View>
            {showButton ? (
              <AppButton
                customStyleButton={styles.button}
                title={'Save change'}
                size={'small'}
                iconRight={'tick'}
                onPress={props.handleSubmit}
              />
            ) : null}
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Lifestyle & Preferences'}</AppText>
        {RenderForm()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingHorizontal: SIZE.padding,
  },
  title: {
    fontSize: scaleSize(24),
    ...fontFamily.fontWeight500,
    marginTop: SIZE.base_space,
    marginBottom: scaleWidth(27),
    color: colors.textPrimary,
  },
  message: {
    fontSize: SIZE.medium_size,
    ...fontFamily.fontCampWeight600,
    lineHeight: scaleWidth(31),
    color: colors.textPrimary,
  },
  text: {
    fontSize: scaleSize(15),
    ...fontFamily.fontWeight500,
    lineHeight: scaleWidth(15),
    marginBottom: scaleWidth(10),
    color: colors.primary,
  },
  text2: {
    fontSize: scaleSize(15),
    ...fontFamily.fontWeight500,
    lineHeight: scaleWidth(15),
    color: colors.primary,
    marginBottom: -5,
  },
  input: {},
  inputAge: {
    marginBottom: scaleWidth(30),
    width: scaleWidth(106),
  },
  button: {
    marginTop: SIZE.medium_space,
    marginBottom: SIZE.medium_space,
  },
  skip: {
    marginBottom: SIZE.medium_space,
  },
  code: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgInput,
    borderRadius: 8,
    paddingHorizontal: 13,
    minHeight: SIZE.input_height,
  },
  birthday: {
    fontSize: scaleSize(14),
    color: colors.textSecondPrimary,
    position: 'absolute',
    bottom: 5,
  },
  modal: {},
  modalTxt: {
    marginRight: scaleWidth(15),
    alignSelf: 'center',
  },
});

export {HomeOwnerLifeStyle};
