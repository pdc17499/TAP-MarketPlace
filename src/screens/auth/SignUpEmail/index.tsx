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
  const isTenant = dataSignUp?.role_user === 'Tenant';
  const isAgent = dataSignUp?.role_user === 'Agent';
  useEffect(() => {
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
    confirm_password: yup
      .string()
      .required('This field is required')
      .oneOf(
        [yup.ref('password'), null],
        'Confirm Password does not match the password',
      ),
  });

  const onChangeValue = (item: any, name?: string) => {
    if (name) {
      const nData: any = {...state};
      nData[name] = item;
      setState(nData);
    }
  };

  // const getUrlFiles = () => {
  //   const files = dataSignUp?.list_photo;
  //   if (files?.length > 0) {
  //     const urls: string[] = [];
  //     files.map((file: any) => {
  //       urls.push(file.uri);
  //     });

  //     return urls;
  //   }
  // };

  const hanldeSubmit = () => {
    console.log(state);
    const isPriceRange = state?.rental_price?.value === 'Price range';
    const RentalPrice = {
      type: state?.rental_price?.value,
      Min: isPriceRange ? state?.min_range_price : 0,
      Max: isPriceRange ? state?.max_range_price : 0,
      Price: isPriceRange ? 0 : parseInt(state?.negotiable_price || '0'),
    };

    const BudgetPrice = {
      Min: state?.min_range_price,
      Max: state?.max_range_price,
    };

    const RoomDetails = {
      RoomType: state?.room_type?.value,
      BedroomNumber: state?.bedroom_number?.value,
      BathroomNumber: state?.bathroom_number?.value,
      AttachedBathroom: state?.attached_bathroom?.value === 'Yes',
      AllowCook: state?.allow_cooking?.value === 'Yes',
      StayWithGuest: state?.staying_with_guests?.value === 'Yes',
      KeyWords: state?.key_your_place,
    };

    const RoomDetailsAgent = {
      RoomType: state?.room_type?.value,
      BedroomNumber: state?.bedroom_number?.value,
      BathroomNumber: state?.bathroom_number?.value,
      AttachedBathroom: state?.attached_bathroom?.value === 'Yes',
      AllowCook: state?.allow_cooking?.value === 'Yes',
      StayWithGuest: state?.staying_with_guests?.value === 'Yes',
      KeyWords: state?.key_your_place,
      homeownerName: state?.homeowner_name,
      homeownerGender: state?.homeowner_gender?.value,
    };

    const RoomDetailsTenant = {
      RoomType: state?.room_type?.value,
      BedroomNumber: state?.bedroom_number_tenant,
      BathroomNumber: state?.bathroom_number_tenant,
      AttachedBathroom: state?.attached_bathroom?.value,
      AllowCook: state?.allow_cooking?.value === 'Yes',
      StayWithGuest: state?.staying_with_guests?.value === 'Yes',
      KeyWords: state?.key_your_place,
    };

    const agenyInfo = {
      agencyName: state?.agency_name,
      licenseNumber: state?.license_no,
      salespersonNumber: state?.sale_person_no,
      gender: state?.gender,
    };

    const body: any = {
      idType: state?.role_user,
      userInfor: {
        email: state.email,
        password: state.password,
        name: state.user_name,
        gender: state?.gender?.value,
        ageGroup: state?.age_group?.id,
        nationality: state?.country,
        occupation: state?.occupation?.value,
        ethnicity: state?.ethnicity?.value,
        lifestyle: state?.life_style,
        preferences: state?.preferences,
      },
      roomDesc: {
        RentalAddress: state?.location.title,
        Location: {
          Latitude: state?.location.lat,
          Longitude: state?.location.long,
        },
        PlaceType: isTenant
          ? state?.kind_place_tenant
          : state?.kind_place?.value,
        LeasePeriod: {
          type: state?.kind_place?.value === 'HDB',
          value: state?.lease_your_place,
        },
      },
    };

    if (isTenant) {
      body.roomDesc.BudgetPrice = BudgetPrice;
      body.roomDesc.RoomProperty = RoomDetailsTenant;
    } else {
      if (isAgent) {
        const nUserInfo = {...body.userInfor, ...agenyInfo};
        body.userInfor = nUserInfo;
      }
      body.roomDesc.RentalPrice = RentalPrice;
      body.roomDesc.RoomDetails = isAgent ? RoomDetailsAgent : RoomDetails;
      body.roomDesc.PicturesVideo = state?.list_photo;
    }

    console.log({body, isTenant, isAgent});
    dispatch(signUp({body, isTenant, isAgent}));
    // navigation.navigate(VERIFY_ACCOUNT);
  };

  const RenderEmailForm = () => (
    <KeyboardAwareScrollView style={styles.keyboard}>
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
                // showEye={true}
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
