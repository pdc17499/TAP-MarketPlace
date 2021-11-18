import {put, takeLatest} from 'redux-saga/effects';
import {saveDataUser, logoutApp, resetDataSignup} from './action';
import {
  LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  VERIFY_CODE_FORGOT_PASSWORD,
  RESET_NEW_PASSWORD,
} from './type';
import {
  GlobalService,
  forgotPasswordApi,
  loginApi,
  logOutApi,
  signUpApi,
  verifyCodeForgotPasswordApi,
  resetNewPasswordApi,
} from '@services';
// import {VERTIFIEMAIL, VERIFYCODE} from '@routeName';
import {showMessage} from 'react-native-flash-message';
import {
  RESETPASSWORD,
  SIGNIN,
  SIGNUP,
  UPDATE_NEW_PASSWORD,
  VERIFY_ACCOUNT,
  VERIFY_CODE,
  WELCOME,
} from '@routeName';
import {NavigationUtils} from '@navigation';
import {CommonActions, StackActions} from '@react-navigation/native';
export interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* loginSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield loginApi(action.payload);
    // NavigationUtils.reset(VERIFY_ACCOUNT);
    yield put(saveDataUser(result?.data));
    // setTimeout(() => {
    //   NavigationUtils.reset(VERIFY_ACCOUNT);
    // }, 100);
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
    if (result) {
      yield put(saveDataUser(result?.data));
      setTimeout(() => {
        NavigationUtils.reset(VERIFY_ACCOUNT);
      }, 100);
      yield resetDataSignup();
    }
    // yield put(saveDataRedux(result));
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

export function* forgotPasswordSaga(action: any) {
  try {
    GlobalService.showLoading();
    const {email} = action.payload;
    const result: ResponseGenerator = yield forgotPasswordApi({email: email});
    console.log({action});
    if (result) {
      NavigationUtils.navigate(VERIFY_CODE, {isForgetPassword: true, email});
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* verifyCodeForgotPasswordSaga(action: any) {
  try {
    GlobalService.showLoading();
    const {email, code} = action.payload;
    const result: ResponseGenerator = yield verifyCodeForgotPasswordApi({
      email: email,
      code: code,
    });
    console.log({result});
    if (result) {
      NavigationUtils.navigate(UPDATE_NEW_PASSWORD, {
        token: result?.data?.token,
      });
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* resetNewPasswordSaga(action: any) {
  try {
    GlobalService.showLoading();
    const {token, newPassword} = action.payload;
    const result: ResponseGenerator = yield resetNewPasswordApi(action.payload);
    console.log({result});
    if (result) {
      NavigationUtils.reset(SIGNIN);
    }
    showMessage({
      type: 'success',
      message: 'Reset Password Success!',
    });
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP, signUpSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga);
  yield takeLatest(VERIFY_CODE_FORGOT_PASSWORD, verifyCodeForgotPasswordSaga);
  yield takeLatest(RESET_NEW_PASSWORD, resetNewPasswordSaga);
}
