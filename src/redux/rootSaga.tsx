import {authSaga} from './auth';
import {all, fork} from 'redux-saga/effects';

function* rootSaga() {
  yield all([fork(authSaga)]);
}

export default rootSaga;
