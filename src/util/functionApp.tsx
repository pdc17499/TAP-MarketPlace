import {pickerProps} from '@interfaces';
import moment from 'moment';

const BASE_URL = 'https://tap-api.adamo.tech';

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

export const mergeArrayServer = (
  listSver: Array<string>,
  listSample: Array<any>,
) => {
  if (listSver && listSver.length > 0) {
    const nList = listSver.map((item: string) => {
      const index = listSample.findIndex(
        (itm: pickerProps) => item.toUpperCase() == itm.value.toUpperCase(),
      );
      if (index !== -1) return listSample[index];
    });

    return nList;
  }

  return [];
};

// export const
