import api from '../api';
import {
  LOGIN_CLIENT,
  LOGOUT,
  SEND_VERIFY_EMAIL,
  SIGNUP,
  VERIFY_EMAIL,
} from './types';

export const loginClient: any = async (data: any) => {
  const response = await api.post(LOGIN_CLIENT, data);
  return response;
};

export const signUp: any = async (data: any) => {
  const response = await api.post(SIGNUP, data);
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
