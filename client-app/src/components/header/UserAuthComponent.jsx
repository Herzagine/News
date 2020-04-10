import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeModalAuthStatus,
  changeModalRegisterStatus,
  registerUser,
  authorizeUser,
  logOut,
  requestUserFromServer,
} from '../../store/users/usersActions';
import ConnectedForm from './Form.jsx';
import sha from 'sha-1';
import config from '../../config';

const UserAuthComponent = () => {
  const { modalAuthIsOpen, modalRegisterIsOpen, userLogin, userToken, processing } = useSelector(state => ({
    modalAuthIsOpen: state.usersReducer.modalAuthIsOpen,
    modalRegisterIsOpen: state.usersReducer.modalRegisterIsOpen,
    processing: state.usersReducer.processing,
    userLogin: state.usersReducer.userLogin,
    userToken: state.usersReducer.userLogin,
  }));

  const dispatch = useDispatch();

  const openOrCloseModalAuth = () => {
    dispatch(changeModalAuthStatus());
  };

  const openOrCloseModalRegister = () => {
    dispatch(changeModalRegisterStatus());
  };

  const logOutHandler = () => {
    dispatch(logOut());
  };

  const onSubmitFunction = values => {
    const { passwordRepeat, password } = values;

    if (passwordRepeat) {
      dispatch(registerUser({
        ...values,
        password: sha(password),
        passwordRepeat: sha(passwordRepeat),
      }));
    } else {
      dispatch(authorizeUser({
        ...values,
        password: sha(password),
      }));
    }
  };

  const refreshUserNews = () => {
    dispatch(requestUserFromServer({ login: userLogin, userToken }));
  };

  return (userLogin
    ? (
      <div className="auth-controls">
        <Link
          to={`/user/${userLogin}`}
          className="button-cabinet"
          onClick={refreshUserNews}
        >
          {userLogin ? userLogin : 'Guest'}
        </Link>
        |
        <button type="button" className="button-sign-out sign-out-dark-layer" onClick={logOutHandler}>
          <img src={`${config.host}/images/logout`} className="logout-svg" alt="" />
        </button>
      </div>
    ) : (
      <div>
        { modalAuthIsOpen
          && (
            <ConnectedForm
              openCloseFunc={openOrCloseModalAuth}
              onSubmit={onSubmitFunction}
              type="auth"
              processing={processing}
            />
          )}
        <button type="button" className="button-sign-in" onClick={openOrCloseModalAuth}>Sing-In</button>
        |
        { modalRegisterIsOpen
          && (
            <ConnectedForm
              openCloseFunc={openOrCloseModalRegister}
              onSubmit={onSubmitFunction}
              type="reg"
              processing={processing}
            />
          )}
        <button type="button" className="button-sign-up" onClick={openOrCloseModalRegister}>Sign-Up</button>
      </div>
    )
  );
};

export default memo(UserAuthComponent);

