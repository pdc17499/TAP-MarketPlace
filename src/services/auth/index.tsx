import api from '../api';
import {
  LOGIN,
  LOGOUT,
  SEND_VERIFY_EMAIL,
  SIGNUP_CLIENT,
  VERIFY_EMAIL,
} from './types';

export const loginApi: any = async (data: any) => {
  const response = await api.post(LOGIN, data);
  return response;
};

export const signUpClient: any = async (data: any) => {
  const response = await api.post(SIGNUP_CLIENT, data);
  return response;
};

export const logOut: any = async () => {
  const response = await api.get(LOGOUT);
  return response;
};

export const verifyEmail: any = async () => {
  const response = await api.get(VERIFY_EMAIL);
  return response;
};

export const sendVerifyEmail: any = async () => {
  const response = await api.get(SEND_VERIFY_EMAIL);
  return response;
};
