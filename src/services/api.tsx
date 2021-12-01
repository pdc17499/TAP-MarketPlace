import axios from 'axios';
import {describeSuccessResponse, describeErrorResponse} from './logger';
import {showMessage} from 'react-native-flash-message';
import {getToken} from '@services';
import {DeviceEventEmitter} from 'react-native';

const ApiConfigs: any = {
  baseURL: 'https://tap-api.adamo.tech/',
  responseType: 'json',
  timeout: 30000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    timeout: 30000,
  },
};

const api = axios.create(ApiConfigs);

api.interceptors.request.use(
  async (config: any) => {
    // config.baseURL = getBaseURL();
    const token = await getToken();
    if (token) {
      config.headers = {
        Authorization: 'Bearer ' + token,
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
      if (message && message !== 'OK') {
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
