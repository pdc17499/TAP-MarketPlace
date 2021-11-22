import { combineReducers } from 'redux';

import auth from './auth/reducer';
import rooms from './rooms/reducer';


const appReducer = combineReducers({
  auth,
  rooms
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
