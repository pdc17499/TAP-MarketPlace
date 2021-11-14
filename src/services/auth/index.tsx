import api from '../api';
import {LOGIN, LOGOUT, SEND_VERIFY_EMAIL, SIGNUP, VERIFY_EMAIL} from './types';

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

export const sendVerifyEmail: any = async (data: any) => {
  const response = await api.post(SEND_VERIFY_EMAIL, data);
  return response;
};
