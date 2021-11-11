import { AppButton, AppInput, AppQA, AppText, Header } from '@component';
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  _ScrollView,
  Image,
  ScrollView,
} from 'react-native';
import { styles } from './style';
import * as yup from 'yup';
import { TENANT_PROPERTY } from '@mocks';
import { USER_INFORMATION_GENDER } from '@routeName';
import { logo } from '@assets';


interface SignUpPropertyProp { }

interface screenNavigationProp {
  navigate: any;

}

const SignUpProperty = () => {
  const navigation = useNavigation<screenNavigationProp>();
  const formInitialValues = {
    name: '',
    error: '',
  };

  const validationForm = yup.object().shape({
    name: yup.string().required('This field is required'),
  });

  const handleSubmit = (name: string) => {
    navigation.navigate(USER_INFORMATION_GENDER, { name: name });


  };

  const RenderForm = () => (
    <KeyboardAvoidingView>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        onSubmit={values => handleSubmit(values.name)}>
        {props => (
          <View style={{ height: '100%' }}>
            <View style={{ flex: 1 }}>
              <Image source={logo} style={styles.logo} />
              <AppText style={styles.title}>{"Next, let's get to know"}</AppText>
              <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                <AppText style={styles.title}>{"more about "}</AppText>
                <AppText style={styles.youTxt}>{"you"}</AppText>
              </View>
              <AppInput
                label={"What's your name?"}
                style={styles.input}
                value={props.values.name}
                onValueChange={props.handleChange('name')}
                error={props.errors.error}
              />
            </View>
            {props.values.name !== '' ? (
              <AppButton
                customStyleButton={styles.button}
                title={'Continue '}
                size={'small'}
                iconRight={'arNext'}
                onPress={props.handleSubmit}
              />
            ) : null}
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView >
  );

  return (
    <View style={styles.container}>
      <Header back />
      <View style={styles.body} >
        {RenderForm()}
      </View>
    </View>
  );
};

export { SignUpProperty };
