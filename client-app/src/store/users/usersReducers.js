import {
  AUTHORIZE_USER,
  AUTHORIZE_USER_SUCCEEDED,
  AUTHORIZE_USER_FAILED,
  REGISTER_USER,
  REGISTER_USER_SUCCEEDED,
  REQUEST_USER_FROM_SERVER_SUCCEEDED,
  OPEN_OR_CLOSE_AUTH_MODAL,
  OPEN_OR_CLOSE_REGISTER_MODAL,
  OPEN_OR_CLOSE_CHANGE_MODAL,
  LOG_OUT,
} from '../actionConst.js';

const initialState = {
  currentPage: 1,
  currentUserPage: {},
  modalAuthIsOpen: false,
  modalChangeIsOpen: false,
  modalRegisterIsOpen: false,
  newsAfterSearch: [],
  newsToView: [],
  processing: false,
  userIsAuthorized: Boolean(window.localStorage.getItem('accessToken')),
  userLogin: window.localStorage.getItem('login'),
  userToken: window.localStorage.getItem('accessToken'),
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_OR_CLOSE_AUTH_MODAL:
      return {
        ...state,
        modalAuthIsOpen: !state.modalAuthIsOpen,
        modalChangeIsOpen: false,
        modalRegisterIsOpen: false,
      };
    case OPEN_OR_CLOSE_REGISTER_MODAL:
      return {
        ...state,
        modalAuthIsOpen: false,
        modalChangeIsOpen: false,
        modalRegisterIsOpen: !state.modalRegisterIsOpen,
      };
    case OPEN_OR_CLOSE_CHANGE_MODAL:
      return {
        ...state,
        modalAuthIsOpen: false,
        modalChangeIsOpen: !state.modalChangeIsOpen,
        modalRegisterIsOpen: false,
      };
    case REGISTER_USER_SUCCEEDED:
      return {
        ...state,
        modalRegisterIsOpen: !state.modalRegisterIsOpen,
        processing: false,
        userWasCreated: true,
      };
    case REGISTER_USER:
      return {
        ...state,
        processing: true,
      };
    case AUTHORIZE_USER:
      return {
        ...state,
        processing: true,
      };
    case AUTHORIZE_USER_SUCCEEDED:
      return {
        ...state,
        processing: false,
        userIsAuthorized: true,
        userLogin: action.payload.login,
        userToken: action.payload.accessToken,
      };
    case AUTHORIZE_USER_FAILED:
      return {
        ...state,
        authorizeError: action.payload,
        processing: false,
      };
    case LOG_OUT:
      return {
        ...state,
        modalAuthIsOpen: false,
        modalChangeIsOpen: false,
        modalRegisterIsOpen: false,
        userIsAuthorized: false,
        userLogin: '',
        userToken: '',
      };
    case REQUEST_USER_FROM_SERVER_SUCCEEDED:
      return {
        ...state,
        currentUserPage: action.payload,
      };
    default:
      return state;
  }
};
