import {
  SAVE_DATA_USER,
  SET_DATA_SIGNUP,
  LOGOUT,
  RESET_DATA_SIGNUP,
} from './type';
import {INITIAL_STATE_AUTH} from './state';
import {INITIAL_STATE_DATA_SIGN_UP} from '@redux';
import _ from 'lodash';

export default function dataSave(state = INITIAL_STATE_AUTH, action: any) {
  switch (action.type) {
    case SAVE_DATA_USER:
      return {
        ...state,
        typeUser: action?.payload?.role?.idType || state?.typeUser,
        user: action?.payload?.user || state?.user,
        token: action?.payload?.tokens || state?.token,
        role: action?.payload?.role || state?.role,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        role: null,
      };
    case SET_DATA_SIGNUP:
      return {
        ...state,
        dataSignup: action?.payload?.data,
      };
    case RESET_DATA_SIGNUP:
      const nState = {...state};
      nState.dataSignup = {
        min_range_price: 4000,
        max_range_price: 25000,
      };
      return nState;
    default:
      return state;
  }
}
