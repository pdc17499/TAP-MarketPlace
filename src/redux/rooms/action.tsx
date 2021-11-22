import {
  GET_LIST_ROOMS,
  GET_ROOM_DETAIL,
  SET_LIST_ROOMS,
  SET_ROOM_DETAIL
} from '@redux';

export const getListRooms = () => ({
  type: GET_LIST_ROOMS,
});

export const setListRooms = (payload: any) => ({
  type: SET_LIST_ROOMS,
  payload,
});

export const getRoomDetail = (payload: any) => ({
  type: GET_ROOM_DETAIL,
  payload
});

export const setRoomDetail = (payload: any) => ({
  type: SET_ROOM_DETAIL,
  payload,
});