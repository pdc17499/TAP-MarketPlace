import {AppButton, AppInput, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
import {View, _ScrollView, Image} from 'react-native';
import {styles} from './style';
import * as yup from 'yup';
import {USER_INFORMATION_GENDER} from '@routeName';
import {logo} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import {setDataSignup} from '@redux';
import {DataSignupProps} from '@interfaces';
import {validateForm} from '@util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface screenNavigationProp {
  navigate: any;
}

const UserInformationName = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const dispatch = useDispatch();
  const dataSignUp: DataSignupProps = useSelector(
    (state: any) => state?.auth?.dataSignup,
  );
  const [user_name, setUsername] = useState('');

  useEffect(() => {
    setUsername(dataSignUp.user_name);
  }, [dataSignUp.user_name]);

  const formInitialValues = {
    user_name: user_name,
  };
  const validationForm = yup.object().shape({
    user_name: validateForm().common.reuqire,
  });

  const setData = (data: any) => {
    dispatch(setDataSignup({data}));
  };

  const handleSubmit = () => {
    navigation.navigate(USER_INFORMATION_GENDER);
  };

  const onChangeValue = (value: any, name?: string) => {
    setUsername(value);
  };

  const onEndEditing = (name?: string) => {
    console.log({name});
    if (name) {
      const nData: any = {...dataSignUp};
      nData[name] = user_name;
      setData(nData);
    }
  };

  const RenderForm = () => (
    <KeyboardAwareScrollView>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize
        onSubmit={handleSubmit}>
        {props => (
          <>
            <View style={{flex: 1}}>
              <Image source={logo} style={styles.logo} />
              <AppText style={styles.title}>
                {"Next, let's get to know"}
              </AppText>
              <View style={{flexDirection: 'row', marginBottom: 50}}>
                <AppText style={styles.title}>{'more about '}</AppText>
                <AppText style={styles.youTxt}>{'you'}</AppText>
              </View>
              <AppInput
                label={"What's your name?"}
                name={'user_name'}
                style={styles.input}
                value={props.values.user_name}
                onValueChange={onChangeValue}
                error={props.errors.user_name}
                onEndEditing={onEndEditing}
              />
            </View>
            {props.values.user_name !== '' ? (
              <AppButton
                customStyleButton={styles.button}
                title={'Continue '}
                size={'small'}
                iconRight={'arNext'}
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
      <View style={styles.body}>{RenderForm()}</View>
    </View>
  );
};

export {UserInformationName};
