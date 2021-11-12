import { put, takeLatest } from 'redux-saga/effects';
import { saveDataUser, removeToken, logoutApp } from './action';
import {
  LOGIN,
  SIGNUP_CLIENT,
  LOGOUT,
  VERIFY_EMAIL,
  SEND_VERIFY_EMAIL,
} from './type';
import {
  GlobalService,
  signUpClient,
  verifyEmail,
  sendVerifyEmail,
  loginApi,
  logOutApi,
} from '@services';
// import {VERTIFIEMAIL, VERIFYCODE} from '@routeName';
import { showMessage } from 'react-native-flash-message';



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

export function* signUpClientSaga(action: any) {
  try {
    GlobalService.showLoading();
    const { confirmpassword, contryCode, email, fullname, password, phone } =
      action?.payload;
    const body = {
      full_name: fullname,
      email: email,
      password: password,
      password_confirmation: confirmpassword,
      phone: `${contryCode} ${phone}`,
    };
    const result: ResponseGenerator = yield signUpClient(body);
    yield put(saveDataUser(result));
    // NavigationUtils.navigate(VERTIFIEMAIL);
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* logoutSaga() {
  console.log('h2');

  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield logOutApi();
    yield put(logoutApp());
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* verifyEmailSaga() {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield verifyEmail();
    if (result) {
      // NavigationUtils.navigate(VERIFYCODE);
    }
    // yield put(updateUserInfor(result));
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}
export function* sendVerifyEmailSaga() {
  try {
    const result: ResponseGenerator = yield sendVerifyEmail();
    const { message } = result?.data;
    showMessage({
      message: message,
      type: 'success',
    });
  } catch (error) { }
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP_CLIENT, signUpClientSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
  yield takeLatest(SEND_VERIFY_EMAIL, sendVerifyEmailSaga);
}
