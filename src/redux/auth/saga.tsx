import {put, takeLatest} from 'redux-saga/effects';
import {saveDataUser, removeToken, logoutApp} from './action';
import {LOGIN, LOGOUT, VERIFY_EMAIL, SEND_VERIFY_EMAIL} from './type';
import {
  GlobalService,
  sendVerifyEmail,
  loginApi,
  logOutApi,
  signUp,
  signUpApi,
} from '@services';
// import {VERTIFIEMAIL, VERIFYCODE} from '@routeName';
import {showMessage} from 'react-native-flash-message';
import {SIGNUP} from '@routeName';

export interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* loginSaga(action: any) {
  console.log('num2');
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield loginApi(action.payload);
    yield put(saveDataUser(result));
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* signUpSaga(action: any) {
  try {
    GlobalService.showLoading();
    const {body} = action?.payload;
    const result: ResponseGenerator = yield signUpApi(body);
    console.log({result});
    // yield put(saveDataRedux(result));
    // NavigationUtils.navigate(VERTIFIEMAIL);
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* logoutSaga() {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield logOutApi();
    yield put(logoutApp());
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}
export function* sendVerifyEmailSaga(action: any) {
  try {
    const result: ResponseGenerator = yield sendVerifyEmail(action.payload);
    console.log('res', result);
    const {message} = result?.data;
    showMessage({
      message: message,
      type: 'success',
    });
  } catch (error) {}
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP, signUpSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(SEND_VERIFY_EMAIL, sendVerifyEmailSaga);
}
