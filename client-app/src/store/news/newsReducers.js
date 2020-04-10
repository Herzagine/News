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
import { NEWS_ON_PAGE } from '../../utils/const.js';
import { searchInNews } from '../../utils/helpers.js';

const initialState = {
  currentPage: 1,
  error: false,
  errorMessage: '',
  news: [],
  newsAfterSearch: [],
  newsToView: [],
  processing: false,
};

export const newsReducer = (state = initialState, action) => {
  const lastNewsOnPage = action.payload * NEWS_ON_PAGE;

  switch (action.type) {
    case FIND_NEWS_IN_THE_STORE:
      return {
        ...state,
        currentPage: 1,
        newsAfterSearch: searchInNews(state, action),
        newsToView: searchInNews(state, action).slice(0, NEWS_ON_PAGE),
      };
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        newsToView: state.newsAfterSearch.slice(lastNewsOnPage - NEWS_ON_PAGE, lastNewsOnPage),
      };
    case REQUEST_NEWS_FROM_SERVER:
      return {
        ...state,
        newsIsLoading: true,
      };
    case REQUEST_NEWS_FROM_SERVER_SUCCEEDED:
      return {
        ...state,
        currentPage: 1,
        news: action.payload,
        newsAfterSearch: action.payload,
        newsToView: action.payload.slice(0, NEWS_ON_PAGE),
      };
    case REQUEST_NEWS_FROM_SERVER_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      };
    case SEND_NEWS_TO_SERVER:
      return {
        ...state,
        processing: true,
      };
    case SEND_NEWS_TO_SERVER_SUCCEEDED:
      return {
        ...state,
        processing: false,
      };
    case SEND_NEWS_TO_SERVER_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        processing: false,
      };
    case CLOSE_ALERT_WINDOW:
      return {
        ...state,
        error: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};
