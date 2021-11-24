import {
  SET_LIST_ROOMS,
  SET_ROOM_DETAIL,
  ADD_NEW_ROOM,
  DELETE_ROOM
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

    case ADD_NEW_ROOM:
      console.log('action', action?.payload?.body?.roomDesc);
      state.listRooms.push(action?.payload?.body?.roomDesc)
      return { ...state, listRooms: [...state.listRooms] };

    case DELETE_ROOM:
      console.log('actionDelete', action?.payload);
      // const nListRooms = state.listRooms.filter(item => item.id !== action?.payload)
      // return { ...state, listRooms: [...nListRooms] };
      return state;
    default:
      return state;
  }
}
