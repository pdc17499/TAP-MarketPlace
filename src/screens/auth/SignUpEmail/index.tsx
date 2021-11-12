import { AppButton, AppInput, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { scaleHeight, SIZE, validateForm } from '@util';
import { Formik } from 'formik';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './style';
import * as yup from 'yup';
import { VERIFY_ACCOUNT } from '@routeName';
import { useDispatch, useSelector } from 'react-redux';
import { setDataSignup, signUp } from '@redux';
import { DataSignupProps, mockProps } from '@interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageOrVideo } from 'react-native-image-crop-picker';

interface SignUpEmailProp { }

interface screenNavigationProp {
  navigate: any;
}

const SignUpEmail = (props: SignUpEmailProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const setData = (data: any) => {
    dispatch(setDataSignup({ data }));
  };

  const formInitialValues = {
    email: dataSignUp?.email,
    password: dataSignUp?.password,
    confirm_password: dataSignUp?.confirm_password,
  };

  const validationEmail = yup.object().shape({
    email: validateForm().email,
    password: validateForm().password,
    confirm_password: validateForm().confirmPassword,
  });

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = { ...dataSignUp };
      nData[name] = item;
      setData(nData);
    }
  };

  const getUrlFiles = () => {
    const files = dataSignUp?.list_photo;
    if (files?.length > 0) {
      const urls: string[] = [];
      files.map((file: ImageOrVideo) => {
        urls.push(file.path);
      });

      return urls;
    }
  };

  const getList = (list: Array<mockProps>) => {
    if (list?.length > 0) {
      const values: string[] = [];
      list.map((file: mockProps) => {
        if (file.value) values.push(file.value);
      });

      return values;
    }
  };

  const hanldeSubmit = () => {
    // const body = {
    //   idType: 'Homeowner',
    //   userInfor: {
    //     email: dataSignUp.email,
    //     password: dataSignUp.password,
    //     name: dataSignUp.user_name,
    //     gender: dataSignUp?.gender?.value,
    //     ageGroup: dataSignUp?.age_group?.id,
    //     nationality: dataSignUp?.country?.name,
    //     occupation: dataSignUp?.occupation?.label,
    //     ethnicity: dataSignUp?.ethnicity?.label,
    //     lifestyle: {
    //       Friendliness: getList(dataSignUp?.your_place),
    //       Pets: dataSignUp?.have_pet?.value,
    //       Smoking: dataSignUp?.smoke?.value,
    //       DietRestriction: getList(dataSignUp?.diet_choice),
    //       Religion: dataSignUp?.your_religion?.value,
    //     },
    //   },
    //   roomDesc: {
    //     RentalAddress: dataSignUp?.location.title,
    //     PropertyType: dataSignUp?.kind_place?.value,
    //     RoomDetails: {
    //       RoomType: dataSignUp?.room_type?.value,
    //       BedroomNumber: dataSignUp?.bedroom_number?.value,
    //       BathroomNumber: dataSignUp?.bathroom_number?.value,
    //       AttachedBathroom: dataSignUp?.attached_room?.id === 1,
    //       FloorSize: {
    //         Min: dataSignUp?.floor_size_min,
    //         Max: dataSignUp?.floor_size_max,
    //       },
    //       RoomFurnishing: dataSignUp?.room_furnishing?.value,
    //       FloorLevel: dataSignUp?.floor_level?.value,
    //       allowCook: dataSignUp?.attached_room?.id === 1,
    //       builtYear: dataSignUp?.built_year,
    //       keyWords: getList(dataSignUp?.key_your_place),
    //     },
    //     LeasePeriod: {
    //       type: dataSignUp?.staying_with_guests?.id === 1,
    //       Min: 9,
    //       Max: 12,
    //     },
    //     PicturesVideo: getUrlFiles(),
    //     RentalPrice: {
    //       type: dataSignUp?.rental_price?.value,
    //       Min: dataSignUp?.min_range_price,
    //       Max: dataSignUp?.max_range_price,
    //       Price: dataSignUp?.negotiable_price,
    //     },
    //   },
    // };

    // dispatch(signUp({body}));
    navigation.navigate(VERIFY_ACCOUNT);
  };

  const RenderEmailForm = () => (

    <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: SIZE.padding }} >
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={validationEmail}
        validateOnChange={false}
        onSubmit={hanldeSubmit}>
        {props => (
          <>
            <View style={{ flex: 1 }}>
              <AppText style={styles.title}>{'Sign up'}</AppText>
              <AppInput
                label={'Email'}
                placeholder={'Enter your email'}
                typeInput={'default'}
                iconLeft={'email'}
                name={'email'}
                value={props.values.email}
                onValueChange={onChangeValue}
                error={props.errors.email}
                customStyleLabel={styles.customStyleLabel}
              />

              <AppInput
                label={'Password'}
                secureTextEntry={true}
                showEye={true}
                placeholder={'Enter your password'}
                iconLeft={'key'}
                name={'password'}
                value={props.values.password}
                onValueChange={onChangeValue}
                error={props.errors.password}
                customStyleLabel={styles.customStyleLabel}
              />

              <AppInput
                label={'Confirm Password'}
                name={'confirm_password'}
                secureTextEntry={true}
                showEye={true}
                placeholder={'Confirm your password'}
                iconLeft={'key'}
                value={props.values.confirm_password}
                onValueChange={onChangeValue}
                error={props.errors.confirm_password}
                customStyleLabel={styles.customStyleLabel}
              />

              <AppButton
                customStyleButton={styles.button}
                title={'Continue '}
                size={'small'}
                iconRight={'arNext'}
                onPress={props.handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  )


  return (
    <View style={styles.container}>
      <Header back />
      {RenderEmailForm()}
    </View>
  );
};

export { SignUpEmail };
