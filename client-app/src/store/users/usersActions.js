import {
  AUTHORIZE_USER,
  AUTHORIZE_USER_SUCCEEDED,
  AUTHORIZE_USER_FAILED,
  REGISTER_USER,
  REQUEST_USER_FROM_SERVER,
  REQUEST_USER_FROM_SERVER_SUCCEEDED,
  REQUEST_USER_FROM_SERVER_FAILED,
  CHANGE_USER_DATA,
  CHANGE_USER_DATA_SUCCEEDED,
  CHANGE_USER_DATA_FAILED,
  OPEN_OR_CLOSE_AUTH_MODAL,
  OPEN_OR_CLOSE_REGISTER_MODAL,
  OPEN_OR_CLOSE_CHANGE_MODAL,
  LOG_OUT,
} from '../actionConst.js';

export const authorizeUser = data => ({
  payload: data,
  type: AUTHORIZE_USER,
});

export const authorizeUserSuccess = data => ({
  payload: data,
  type: AUTHORIZE_USER_SUCCEEDED,
});

export const authorizeUserError = error => ({
  payload: error,
  type: AUTHORIZE_USER_FAILED,
});

export const registerUser = data => ({
  payload: data,
  type: REGISTER_USER,
});

export const requestUserFromServer = data => ({
  payload: data,
  type: REQUEST_USER_FROM_SERVER,
});

export const requestUserFromServerSuccess = data => ({
  payload: data,
  type: REQUEST_USER_FROM_SERVER_SUCCEEDED,
});

export const requestUserFromServerError = error => ({
  payload: error,
  type: REQUEST_USER_FROM_SERVER_FAILED,
});

export const changeUser = data => ({
  payload: data,
  type: CHANGE_USER_DATA,
});

export const changeUserSuccess = data => ({
  payload: data,
  type: CHANGE_USER_DATA_SUCCEEDED,
});

export const changeUserError = error => ({
  payload: error,
  type: CHANGE_USER_DATA_FAILED,
});

export const changeModalChangeStatus = () => ({ type: OPEN_OR_CLOSE_CHANGE_MODAL });

export const changeModalAuthStatus = () => ({ type: OPEN_OR_CLOSE_AUTH_MODAL });

export const changeModalRegisterStatus = () => ({ type: OPEN_OR_CLOSE_REGISTER_MODAL });

export const logOut = () => ({ type: LOG_OUT });

