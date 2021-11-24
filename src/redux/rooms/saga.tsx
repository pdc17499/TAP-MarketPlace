import { put, takeLatest } from 'redux-saga/effects';
import { setListRooms, setRoomDetail, getListRooms, saveNewRoom, deleteRoomRedux } from './action'
import {
  GlobalService,
  getListRoomsApi,
  getRoomDetailApi,
  addNewRoomApi,
  deleteRoomApi,
  updateRoomApi,
  uploadFileApi,
} from '@services';

import { showMessage } from 'react-native-flash-message';
import {
  ADD_SUCCESS, YOUR_LISTING,
} from '@routeName';
import { NavigationUtils } from '@navigation';
import {
  GET_LIST_ROOMS,
  GET_ROOM_DETAIL,
  ADD_NEW_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM,
  UPLOAD_FILE,
} from '@redux';
export interface ResponseGenerator2 {
  result?: any;
  data?: any;
}

export function* getListRoomsSaga() {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator2 = yield getListRoomsApi();
    console.log('dulieu', result?.data);
    if (result) {
      yield put(setListRooms(result?.data));
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* getRoomDetailSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator2 = yield getRoomDetailApi(action.payload);
    console.log('hello', result?.data);

    if (result) {
      showMessage({
        type: 'success',
        message: 'Get Room Success!',
      });
      yield put(setRoomDetail(result?.data));
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* addNewRoomSaga(action: any) {
  try {
    GlobalService.showLoading();
    const { body } = action?.payload;
    console.log('body', { body });

    const result: ResponseGenerator2 = yield addNewRoomApi(body);
    console.log('resyult', result?.data);
    if (result) {
      yield put(saveNewRoom(result?.data))
      NavigationUtils.navigate(ADD_SUCCESS);
    }
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* deleteRoomSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator2 = yield deleteRoomApi(action.payload);
    console.log('hello', result?.data);
    if (result) {
      showMessage({
        type: 'success',
        message: 'Delete Room Success!',
      });
      yield put(deleteRoomRedux(action.payload));
      NavigationUtils.navigate(YOUR_LISTING);
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* updateRoomSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator2 = yield updateRoomApi(action.payload, action.id);
    if (result) {
      showMessage({
        type: 'success',
        message: ' Update Room Success!',
      });
      NavigationUtils.navigate(YOUR_LISTING);
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* upLoadFileSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator2 = yield uploadFileApi(action.payload);
    if (result) {
      showMessage({
        type: 'success',
        message: ' UpLoad Files Success!',
      });
      console.log('ress', result);
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* roomsSaga() {
  yield takeLatest(GET_LIST_ROOMS, getListRoomsSaga);
  yield takeLatest(GET_ROOM_DETAIL, getRoomDetailSaga);
  yield takeLatest(ADD_NEW_ROOM, addNewRoomSaga);
  yield takeLatest(DELETE_ROOM, deleteRoomSaga);
  yield takeLatest(UPDATE_ROOM, updateRoomSaga);
  yield takeLatest(UPLOAD_FILE, upLoadFileSaga);

}
