import axios from 'axios';
import {getBaseURL} from '@util';
import {describeSuccessResponse, describeErrorResponse} from './logger';
import {showMessage} from 'react-native-flash-message';
import {getToken} from '@services';
import {DeviceEventEmitter} from 'react-native';

const api = axios.create();

api.interceptors.request.use(
  async (config: any) => {
    config.baseURL = getBaseURL();
    const token = await getToken();
    if (token) {
      config.headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        ...config.headers,
      };
    }
    if (config.method.toUpperCase() === 'GET') {
      config.params = {...config.params};
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
    const {message, status} = error?.response?.data;
    console.log({error});
    if (status === 401) {
      DeviceEventEmitter.emit('UNAUTHENTICATION', {});
    }
    showMessage({
      message: message,
      type: 'danger',
    });

    describeErrorResponse(error);
    return Promise.reject(error);
  },
);

export default api;
