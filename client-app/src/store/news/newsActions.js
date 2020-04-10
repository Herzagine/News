import {
  FIND_NEWS_IN_THE_STORE,
  CHANGE_CURRENT_PAGE,
  REQUEST_NEWS_FROM_SERVER,
  REQUEST_NEWS_FROM_SERVER_SUCCEEDED,
  REQUEST_NEWS_FROM_SERVER_FAILED,
  SEND_NEWS_TO_SERVER,
  SEND_NEWS_TO_SERVER_SUCCEEDED,
  SEND_NEWS_TO_SERVER_FAILED,
  CLOSE_ALERT_WINDOW,
} from '../actionConst.js';

export const requestNewsFromServer = () => ({ type: REQUEST_NEWS_FROM_SERVER });

export const findNewsInTheStore = data => ({
  payload: data,
  type: FIND_NEWS_IN_THE_STORE,
});

export const changeCurrentPage = page => ({
  payload: page,
  type: CHANGE_CURRENT_PAGE,
});

export const requestNewsFromServerSuccess = data => ({
  payload: data,
  type: REQUEST_NEWS_FROM_SERVER_SUCCEEDED,
});

export const requestNewsFromServerError = error => ({
  payload: error,
  type: REQUEST_NEWS_FROM_SERVER_FAILED,
});

export const sendNewsToServer = data => ({
  payload: data,
  type: SEND_NEWS_TO_SERVER,
});

export const sendNewsToServerSuccess = data => ({
  payload: data,
  type: SEND_NEWS_TO_SERVER_SUCCEEDED,
});

export const createError = error => ({
  payload: error,
  type: SEND_NEWS_TO_SERVER_FAILED,
});

export const acceptTheError = () => ({ type: CLOSE_ALERT_WINDOW });
