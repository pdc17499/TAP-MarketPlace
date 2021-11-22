import { authSaga } from './auth';
import { roomsSaga } from './rooms'


import { all, fork } from 'redux-saga/effects';

function* rootSaga() {
  yield all([fork(authSaga), fork(roomsSaga)]);
}

export default rootSaga;
