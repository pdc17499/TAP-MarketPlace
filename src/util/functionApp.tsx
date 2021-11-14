import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';

const BASE_URL = 'https://tap-api.adamo.tech/';

export const getBaseURL = () => {
  return BASE_URL;
};

export const YEARS = () => {
  let data = [];
  const year = parseInt(moment().format('YYYY'));
  for (let i = 0; i <= year; i++) {
    data.push({label: `${year - i}`, value: `${year - i}`});
  }

  return data;
};

export const getUserLocation = async () => {
  Geolocation.getCurrentPosition(
    position => {
      console.log({position});
      return position;
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};
