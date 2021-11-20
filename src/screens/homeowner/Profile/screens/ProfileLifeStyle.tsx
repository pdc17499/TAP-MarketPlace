import {AppQA, AppTabview, AppText, Header, AppButton} from '@component';
import React, {useEffect, useRef, useState} from 'react';
import {View, Pressable, StyleSheet, ScrollView} from 'react-native';
import {IconTabActive} from '@assets';
import {
  colors,
  fontFamily,
  scaleSize,
  scaleWidth,
  SIZE,
  STYLE,
  validateForm,
} from '@util';
import {SceneMap, TabView} from 'react-native-tab-view';
import {UserInfo} from '@interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {ROOM_UNIT_HOWNER} from '@mocks';
import {updateUserInfo} from '@redux';
import {Formik, FormikValues} from 'formik';
import * as yup from 'yup';

const ProfileLifeStyle = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserInfo>();
  const [routes] = React.useState([
    {key: 'first', title: 'Lifestyle'},
    {key: 'second', title: 'Preferences'},
  ]);
  const dataUser: UserInfo = useSelector((state: any) => state?.auth?.user);
  const formRef: any = useRef<FormikValues>();

  useEffect(() => {
    setUser(dataUser);
  }, [dataUser]);

  const list = ROOM_UNIT_HOWNER;
  const formInitialValues = {
    lifestyle: user?.lifestyle,
    preferences: user?.preferences,
  };
  const validationSchema = yup.object().shape({
    lifestyle: validateForm().common.atLeastOneArray,
    preferences: validateForm().common.atLeastOneArray,
  });

  const onSubmit = (values: any) => {
    console.log({values});
    const body = {
      lifestyle: user?.lifestyle,
      preferences: user?.preferences,
    };
    dispatch(updateUserInfo({body, id: user?.id}));
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const renderLifeStyle = (data: any, name: string) => {
    return (
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}>
        <Formik
          innerRef={formRef}
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize
          onSubmit={onSubmit}>
          {(props: any) => (
            <AppQA
              isFlex
              data={data}
              value={user}
              setValue={setUser}
              typeList={'even'}
              name={name}
              error={props.errors[name]}
              isMultiChoice
              showIconLeft
              customStyleButton={styles.customStyleButton}
              customStyleTitleButton={styles.customStyleTitleButton}
            />
          )}
        </Formik>
      </ScrollView>
    );
  };

  const renderScene = SceneMap({
    first: () => renderLifeStyle(list.life_style, 'lifestyle'),
    second: () => renderLifeStyle(list.preferences, 'preferences'),
  });

  return (
    <>
      <Header back />
      <View style={styles.container}>
        <AppText style={styles.heading}>{'Lifestyle & Preferences'}</AppText>
        <AppTabview renderScene={renderScene} routes={routes} />
        <AppButton
          title={'Save change'}
          size={'small'}
          iconRight={'tick'}
          containerStyle={{marginBottom: SIZE.medium_space}}
          onPress={handleSubmit}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: SIZE.padding,
    right: SIZE.padding,
    bottom: SIZE.medium_space,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: SIZE.padding,
  },
  scrollview: {
    flex: 1,
  },
  customContainer: {
    backgroundColor: colors.bgSreen,
  },
  contentContainerStyle: {
    paddingBottom: SIZE.big_space + SIZE.padding,
  },
  heading: {
    ...fontFamily.fontCampWeight500,
    fontSize: SIZE.medium_size,
    lineHeight: scaleSize(28),
    marginTop: SIZE.base_space,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabView: {
    paddingVertical: scaleWidth(35),
    paddingBottom: scaleWidth(20),
    alignItems: 'center',
  },
  tabTitle: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
    marginBottom: 6,
  },
  tabTitleActive: {
    ...fontFamily.fontCampWeight600,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  subViewInactive: {
    position: 'absolute',
    left: 8,
    top: 8,
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: SIZE.base_space / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInactive: {
    ...fontFamily.fontCampWeight500,
    color: colors.textSecondPrimary,
    marginLeft: SIZE.base_space / 2,
  },
  line: {
    height: 1,
    backgroundColor: colors.borderPrimary,
    marginBottom: SIZE.medium_space,
  },
  customStyleButton: {
    flexDirection: 'column',
    paddingVertical: SIZE.base_space,
  },
  customStyleTitleButton: {lineHeight: SIZE.base_size * 1.8},
});

export {ProfileLifeStyle};
