const SIGNUP = 'v1/auth/register';
const VERIFY_EMAIL = 'confirm-verify';
const FORGOT_PASSWORD = 'v1/users/forgot-password';
const LOGIN = 'v1/auth/login';
const LOGOUT = 'v1/auth/logout';
const VERIFY_CODE_FORGOT_PASSWORD = 'v1/users/forgot-password-verify-code';
const RESET_NEW_PASSWORD = 'v1/users/reset-password';
const VERIFY_PHONE_NUMBER = 'v1/users/update-contact-no-verify';
const VERIFY_CODE_PHONE_NUMBER = 'v1/users/send-verification-sms';

//Profile
const UPDATE_USER_INFO = 'v1/users/';
const CHANGE_PASSWORD = 'v1/users/change-password';
const GET_PROFILE_USER = 'v1/auth/infor';

export {
  LOGIN,
  SIGNUP,
  LOGOUT,
  VERIFY_EMAIL,
  FORGOT_PASSWORD,
  VERIFY_CODE_FORGOT_PASSWORD,
  RESET_NEW_PASSWORD,
  VERIFY_PHONE_NUMBER,
  VERIFY_CODE_PHONE_NUMBER,
  UPDATE_USER_INFO,
  CHANGE_PASSWORD,
  GET_PROFILE_USER,
};
