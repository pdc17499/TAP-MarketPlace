import {
  SAVE_DATA_USER,
  HIDE_INTRO_SCREEN,
  UPDATE_USER_INFO,
  SET_DATA_SIGNUP,
  LOGIN,
  LOGOUT,
  VERIFY_EMAIL,
  RESET_DATA_SIGNUP,
} from './type';
import { INITIAL_STATE_AUTH } from './state';
import { INITIAL_STATE_DATA_SIGN_UP } from '@redux';


export default function dataSave(state = INITIAL_STATE_AUTH, action: any) {
  switch (action.type) {
    case SAVE_DATA_USER:
      return {
        ...state,
        user: action?.payload?.user,
        token: action?.payload?.tokens,
      };
    case HIDE_INTRO_SCREEN:
      return {
        ...state,
        showIntroScreen: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };

    case UPDATE_USER_INFO:
      return {
        ...state,
        user: action?.payload?.data?.user_info,
      };
    case SET_DATA_SIGNUP:
      return {
        ...state,
        dataSignup: action?.payload?.data,
      };
    case RESET_DATA_SIGNUP:
      return {
        ...state,
        dataSignup: INITIAL_STATE_DATA_SIGN_UP,
      };

    default:
      return state;
  }
}
