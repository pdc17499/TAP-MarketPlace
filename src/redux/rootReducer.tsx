import {combineReducers} from 'redux';

import auth from './auth/reducer';

const appReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
