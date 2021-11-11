// import moment from 'moment';
import * as yup from 'yup';
export const validateForm = () => {
  return {
    common: {
      reuqire: yup.string().required('This field is required'),
      selectAtLeast: yup.string().required('You must select 1 option'),
      atLeastOneArray: yup
        .array()
        .min(1, 'You must select 1 option')
        .required(),
    },
    email: yup
      .string()
      .required('This field is required')
      .email('Email is not valid'),
    password: yup
      .string()
      .required('This field is required')
      .min(6, 'Password must be at least 6 characters')
      .max(32, 'Password may not be greater than 32 characters'),
    confirmPassword: yup
      .string()
      .required('This field is required')
      .oneOf(
        [yup.ref('password'), null],
        'Confirm Password does not match the password',
      ),

    fullname: yup
      .string()
      .required('This field is required')
      .max(32, 'Password may not be greater than 32 characters'),
    phone: yup
      .string()
      .required('This field is required')
      .min(9, 'Phone must be at least 9 characters')
      .max(11, 'Phone may not be greater than 11 characters'),
    prefix: yup.string().required('This field is required'),
    is_volunteer: yup.number().required('This field is required'),
    dob: yup.string().required('This field is required'),
    location: yup.string().required('This field is required'),
    language: yup.string().required('This field is required'),
  };
};
