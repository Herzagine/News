import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptTheError } from '../../store/news/newsActions';

const ErrorMessageComponent = () => {
  const { errorStatus, errorMessage } = useSelector(state => ({
    errorMessage: state.newsReducer.errorMessage,
    errorStatus: state.newsReducer.error,
  }));
  const dispatch = useDispatch();
  const closeAlert = () => {
    dispatch(acceptTheError());
  };

  return (
    errorStatus && (
      <div className="card text-white bg-danger error-message-alert error-message-alert-slided">
        <div className="card-header alert-header">
          <h5 className="modal-title">Error!</h5>
          <button type="button" className="close alert-close-button" onClick={closeAlert}>&times;</button>
        </div>
        <div className="card-body card-text error-message">
          {errorMessage}
        </div>
      </div>
    ));
};

export default memo(ErrorMessageComponent);
