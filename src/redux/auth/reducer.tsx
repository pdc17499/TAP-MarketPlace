import {
  SAVE_DATA_REDUX,
  HIDE_INTRO_SCREEN,
  REMOVE_TOKEN,
  UPDATE_USER_INFOR,
} from './type';
import {INITIAL_STATE_AUTH} from './state';

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
    default:
      return state;
  }
}
