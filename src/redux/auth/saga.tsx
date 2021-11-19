import { put, takeLatest } from 'redux-saga/effects';
import { saveDataUser, logoutApp, resetDataSignup } from './action';
import {
  LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  VERIFY_CODE_FORGOT_PASSWORD,
  RESET_NEW_PASSWORD,
  UPDATE_USER_INFO
} from './type';
import {
  GlobalService,
  forgotPasswordApi,
  loginApi,
  logOutApi,
  signUpApi,
  verifyCodeForgotPasswordApi,
  resetNewPasswordApi,
  updateUserInfoApi,
  verifyPhonenumberApi,
  verifyCodePhonenumberApi,
} from '@services';
// import {VERTIFIEMAIL, VERIFYCODE} from '@routeName';
import { showMessage } from 'react-native-flash-message';
import {
  PROFILE,
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
import {VERIFY_CODE_PHONE_NUMBER, VERIFY_PHONE_NUMBER} from '@redux';
export interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* loginSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield loginApi(action.payload);
    yield put(saveDataUser(result?.data));
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* signUpSaga(action: any) {
  try {
    GlobalService.showLoading();
    const { body } = action?.payload;
    const result: ResponseGenerator = yield signUpApi(body);
    if (result) {
      NavigationUtils.reset(VERIFY_ACCOUNT);
      yield put(saveDataUser(result?.data));
      // setTimeout(() => {
      //   NavigationUtils.reset(VERIFY_ACCOUNT);
      // }, 100);
      // yield resetDataSignup();
    }
    // yield put(saveDataRedux(result));
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* logoutSaga() {
  console.log('rhelooo');
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield logOutApi();
    console.log('resulllll', result);

    if (result) {
      yield put(logoutApp());
    }


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
    if (result) {
      NavigationUtils.navigate(VERIFY_CODE, { isForgetPassword: true, email });
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
    const { email, code } = action.payload;
    const result: ResponseGenerator = yield verifyCodeForgotPasswordApi({
      email: email,
      code: code,
    });
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
    const result: ResponseGenerator = yield resetNewPasswordApi(action.payload);
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

export function* verifyPhonenumberSaga(action: any) {
  try {
    GlobalService.showLoading();
    const {contact, email} = action.payload;
    const result: ResponseGenerator = yield verifyPhonenumberApi(
      action.payload,
    );
    if (result) {
      yield resetDataSignup();
      NavigationUtils.navigate(VERIFY_CODE, {
        contact,
        email,
      });
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* verifyCodePhonenumberSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield verifyCodePhonenumberApi(
      action.payload,
    );
    if (result) {
      StackActions.replace(PROFILE);
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* upDateUserInfoSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield updateUserInfoApi(action.payload);
    console.log({ result });
    if (result) {
      // NavigationUtils.reset(SIGNIN);
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
  yield takeLatest(VERIFY_PHONE_NUMBER, verifyPhonenumberSaga);
  yield takeLatest(VERIFY_CODE_PHONE_NUMBER, verifyCodePhonenumberSaga);
  yield takeLatest(UPDATE_USER_INFO, upDateUserInfoSaga);

}
