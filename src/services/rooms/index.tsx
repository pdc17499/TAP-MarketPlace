import api from '../api';
import {
  GET_LIST_ROOMS,
  GET_ROOM_DETAIL
} from './types';

// room detail
export const getListRoomsApi: any = async () => {
  const response = await api.get(GET_LIST_ROOMS);
  return response;
};

export const getRoomDetailApi: any = async (data: any) => {
  const response = await api.get(GET_ROOM_DETAIL + data);
  return response;
};
