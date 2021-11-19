import axios from 'axios';
import { getBaseURL } from '@util';
import { describeSuccessResponse, describeErrorResponse } from './logger';
import { showMessage } from 'react-native-flash-message';
import { store } from '../redux/store';

const api = axios.create();

api.interceptors.request.use(
  async (config: any) => {
    config.baseURL = getBaseURL();
    const state = store.getState();
    //@ts-ignore
    // const token = state?.auth?.token?.access?.token;

    const token = state?.auth?.token;

    console.log('TOKENsss', state?.auth);
    if (token) {
      config.headers = {
        Authorization: token,
        'Content-Type': 'application/json',
        ...config.headers,
      };
    }
    if (config.method.toUpperCase() === 'GET') {
      config.params = { ...config.params };
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  function (response: any) {
    describeSuccessResponse(response);
    try {
      const message = response?.data?.message;
      if (message) {
        showMessage({
          message: message,
          type: 'success',
        });
      }
      return response?.data;
    } catch (error) {
      console.log('err2', error);

      return Promise.reject(error);
    }
  },
  function (error) {
    const { message } = error?.response?.data;
    showMessage({
      message: message,
      type: 'danger',
    });
    describeErrorResponse(error);
    return Promise.reject(error);
  },
);

export default api;
