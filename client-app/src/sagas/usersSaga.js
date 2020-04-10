import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  requestUserFromServer,
  requestUserFromServerSuccess,
  authorizeUserSuccess,
  changeUserError,
} from '../store/users/usersActions';
import {
  LOGIN,
  ACCESS_TOKEN,
  NAME,
  SURNAME,
  PICTURE,
} from '../utils/const.js';
import {
  REQUEST_USER_FROM_SERVER,
  AUTHORIZE_USER,
  REGISTER_USER,
  CHANGE_USER_DATA,
  LOG_OUT,
} from '../store/actionConst.js';
import { requestNewsFromServerSuccess, createError } from '../store/news/newsActions';
import config from '../config';

const getTokens = data => {
  const { accessToken, login } = data;

  if (accessToken && login) {
    window.localStorage.setItem(ACCESS_TOKEN, accessToken);
    window.localStorage.setItem(LOGIN, login);
  }
};

const requestUserWorker = function *(action) {
  try {
    const { payload } = action;
    const { login, userToken } = payload;

    const res = yield call(axios, {
      data: payload,
      headers: { authorization: userToken ? userToken : '' },
      method: 'get',
      url: `${config.host}/users/${login}`,
    });

    yield put(requestNewsFromServerSuccess(res.data.userNews));
    yield put(requestUserFromServerSuccess(res.data));
  } catch (error) {
    yield put(createError(error));
  }
};

const registerUserWorker = function *(action) {
  try {
    const { payload } = action;

    const res = yield call(axios, {
      data: payload,
      method: 'post',
      url: `${config.host}/users/`,
    });

    const { data } = res;
    const { accessToken, login } = data;

    getTokens(data);

    yield put(authorizeUserSuccess({ accessToken, login }));
  } catch (error) {
    const { response } = error;
    const { data } = response;

    yield put(createError(data));
  }
};

const authorizeUserWorker = function *(action) {
  try {
    const { payload } = action;

    const res = yield call(axios, {
      data: payload,
      method: 'post',
      url: `${config.host}/users/auth`,
    });

    const { data } = res;
    const { accessToken, login } = data;

    getTokens(data);

    yield put(authorizeUserSuccess({ accessToken, login }));
  } catch (error) {
    const { response } = error;
    const { data } = response;

    yield put(createError(data));
  }
};

const changeUserWorker = function *(action) {
  try {
    const { payload } = action;
    const { userToken, userLogin, values } = payload;
    const { name, surname, picture } = values;
    const formData = new FormData();

    if (picture) {
      formData.append(PICTURE, picture, picture.name);
    }
    if (name && surname) {
      formData.append(NAME, name);
      formData.append(SURNAME, surname);
    }

    yield call(axios, {
      data: formData,
      headers: {
        'Authorization': userToken ? userToken : '',
        'Content-Type': 'multipart/form-data; boundary=something',
      },
      method: 'put',
      url: `${config.host}/users/${userLogin}`,
    });
    yield put(requestUserFromServer({ login: userLogin, userToken }));
  } catch (e) {
    yield put(changeUserError(e));
  }
};

const logOutWorker = function() {
  window.localStorage.setItem(ACCESS_TOKEN, '');
  window.localStorage.setItem(LOGIN, '');
};

const usersSaga = function *() {
  yield takeLatest(REGISTER_USER, registerUserWorker);
  yield takeLatest(AUTHORIZE_USER, authorizeUserWorker);
  yield takeLatest(LOG_OUT, logOutWorker);
  yield takeLatest(REQUEST_USER_FROM_SERVER, requestUserWorker);
  yield takeLatest(CHANGE_USER_DATA, changeUserWorker);
};

export default usersSaga;
