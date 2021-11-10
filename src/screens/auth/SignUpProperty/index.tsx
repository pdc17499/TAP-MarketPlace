import {AppButton, AppInput, AppQA, AppText, Header} from '@component';
import {useNavigation} from '@react-navigation/core';
import {scaleHeight} from '@util';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  _ScrollView,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import * as yup from 'yup';
import {TENANT_PROPERTY} from '@mocks';
import {USER_INFORMATION_GENDER} from '@routeName';

interface SignUpPropertyProp {}

interface screenNavigationProp {
  navigate: any;
}

const SignUpProperty = (props: SignUpPropertyProp) => {
  const navigation = useNavigation<screenNavigationProp>();
  const formInitialValues = {
    name: '',
    error: '',
  };

  const [gender, setGender] = useState('');
  const [showButton, setShowButton] = useState(false);

  const data = TENANT_PROPERTY;
  const [selectedItem, setSelectedItem] = useState({});

  const onSelect = (item: any, name?: string) => {
    setSelectedItem(item);
  };

  const validationForm = yup.object().shape({
    name: yup.string().required('This field is required'),
  });

  const handleSubmit = (values: any) => {
    navigation.navigate(USER_INFORMATION_GENDER);
  };

  const RenderForm = () => (
    <KeyboardAvoidingView>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationForm}
        validateOnChange={false}
        onSubmit={values => handleSubmit(values)}>
        {props => (
          <View>
            <View style={{marginBottom: scaleHeight(24)}}>
              <AppText style={styles.text}>{"What's your name?"}</AppText>
              <AppInput
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
    </KeyboardAvoidingView>
  );

  return (
    <ScrollView style={styles.container}>
      <Header back />
      <View style={styles.body}>
        <AppText style={styles.title}>{'Sign up'}</AppText>
        <AppText style={styles.message}>
          {'Hi, we want to get to know more about you'}
        </AppText>
        {RenderForm()}
      </View>
    </ScrollView>
  );
};

export {SignUpProperty};
