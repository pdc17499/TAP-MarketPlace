import {
  SAVE_DATA_USER,
  LOGIN,
  HIDE_INTRO_SCREEN,
  SIGNUP,
  LOGOUT,
  REMOVE_TOKEN,
  UPDATE_USER_INFOR,
  SET_DATA_SIGNUP,
  RESET_DATA_SIGNUP,
  FORGOT_PASSWORD,
  VERIFY_CODE_FORGOT_PASSWORD,
  RESET_NEW_PASSWORD,
  VERIFY_PHONE_NUMBER,
  VERIFY_CODE_PHONE_NUMBER,
} from '@redux';

export const loginApp = (payload: any) => ({
  type: LOGIN,
  payload,
});

export const logoutApp = () => ({
  type: LOGOUT,
});

export const hideIntroScreen = (payload: any) => ({
  type: HIDE_INTRO_SCREEN,
  payload,
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

export const verifyPhonenumber = (payload: any) => ({
  type: VERIFY_PHONE_NUMBER,
  payload,
});

export const verifyCodePhonenumber = (payload: any) => ({
  type: VERIFY_CODE_PHONE_NUMBER,
  payload,
});

export const updateUserInfor = (payload: any) => ({
  type: UPDATE_USER_INFOR,
  payload,
});

export const setDataSignup = (payload: any) => ({
  type: SET_DATA_SIGNUP,
  payload,
});

export const resetDataSignup = () => ({
  type: RESET_DATA_SIGNUP,
});
