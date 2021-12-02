import {DEVICE} from '@util';
import api from '../api';
import {
  GET_LIST_ROOMS,
  GET_ROOM_DETAIL,
  DELETE_ROOM,
  UPDATE_ROOM,
  UPLOAD_FILE,
  GET_ROOM_TENANT,
  UPDATE_ROOM_TENANT,
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

export const addNewRoomApi: any = async (data: any) => {
  const response = await api.post(GET_ROOM_DETAIL, data);
  return response;
};

export const deleteRoomApi: any = async (data: any) => {
  const response = await api.delete(DELETE_ROOM + data);
  return response;
};

export const updateRoomApi: any = async (data: any, id: string) => {
  const response = await api.patch(UPDATE_ROOM + id, data);
  return response;
};

export const uploadFileApi: any = async (file: string) => {
  var bodyFormData = new FormData();
  bodyFormData.append('file', file);
  const response = await api.post(UPLOAD_FILE, bodyFormData);
  return response;
};

export const uploadFile: any = async (image: any) => {
  let form = new FormData();
  const isHEIC =
    image?.sourceURL?.endsWith('.heic') || image?.sourceURL?.endsWith('.HEIC');

  console.log({image});
  form.append(`file`, {
    fileName: image?.path.replace(/^.*[\\\/]/, ''),
    name: image?.path.replace(/^.*[\\\/]/, ''),
    width: image?.width,
    uri: image?.path,
    path: image?.path,
    size: image?.size,
    type: image?.mime,
    height: image?.height,
  });
  const response = await api.post(UPLOAD_FILE, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const getRoomTenantApi: any = async () => {
  const response = await api.get(GET_ROOM_TENANT);
  return response;
};

export const updateRoomTenantApi: any = async (data: any) => {
  const response = await api.patch(UPDATE_ROOM_TENANT, data);
  return response;
};
