import {
  SAVE_DATA_REDUX,
  HIDE_INTRO_SCREEN,
  REMOVE_TOKEN,
  UPDATE_USER_INFOR,
  SET_DATA_SIGNUP,
} from './type';
import {INITIAL_STATE_AUTH} from './state';
import {INITIAL_STATE_DATA_SIGN_UP, RESET_DATA_SIGNUP} from '@redux';

export default function dataSave(state = INITIAL_STATE_AUTH, action: any) {
  switch (action.type) {
    case SAVE_DATA_REDUX:
      return {
        ...state,
        user: action?.payload?.data?.user_info,
        token: action?.payload?.data?.token,
      };
    case HIDE_INTRO_SCREEN:
      return {
        ...state,
        showIntroScreen: action.payload,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        user: {},
        token: '',
      };

    case UPDATE_USER_INFOR:
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
