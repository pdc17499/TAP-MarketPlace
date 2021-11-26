import {
  SET_LIST_ROOMS,
  SET_ROOM_DETAIL,
  ADD_NEW_ROOM,
  DELETE_ROOM,
  SAVE_NEW_ROOM,
  DELETE_ROOM_REDUX,
  UPDATE_ROOM_REDUX,
  UPDATE_ROOM_GALLERY
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

    case UPDATE_ROOM_REDUX:
      const index = state.listRooms.findIndex(item => item.id === action?.payload?.id)
      console.log('index111', index);
      state.listRooms[index] = action?.payload;
      state.roomDetail = action?.payload;
      return { ...state, listRooms: [...state.listRooms], roomDetail: { ...state.roomDetail } };

    case DELETE_ROOM_REDUX:
      console.log('actionDelete', action?.payload);
      const nListRooms = state.listRooms.filter(item => item.id !== action?.payload)
      return { ...state, listRooms: [...nListRooms] };

    case UPDATE_ROOM_GALLERY:
      state.roomDetail.PicturesVideo = action?.payload
      return { ...state, roomDetail: { ...state.roomDetail } };

    default:
      return state;
  }
}
