import {
  SAVE_DATA_REDUX,
  LOGIN_CLIENT,
  HIDE_INTRO_SCREEN,
  SIGNUP_CLIENT,
  LOGOUT,
  REMOVE_TOKEN,
  VERIFY_EMAIL,
  SEND_VERIFY_EMAIL,
  UPDATE_USER_INFOR,
} from './type';

export const loginClientApp = (payload: any) => ({
  type: LOGIN_CLIENT,
  payload,
});

export const hideIntroScreen = (payload: any) => ({
  type: HIDE_INTRO_SCREEN,
  payload,
});

export const saveDataRedux = (payload: any) => ({
  type: SAVE_DATA_REDUX,
  payload,
});

export const signUpClient = (payload: any) => ({
  type: SIGNUP_CLIENT,
  payload,
});

export const logoutApp = () => ({
  type: LOGOUT,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const verifyEmail = () => ({
  type: VERIFY_EMAIL,
});

export const sendVerifyEmail = () => ({
  type: SEND_VERIFY_EMAIL,
});

export const updateUserInfor = (payload: any) => ({
  type: UPDATE_USER_INFOR,
  payload,
});
