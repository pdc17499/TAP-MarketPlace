import api from '../api';
import {
  LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  SIGNUP,
  VERIFY_EMAIL,
  VERIFY_CODE_FORGOT_PASSWORD,
  RESET_NEW_PASSWORD,
  VERIFY_CODE_PHONE_NUMBER,
  VERIFY_PHONE_NUMBER,
} from './types';

export const loginApi: any = async (data: any) => {
  const response = await api.post(LOGIN, data);
  return response;
};

export const signUpApi: any = async (data: any) => {
  const response = await api.post(SIGNUP, data);
  return response;
};

export const logOutApi: any = async () => {
  const response = await api.get(LOGOUT);
  return response;
};

export const forgotPasswordApi: any = async (data: any) => {
  const response = await api.post(FORGOT_PASSWORD, data);
  return response;
};

export const verifyCodeForgotPasswordApi: any = async (data: any) => {
  const response = await api.post(VERIFY_CODE_FORGOT_PASSWORD, data);
  return response;
};
export const resetNewPasswordApi: any = async (data: any) => {
  const response = await api.post(RESET_NEW_PASSWORD, data);
  return response;
};

export const verifyPhonenumberApi: any = async (data: any) => {
  const response = await api.post(VERIFY_PHONE_NUMBER, data);
  return response;
};
export const verifyCodePhonenumberApi: any = async (data: any) => {
  const response = await api.post(VERIFY_CODE_PHONE_NUMBER, data);
  return response;
};
