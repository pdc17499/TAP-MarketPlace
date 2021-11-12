import {
  SAVE_DATA_USER,
  HIDE_INTRO_SCREEN,
  REMOVE_TOKEN,
  UPDATE_USER_INFOR,
  SET_DATA_SIGNUP,
  LOGIN
} from './type';
import { INITIAL_STATE_AUTH } from './state';


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
    case LOGIN:
      return {
        ...state,
        dataSignIn: action?.payload?.data,
      };
    default:
      return state;
  }
}
