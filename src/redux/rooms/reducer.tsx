import {
  SET_LIST_ROOMS,
  SET_ROOM_DETAIL
} from './type';
import { INITIAL_STATE_ROOMS } from './state';

import _ from 'lodash';


export default function dataSave(state = INITIAL_STATE_ROOMS, action: any) {
  switch (action.type) {
    case SET_LIST_ROOMS:
      return _.assign({}, state, {
        listRooms: action?.payload,
      });
    case SET_ROOM_DETAIL:
      return _.assign({}, state, {
        roomDetail: action?.payload,
      });
    default:
      return state;
  }
}
