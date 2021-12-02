import api from '../api';
import {
  LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  SIGNUP,
  VERIFY_CODE_FORGOT_PASSWORD,
  RESET_NEW_PASSWORD,
  VERIFY_CODE_PHONE_NUMBER,
  VERIFY_PHONE_NUMBER,
  UPDATE_USER_INFO,
  CHANGE_PASSWORD,
  GET_PROFILE_USER,
  SIGNUP_TENANT,
  UPDATE_PHONE_NUMBER,
  SIGNUP_AGENT,
} from './types';

export const loginApi: any = async (data: any) => {
  const response = await api.post(LOGIN, data);
  return response;
};

export const signUpApi: any = async (data: any) => {
  const response = await api.post(SIGNUP, data);
  return response;
};

export const signUpTenantApi: any = async (data: any) => {
  const response = await api.post(SIGNUP_TENANT, data);
  return response;
};

export const signUpAgentApi: any = async (data: any) => {
  const response = await api.post(SIGNUP_AGENT, data);
  return response;
};

export const logOutApi: any = async () => {
  const response = await api.post(LOGOUT);
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

export const updatePhonenumberApi: any = async (data: any) => {
  const response = await api.post(UPDATE_PHONE_NUMBER, data);
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

// profile
export const updateUserInfoApi: any = async (data: any, id: string) => {
  const response = await api.patch(UPDATE_USER_INFO + id, data);
  return response;
};

export const changePasswordApi: any = async (data: any) => {
  const response = await api.post(CHANGE_PASSWORD, data);
  return response;
};

export const getProfileUserApi: any = async () => {
  const response = await api.get(GET_PROFILE_USER);
  console.log({ response });
  return response;
};
