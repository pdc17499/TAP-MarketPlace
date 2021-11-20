import moment from 'moment';

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

// export const
