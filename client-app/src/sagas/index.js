import {
  all,
  fork,
} from 'redux-saga/effects';
import newsSaga from './newsSaga';
import usersSaga from './usersSaga';

export const rootSaga = function *rootSaga() {
  return yield all([fork(newsSaga), fork(usersSaga)]);
};

