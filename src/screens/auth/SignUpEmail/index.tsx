import {AppButton, AppInput, AppText, Header} from '@component';
import {SIZE, validateForm} from '@util';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './style';
import * as yup from 'yup';
import {VERIFY_ACCOUNT} from '@routeName';
import {useDispatch, useSelector} from 'react-redux';
import {
  INITIAL_STATE_DATA_SIGN_UP,
  resetDataSignup,
  setDataSignup,
  signUp,
} from '@redux';
import {DataSignupProps, mockProps} from '@interfaces';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImageOrVideo} from 'react-native-image-crop-picker';

interface SignUpEmailProp {}

const SignUpEmail = (props: SignUpEmailProp) => {
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const [state, setState] = useState(INITIAL_STATE_DATA_SIGN_UP);
  useEffect(() => {
    console.log({dataSignUp});
    setState(dataSignUp);
  }, [dataSignUp]);
  // const setData = (data: any) => {
  //   dispatch(setDataSignup({data}));
  // };

  const formInitialValues = {
    email: state?.email,
    password: state?.password,
    confirm_password: state?.confirm_password,
  };

  const validationEmail = yup.object().shape({
    email: validateForm().email,
    password: validateForm().password,
    confirm_password: validateForm().confirmPassword,
  });

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...state};
      nData[name] = item;
      setState(nData);
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
    console.log(state);
    const body = {
      idType: state?.role_user,
      userInfor: {
        email: state.email,
        password: state.password,
        name: state.user_name,
        gender: state?.gender?.value,
        ageGroup: state?.age_group?.id,
        nationality: state?.country?.name,
        occupation: state?.occupation?.value,
        ethnicity: state?.ethnicity?.value,
        lifestyle: getList(state?.life_style),
        preferences: getList(state?.preferences),
        // lifestyle: {
        //   Friendliness: getList(state?.your_place),
        //   Pets: state?.have_pet?.value,
        //   Smoking: state?.smoke?.value,
        //   DietRestriction: getList(state?.diet_choice),
        //   Religion: state?.your_religion?.value,
        // },
      },
      roomDesc: {
        RentalAddress: state?.location.title,
        PlaceType: state?.kind_place?.value,
        RoomDetails: {
          RoomType: state?.room_type?.value,
          BedroomNumber: state?.bedroom_number?.value,
          BathroomNumber: state?.bathroom_number?.value,
          AttachedBathroom: state?.attached_bathroom?.value === 'Yes',
          // FloorSize: {
          //   Min: state?.floor_size_min,
          //   Max: state?.floor_size_max,
          // },
          // RoomFurnishing: state?.room_furnishing?.value,
          // FloorLevel: state?.floor_level?.value,
          AllowCook: state?.allow_cooking?.value === 'Yes',
          // builtYear: state?.built_year,
          StayWithGuest: state?.staying_with_guests?.value === 'Yes',
          KeyWords: getList(state?.key_your_place),
        },
        LeasePeriod: {
          type: state?.kind_place?.value === 'HDB',
          value: getList(state?.lease_your_place),
        },
        PicturesVideo: getUrlFiles(),
        RentalPrice: {
          type: state?.rental_price?.value,
          Min: state?.min_range_price,
          Max: state?.max_range_price,
          Price: parseInt(state?.negotiable_price || '0'),
        },
      },
    };

    dispatch(setDataSignup({data: state}));
    dispatch(signUp({body}));
    // navigation.navigate(VERIFY_ACCOUNT);
  };

  const RenderEmailForm = () => (
    <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: SIZE.padding}}>
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={validationEmail}
        validateOnChange={false}
        onSubmit={hanldeSubmit}>
        {props => (
          <>
            <View style={{flex: 1}}>
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
  );

  return (
    <View style={styles.container}>
      <Header back />
      {RenderEmailForm()}
    </View>
  );
};

export {SignUpEmail};
