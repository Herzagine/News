import { combineReducers } from 'redux';
import { newsReducer } from './news/newsReducers';
import { usersReducer } from './users/usersReducers';
import { reducer as formReducer } from 'redux-form';

export const combinedReducer = combineReducers({
  form: formReducer,
  newsReducer,
  usersReducer,
});
