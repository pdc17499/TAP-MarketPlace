import {
  GET_LIST_ROOMS,
  GET_ROOM_DETAIL,
  SET_LIST_ROOMS,
  SET_ROOM_DETAIL,
  ADD_NEW_ROOM,
  DELETE_ROOM,
  SAVE_NEW_ROOM,
  DELETE_ROOM_REDUX,
  UPLOAD_FILE,
  UPDATE_ROOM,
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

export const addNewRoom = (payload: any) => ({
  type: ADD_NEW_ROOM,
  payload,
});

export const saveNewRoom = (payload: any) => ({
  type: SAVE_NEW_ROOM,
  payload,
});


export const deleteRoom = (payload: any) => ({
  type: DELETE_ROOM,
  payload,
});

export const deleteRoomRedux = (payload: any) => ({
  type: DELETE_ROOM_REDUX,
  payload,
});

export const updateRoom = (payload: any, id: string) => ({
  type: UPDATE_ROOM,
  payload,
  id,
});

// export const updateRoomRedux = (payload: any, id: string) => ({
//   type: UPDATE_ROOM,
//   payload,
//   id,
// });

export const uploadFile = (payload: any) => ({
  type: UPLOAD_FILE,
  payload,
});



