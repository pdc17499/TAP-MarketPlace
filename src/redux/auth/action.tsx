import {
  SAVE_DATA_REDUX,
  LOGIN_CLIENT,
  HIDE_INTRO_SCREEN,
  SIGNUP,
  LOGOUT,
  REMOVE_TOKEN,
  VERIFY_EMAIL,
  SEND_VERIFY_EMAIL,
  UPDATE_USER_INFOR,
  SET_DATA_SIGNUP,
  RESET_DATA_SIGNUP,
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

export const signUp = (payload: any) => ({
  type: SIGNUP,
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

export const setDataSignup = (payload: any) => ({
  type: SET_DATA_SIGNUP,
  payload,
});

export const resetDataSignup = () => ({
  type: RESET_DATA_SIGNUP,
});
