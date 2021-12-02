const SIGNUP = 'v1/auth/homeownerRegister';
const SIGNUP_TENANT = 'v1/auth/tenantRegister';
const SIGNUP_AGENT = 'v1/auth/agentRegister';
const VERIFY_EMAIL = 'confirm-verify';
const FORGOT_PASSWORD = 'v1/users/forgot-password';
const LOGIN = 'v1/auth/login';
const LOGOUT = 'v1/auth/logout';
const VERIFY_CODE_FORGOT_PASSWORD = 'v1/users/forgot-password-verify-code';
const RESET_NEW_PASSWORD = 'v1/users/reset-password';
const UPDATE_PHONE_NUMBER = 'v1/users/update-contact-no-verify';
const VERIFY_PHONE_NUMBER = 'v1/users/send-verification-sms';
const VERIFY_CODE_PHONE_NUMBER = 'v1/users/verify-sms-code';

//Profile
const UPDATE_USER_INFO = 'v1/users/';
const CHANGE_PASSWORD = 'v1/users/change-password';
const GET_PROFILE_USER = 'v1/auth/infor';

export {
  LOGIN,
  SIGNUP,
  SIGNUP_TENANT,
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
  UPDATE_PHONE_NUMBER,
  SIGNUP_AGENT
};
