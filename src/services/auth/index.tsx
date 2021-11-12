import api from '../api';
import {
  LOGIN,
  LOGOUT,
  SEND_VERIFY_EMAIL,
  SIGNUP,
  VERIFY_EMAIL,
} from './types';

export const loginApi: any = async (data: any) => {
  const response = await api.post(LOGIN, data);
  return response;
};

export const signUp: any = async (data: any) => {
  const response = await api.post(SIGNUP, data);
  return response;
};

export const logOutApi: any = async () => {
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
