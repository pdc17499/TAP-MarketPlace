import { put, takeLatest } from 'redux-saga/effects';
import {
  GlobalService,
  resetNewPasswordApi,
  verifyPhonenumberApi,
  getListRoomsApi,
  getRoomDetailApi,
} from '@services';

import { showMessage } from 'react-native-flash-message';
import {
  SIGNIN,
  VERIFY_CODE,
} from '@routeName';
import { NavigationUtils } from '@navigation';
import {
  GET_LIST_ROOMS,
  GET_ROOM_DETAIL,
  setListRooms,
  setRoomDetail,
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
    console.log('dataroom', result);

    // if (result) {
    //   yield put(setRoomDetail(result?.data));
    // }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* roomsSaga() {
  yield takeLatest(GET_LIST_ROOMS, getListRoomsSaga);
  yield takeLatest(GET_ROOM_DETAIL, getRoomDetailSaga);


}
