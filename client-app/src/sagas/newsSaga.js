import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  requestNewsFromServerSuccess,
  requestNewsFromServerError,
  sendNewsToServerSuccess,
  createError,
} from '../store/news/newsActions';
import { LOGIN, USER_TOKEN } from '../utils/const.js';
import { REQUEST_NEWS_FROM_SERVER, SEND_NEWS_TO_SERVER } from '../store/actionConst.js';
import { requestUserFromServer } from '../store/users/usersActions';
import config from '../config';

const fetchNewsWorker = function *() {
  try {
    const { data: news } = yield call(axios, {
      method: 'get',
      url: `${config.host}/news`,

    });

    yield put(requestNewsFromServerSuccess(news));
  } catch (error) {
    yield put(requestNewsFromServerError(error));
  }
};

const sendNewsWorker = function *(action) {
  const { payload } = action;
  const payloadUserReq = {
    login: payload.get(LOGIN),
    userToken: payload.get(USER_TOKEN),
  };

  try {
    yield call(axios, {
      data: payload,
      headers: { 'Content-Type': 'multipart/form-data; boundary=something' },
      method: 'post',
      url: `${config.host}/news`,
    });

    yield put(requestUserFromServer(payloadUserReq));
    yield put(sendNewsToServerSuccess());
  } catch (error) {
    const { response } = error;
    const { data } = response;

    yield put(createError(data));
  }
};

const newsSaga = function *() {
  yield takeLatest(REQUEST_NEWS_FROM_SERVER, fetchNewsWorker);
  yield takeLatest(SEND_NEWS_TO_SERVER, sendNewsWorker);
};

export default newsSaga;
