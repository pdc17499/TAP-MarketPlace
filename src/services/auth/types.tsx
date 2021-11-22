const SIGNUP = 'v1/auth/register';
const VERIFY_EMAIL = 'confirm-verify';
const FORGOT_PASSWORD = 'v1/users/forgot-password';
const LOGIN = 'v1/auth/login';
const LOGOUT = 'v1/auth/logout';
const VERIFY_CODE_FORGOT_PASSWORD = 'v1/users/forgot-password-verify-code';
const RESET_NEW_PASSWORD = 'v1/users/reset-password';
const VERIFY_PHONE_NUMBER = 'v1/users/update-contact-no-verify';
const VERIFY_CODE_PHONE_NUMBER = 'v1/users/send-verification-sms';
const UPDATE_USER_INFO = 'v1/users/';
const CHANGE_PASSWORD = 'v1/users/change-password';

//Profile
const GET_PROFILE = '/v1/';

//Room
const GET_LIST_ROOMS = 'v1/rooms';
const GET_ROOM_DETAIL = '/v1/rooms/:';


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
  // GET_LIST_ROOMS,
  // GET_ROOM_DETAIL,
  // GET_PROFILE,
};
