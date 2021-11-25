import {
  SET_LIST_ROOMS,
  SET_ROOM_DETAIL,
  ADD_NEW_ROOM,
  DELETE_ROOM,
  SAVE_NEW_ROOM,
  DELETE_ROOM_REDUX,
  UPDATE_ROOM
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

    case SAVE_NEW_ROOM:
      console.log('action', action?.payload);
      state.listRooms.push(action?.payload)
      return { ...state, listRooms: [...state.listRooms] };

    case UPDATE_ROOM:
      const index = state.listRooms.findIndex(item => item.id === action.id)
      console.log('index', index);
      state.listRooms[index] = action?.payload?.roomDesc
      return { ...state, listRooms: [...state.listRooms], RoomDetails: action?.payload?.roomDesc };

    case DELETE_ROOM_REDUX:
      console.log('actionDelete', action?.payload);
      const nListRooms = state.listRooms.filter(item => item.id !== action?.payload)
      return { ...state, listRooms: [...nListRooms] };
    // return state;
    default:
      return state;
  }
}
