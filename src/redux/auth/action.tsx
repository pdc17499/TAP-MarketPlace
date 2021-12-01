import {
  SAVE_DATA_USER,
  LOGIN,
  SIGNUP,
  LOGOUT,
  REMOVE_TOKEN,
  SET_DATA_SIGNUP,
  RESET_DATA_SIGNUP,
  FORGOT_PASSWORD,
  VERIFY_CODE_FORGOT_PASSWORD,
  RESET_NEW_PASSWORD,
  UPDATE_USER_INFO,
  VERIFY_PHONE_NUMBER,
  VERIFY_CODE_PHONE_NUMBER,
  CHANGE_PASSWORD,
  GET_PROFILE_USER,
  UPDATE_PHONE_NUMBER,
} from '@redux';

export const loginApp = (payload: any) => ({
  type: LOGIN,
  payload,
});

export const logoutApp = () => ({
  type: LOGOUT,
});

export const saveDataUser = (payload: any) => ({
  type: SAVE_DATA_USER,
  payload,
});

export const signUp = (payload: any) => ({
  type: SIGNUP,
  payload,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const forgotPassword = (payload: any) => ({
  type: FORGOT_PASSWORD,
  payload,
});

export const verifyCodeForgotPassword = (payload: any) => ({
  type: VERIFY_CODE_FORGOT_PASSWORD,
  payload,
});

export const resetNewPassword = (payload: any) => ({
  type: RESET_NEW_PASSWORD,
  payload,
});

export const updatePhonenumber = (payload: any) => ({
  type: UPDATE_PHONE_NUMBER,
  payload,
});

export const verifyPhonenumber = (payload: any) => ({
  type: VERIFY_PHONE_NUMBER,
  payload,
});

export const verifyCodePhonenumber = (payload: any) => ({
  type: VERIFY_CODE_PHONE_NUMBER,
  payload,
});

export const setDataSignup = (payload: any) => ({
  type: SET_DATA_SIGNUP,
  payload,
});

export const resetDataSignup = () => ({
  type: RESET_DATA_SIGNUP,
});

export const updateUserInfo = (payload: any) => ({
  type: UPDATE_USER_INFO,
  payload,
});

export const changePassword = (payload: any) => ({
  type: CHANGE_PASSWORD,
  payload,
});

export const getProfileUser = () => ({
  type: GET_PROFILE_USER,
});
