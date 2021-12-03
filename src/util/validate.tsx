// import moment from 'moment';
import * as yup from 'yup';
export const validateForm = () => {
  return {
    common: {
      reuqire: yup.string().required('This field is required'),
      selectAtLeast: yup.string().required('You must select 1 option'),
      atLeastOnePicker: yup
        .string()
        .typeError('You must select 1 option')
        .required('You must select 1 option'),
      atLeastOneArray: yup
        .array()
        .min(1, 'You must select 1 option')
        .required(),
      compareNA: yup.string().test({
        name: 'compareNA',
        message: 'You must select 1 option',
        test: function (value) {
          return value !== 'N/A';
        },
      }),
    },
    email: yup
      .string()
      .required('This field is required')
      .email('Email is not valid'),
    password: yup
      .string()
      .required('This field is required')
      .min(8, 'Password must be at least 8 characters')
      .max(32, 'Password may not be greater than 32 characters'),
    newPassword: yup
      .string()
      .required('This field is required')
      .min(8, 'Password must be at least 8 characters')
      .max(32, 'Password may not be greater than 32 characters'),
    confirmPassword: yup
      .string()
      .required('This field is required')
      .oneOf(
        [yup.ref('new_password'), null],
        'Confirm Password does not match the password',
      ),
    fullname: yup
      .string()
      .required('This field is required')
      .max(32, 'Password may not be greater than 32 characters'),
    phone: yup
      .string()
      .required('This field is required')
      .test({
        name: 'validatePhoneCode',
        message: 'Code number is required',
        test: function (value: any) {
          const index = value.indexOf(' ');
          return index > 0;
        },
      })
      .test({
        name: 'validatePhone',
        message: 'Phone number is required',
        test: function (value: any) {
          const index = value.indexOf(' ');
          if (index <= 0) {
            return false;
          } else {
            const nPhone = value.substring(index + 1, value.length);
            return nPhone !== '';
          }
        },
      }),
    prefix: yup.string().required('This field is required'),
    is_volunteer: yup.number().required('This field is required'),
    dob: yup.string().required('This field is required'),
    location: yup.string().required('This field is required'),
    language: yup.string().required('This field is required'),
  };
};
