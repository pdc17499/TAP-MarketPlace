import {put, takeLatest} from 'redux-saga/effects';
import {saveDataUser, resetDataSignup, verifyPhonenumber} from './action';
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
  setToken,
  removeToken,
  changePasswordApi,
  getProfileUserApi,
  signUpTenantApi,
  updatePhonenumberApi,
  signUpAgentApi,
} from '@services';
// import {VERTIFIEMAIL, VERIFYCODE} from '@routeName';
import {showMessage} from 'react-native-flash-message';
import {
  PROFILE,
  SIGNIN,
  SIGNUP,
  TABBAR,
  UPDATE_NEW_PASSWORD,
  VERIFY_ACCOUNT,
  VERIFY_CODE,
} from '@routeName';
import {NavigationUtils} from '@navigation';
import {
  LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  VERIFY_CODE_FORGOT_PASSWORD,
  RESET_NEW_PASSWORD,
  UPDATE_USER_INFO,
  CHANGE_PASSWORD,
  VERIFY_CODE_PHONE_NUMBER,
  VERIFY_PHONE_NUMBER,
  GET_PROFILE_USER,
  resetDataRoom,
  UPDATE_PHONE_NUMBER,
} from '@redux';
import {select} from 'redux-saga/effects';
import {UserInfo} from '@interfaces';
export interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* loginSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield loginApi(action.payload);
    const token = result?.data?.tokens?.access?.token;
    yield setToken(token);
    yield put(saveDataUser(result?.data));
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* signUpSaga(action: any) {
  try {
    GlobalService.showLoading();
    console.log('payy', action?.payload);

    const {body, isTenant, isAgent} = action?.payload;
    const result: ResponseGenerator = yield isTenant
      ? signUpTenantApi(body)
      : isAgent
      ? signUpAgentApi(body)
      : signUpApi(body);
    console.log({result});
    if (result) {
      NavigationUtils.reset(VERIFY_ACCOUNT);
      const token = result?.data?.tokens?.access?.token;
      yield setToken(token);
      yield put(saveDataUser(result?.data));
    }
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* logoutSaga() {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield logOutApi();
    yield put(resetDataSignup());
    yield put(resetDataRoom());
    yield removeToken();
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

export function* updatePhonenumberSaga(action: any) {
  try {
    GlobalService.showLoading();
    const {contact, email} = action.payload;
    const result: ResponseGenerator = yield updatePhonenumberApi({
      contact,
      email,
    });
    if (result) {
      yield put(verifyPhonenumber({contact, email, isAccSettingScreen: false}));
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* verifyPhonenumberSaga(action: any) {
  try {
    GlobalService.showLoading();
    const {contact, email, isAccSettingScreen} = action.payload;
    const result: ResponseGenerator = yield verifyPhonenumberApi({
      contact,
      email,
    });
    if (result) {
      NavigationUtils.navigate(VERIFY_CODE, {
        contact,
        email,
        isAccSettingScreen,
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
    const {contact, code, isAccSettingScreen} = action.payload;
    const result: ResponseGenerator = yield verifyCodePhonenumberApi({
      code,
      contact,
    });
    console.log({result});
    if (isAccSettingScreen) {
      const user: UserInfo = yield select((state: any) => state.auth?.user);
      const nUser = {...user};
      nUser.isContactVerified = true;
      yield put(saveDataUser({user: nUser}));
      NavigationUtils.goBack();
    } else {
      NavigationUtils.reset(TABBAR);
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
    const {body, id, isNotBack} = action.payload;
    const result: ResponseGenerator = yield updateUserInfoApi(body, id);
    console.log({result});
    if (result) {
      showMessage({
        type: 'success',
        message: 'Update User Information Successfully!',
      });
      yield put(saveDataUser({user: result}));
      if (!isNotBack) {
        NavigationUtils.goBack();
      }
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* changePasswordSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield changePasswordApi(action.payload);
    console.log({result});
    if (result) {
      NavigationUtils.goBack();
    }
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

export function* getProfileUserSaga() {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield getProfileUserApi();
    console.log({result});
    if (result) {
      yield put(saveDataUser(result));
    }
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
  yield takeLatest(UPDATE_PHONE_NUMBER, updatePhonenumberSaga);
  yield takeLatest(VERIFY_PHONE_NUMBER, verifyPhonenumberSaga);
  yield takeLatest(VERIFY_CODE_PHONE_NUMBER, verifyCodePhonenumberSaga);
  yield takeLatest(UPDATE_USER_INFO, upDateUserInfoSaga);
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
  yield takeLatest(GET_PROFILE_USER, getProfileUserSaga);
}
